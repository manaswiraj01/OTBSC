import { useContext, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice.js";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants.js";
import toast from "react-hot-toast";
import { Context } from "../context/Context.jsx";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [dob, setDob] = useState("");
  const [number, setNumber] = useState("");
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");
  const [nationality, setNationality] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [error, setError] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { fetchUser } = useContext(Context);

  const handleLogin = async () => {
    try {
      setBtnLoading(true);
      setError("");

      const res = await axios.post(
        BASE_URL + "/login",
        { email: emailId, password },
        { withCredentials: true }
      );

      dispatch(addUser(res.data));
      toast.success(res?.data?.message || "Login successful");

      await fetchUser();
      return navigate("/");
    } catch (err) {
      const msg = err?.response?.data?.message || err?.response?.data || err.message;
      setError(msg);
      toast.error(msg);
    } finally {
      setBtnLoading(false);
    }
  };

  const handleSignUp = async () => {
    try {
      setBtnLoading(true);
      setError("");

      const res = await axios.post(
        BASE_URL + "/signup",
        {
          name,
          email: emailId,
          password,
          phoneNo: countryCode + number,
          countryCode,
          gender,
          dob,
          nationality,
          country,
        },
        { withCredentials: true }
      );

      toast.success(res?.data?.message || "OTP sent successfully");

      const normalizedEmail = emailId.toLowerCase().trim();

      // OTP page refresh survive kare
      localStorage.setItem("pendingSignupEmail", normalizedEmail);
      localStorage.setItem("otpCountdownStart", Date.now().toString());

      return navigate("/verify-otp", {
        state: { email: normalizedEmail },
      });
    } catch (err) {
      const msg = err?.response?.data?.message || err?.response?.data || err.message;
      setError(msg);
      toast.error(msg);
    } finally {
      setBtnLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  p-4">
      <div className="w-1/2 border border-gray-400 rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center mb-6">
          {isLoginForm ? "Welcome Back!" : "Create an Account"}
        </h2>

        <div className="">
          {!isLoginForm && (
            <div>
              <label className="block text-sm py-2  ">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input input-bordered w-full mb-2"
                placeholder="John"
              />
            </div>
          )}

          <>
            <div>
              <label className="block text-sm py-2">Email</label>
              <input
                type="email"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                className="input input-bordered w-full mb-2"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm py-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered w-full mb-2"
                placeholder="Enter password here"
              />
            </div>
          </>

          {!isLoginForm && (
            <div className="grid grid-cols-2 gap-x-4">
              <div>
                <label className="block text-sm py-2">Gender</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="select select-bordered w-full mb-2"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm py-2 ">Date of Birth</label>
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="input input-bordered w-full mb-2"
                />
              </div>
              <div>
                <label className="block text-sm py-2">Country</label>
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="input input-bordered w-full mb-2"
                  placeholder="India"
                />
              </div>
              <div>
                <label className="block text-sm py-2">Country Code</label>
                <input
                  type="text"
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="input input-bordered w-full mb-2"
                  placeholder="+91"
                />
              </div>
              <div>
                <label className="block text-sm py-2">Phone Number</label>
                <input
                  type="text"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  className="input input-bordered w-full mb-2"
                  placeholder="1234567890"
                />
              </div>
              <div>
                <label className="block text-sm py-2">Nationality</label>
                <input
                  type="text"
                  value={nationality}
                  onChange={(e) => setNationality(e.target.value)}
                  className="input input-bordered w-full mb-2"
                  placeholder="Indian"
                />
              </div>
            </div>
          )}
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <button
            type="button"
            onClick={isLoginForm ? handleLogin : handleSignUp}
            className="btn btn-secondary w-full"
            disabled={btnLoading}
          >
            {btnLoading
              ? isLoginForm
                ? "Logging in..."
                : "Sending OTP..."
              : isLoginForm
              ? "Login"
              : "Sign Up"}
          </button>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            {isLoginForm ? "New user?" : "Already have an account?"}{" "}
            <span
              onClick={() => {
                setIsLoginForm((prev) => !prev);
                setError("");
              }}
              className="text-blue-600 hover:underline cursor-pointer font-medium"
            >
              {isLoginForm ? "Sign up here" : "Login here"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;