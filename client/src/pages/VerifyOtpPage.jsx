import { useEffect, useRef, useState, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from "../utils/constants";
import { useLocation, useNavigate } from "react-router-dom";
import { Context } from "../context/Context";

const VerifyOtpPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const emailFromState = location.state?.email;
    const savedEmail = localStorage.getItem("pendingSignupEmail");
    const email = emailFromState || savedEmail || "";

    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [loading, setLoading] = useState(false);
    const [resendLoading, setResendLoading] = useState(false);
    const [countdown, setCountdown] = useState(30);

    const { fetchUser } = useContext(Context);

    const inputRefs = useRef([]);

    useEffect(() => {
        if (!email) {
            toast.error("No signup session found. Please sign up again.");
            navigate("/login");
        }
    }, [email, navigate]);

    useEffect(() => {
        const savedCountdownStart = localStorage.getItem("otpCountdownStart");

        if (savedCountdownStart) {
            const secondsPassed = Math.floor(
                (Date.now() - Number(savedCountdownStart)) / 1000
            );
            const remaining = Math.max(30 - secondsPassed, 0);
            setCountdown(remaining);
        } else {
            localStorage.setItem("otpCountdownStart", Date.now().toString());
            setCountdown(30);
        }
    }, []);

    useEffect(() => {
        if (countdown <= 0) return;

        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [countdown]);

    const otpValue = otp.join("");

    const handleChange = (value, index) => {
        if (!/^\d?$/.test(value)) return;

        const updatedOtp = [...otp];
        updatedOtp[index] = value;
        setOtp(updatedOtp);

        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }

        if (e.key === "Enter" && otpValue.length === 6) {
            handleVerifyOtp();
        }
    };

    const handlePaste = (e) => {
        const pastedData = e.clipboardData.getData("text").trim();
        if (!/^\d{6}$/.test(pastedData)) return;

        const pastedOtp = pastedData.split("");
        setOtp(pastedOtp);

        pastedOtp.forEach((digit, index) => {
            if (inputRefs.current[index]) {
                inputRefs.current[index].value = digit;
            }
        });

        inputRefs.current[5]?.focus();
    };

    const handleVerifyOtp = async () => {
        try {
            if (otpValue.length !== 6) {
                return toast.error("Please enter the 6-digit OTP");
            }

            setLoading(true);

            const res = await axios.post(
                BASE_URL + "/signup/verify-otp",
                {
                    email,
                    otp: otpValue,
                    action: "verify",
                },
                { withCredentials: true }
            );

            toast.success(res?.data?.message || "OTP verified successfully");

            localStorage.removeItem("pendingSignupEmail");
            localStorage.removeItem("otpCountdownStart");

            await fetchUser();

            navigate("/");
        } catch (err) {
            const msg = err?.response?.data?.message || err?.response?.data || err.message;
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    const handleResendOtp = async () => {
        try {
            if (countdown > 0) return;

            setResendLoading(true);

            const res = await axios.post(
                BASE_URL + "/signup/verify-otp",
                {
                    email,
                    action: "resend",
                },
                { withCredentials: true }
            );

            toast.success(res?.data?.message || "New OTP sent");

            setOtp(["", "", "", "", "", ""]);
            inputRefs.current[0]?.focus();

            setCountdown(30);
            localStorage.setItem("otpCountdownStart", Date.now().toString());
        } catch (err) {
            const msg = err?.response?.data?.message || err?.response?.data || err.message;
            toast.error(msg);

            if (err?.response?.data?.resendAfterSeconds) {
                setCountdown(err.response.data.resendAfterSeconds);
                localStorage.setItem(
                    "otpCountdownStart",
                    (Date.now() - (30 - err.response.data.resendAfterSeconds) * 1000).toString()
                );
            }
        } finally {
            setResendLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-base-200">
            <div className="w-full max-w-lg bg-base-100 border border-base-300 rounded-2xl shadow-lg p-8">

                <h1 className="text-3xl font-bold text-center mb-3 text-base-content">
                    Verify OTP
                </h1>

                <p className="text-center text-base-content/70 mb-8">
                    We sent a 6-digit OTP to
                    <br />
                    <span className="font-semibold text-base-content">{email}</span>
                </p>

                <div
                    className="flex justify-center gap-3 mb-8"
                    onPaste={handlePaste}
                >
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            ref={(el) => (inputRefs.current[index] = el)}
                            type="text"
                            maxLength="1"
                            value={digit}
                            onChange={(e) => handleChange(e.target.value, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            className="w-12 h-14 text-center text-xl font-bold border border-secondary rounded-xl bg-base-100 text-base-content outline-none focus:border-primary focus:ring-2 focus:ring-primary/40"
                        />
                    ))}
                </div>

                <button
                    onClick={handleVerifyOtp}
                    disabled={loading}
                    className="btn btn-secondary w-full mb-4"
                >
                    {loading ? "Verifying..." : "Verify OTP"}
                </button>

                <div className="text-center">
                    {countdown > 0 ? (
                        <p className="text-base-content/60 text-sm">
                            Resend OTP in <span className="font-semibold">{countdown}s</span>
                        </p>
                    ) : (
                        <button
                            onClick={handleResendOtp}
                            disabled={resendLoading}
                            className="link link-primary font-medium"
                        >
                            {resendLoading ? "Sending..." : "Resend OTP"}
                        </button>
                    )}
                </div>

                <div className="text-center mt-6">
                    <button
                        onClick={async () => {
                            try {
                                if (email) {
                                    await axios.post(
                                        BASE_URL + "/signup/cancel",
                                        { email },
                                        { withCredentials: true }
                                    );
                                }
                            } catch (err) {
                                console.error("Cancel signup session failed:", err);
                            } finally {
                                localStorage.removeItem("pendingSignupEmail");
                                localStorage.removeItem("otpCountdownStart");
                                navigate("/login");
                            }
                        }}
                        className="text-sm text-base-content/60 hover:text-primary transition"
                    >
                        Back to Signup
                    </button>
                </div>

            </div>
        </div>
    );
};

export default VerifyOtpPage;