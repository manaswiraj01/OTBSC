import { useContext, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice.js";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants.js";
import toast from "react-hot-toast";
import { Context } from "../context/Context.jsx";
import { Eye, EyeOff } from "lucide-react";

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

  // 👁 password toggle
  const [showPassword, setShowPassword] = useState(false);

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
      const msg =
        err?.response?.data?.message || err?.response?.data || err.message;
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

      localStorage.setItem("pendingSignupEmail", normalizedEmail);
      localStorage.setItem("otpCountdownStart", Date.now().toString());

      return navigate("/verify-otp", {
        state: { email: normalizedEmail },
      });
    } catch (err) {
      const msg =
        err?.response?.data?.message || err?.response?.data || err.message;
      setError(msg);
      toast.error(msg);
    } finally {
      setBtnLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <div
        className={`border border-gray-400 rounded-2xl p-6 sm:p-8 w-full ${isLoginForm
            ? "max-w-sm sm:max-w-md"
            : "max-w-md sm:max-w-2xl lg:max-w-4xl"
          }`}
      >
        <h2 className="text-3xl font-bold text-center mb-6">
          {isLoginForm ? "Welcome Back!" : "Create an Account"}
        </h2>

        <div>
          {!isLoginForm && (
            <div>
              <label className="block text-sm py-2">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input input-bordered w-full mb-2 focus:outline-none placeholder:text-base-content/70"
                placeholder="Wirte your full name"
              />
            </div>
          )}

          <div>
            <label className="block text-sm py-2">Email</label>
            <input
              type="email"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              className="input input-bordered w-full mb-2 focus:outline-none placeholder:text-base-content/70"
              placeholder="Write your email address"
            />
          </div>

          {/* Password Field with Eye Button */}
          <div>
            <label className="block text-sm py-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered w-full mb-2 pr-12 focus:outline-none placeholder:text-base-content/70"
                placeholder="Enter password"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {!isLoginForm && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
              <div>
                <label className="block text-sm py-2">Gender</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="input w-full mb-2 focus:outline-none placeholder:text-base-content/70"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm py-2">Date of Birth</label>
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="input input-bordered w-full mb-2 focus:outline-none placeholder:text-base-content/70"
                />
              </div>

              <div>
                <label className="block text-sm py-2">Country</label>
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="input input-bordered w-full mb-2 focus:outline-none placeholder:text-base-content/70"
                  placeholder="Write your country name"
                />
              </div>

              <div>
                <label className="block text-sm py-2">Country Code</label>
                <input
                  type="text"
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="input input-bordered w-full mb-2 focus:outline-none placeholder:text-base-content/70"
                  placeholder="+91"
                />
              </div>

              <div>
                <label className="block text-sm py-2">Phone Number</label>
                <input
                  type="text"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  className="input input-bordered w-full mb-2 focus:outline-none placeholder:text-base-content/70"
                  placeholder="Write your phone number"
                />
              </div>

              <div>
                <label className="block text-sm py-2">Nationality</label>
                <input
                  type="text"
                  value={nationality}
                  onChange={(e) => setNationality(e.target.value)}
                  className="input input-bordered w-full mb-2 focus:outline-none placeholder:text-base-content/70"
                  placeholder="Write your nationality"
                />
              </div>
            </div>
          )}

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <button
            type="button"
            onClick={isLoginForm ? handleLogin : handleSignUp}
            className="btn btn-secondary w-full mt-3"
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

        {/* Toggle text spacing fixed */}
        <div className="text-center mt-5">
          <p className="text-sm text-gray-400">
            {isLoginForm ? "New user?" : "Already have an account?"}{" "}
            <span
              onClick={() => {
                setIsLoginForm((prev) => !prev);
                setError("");
                setShowPassword(false);
              }}
              className="text-blue-500 hover:underline cursor-pointer font-medium"
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