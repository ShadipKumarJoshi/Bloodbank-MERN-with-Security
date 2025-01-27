import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUserApi } from "../apis/Api";

const LoginModal = ({ isOpen, onClose, onOpenSignup }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captcha, setCaptcha] = useState(null);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showCaptcha, setShowCaptcha] = useState(false);

  const validate = () => {
    let isValid = true;
    setEmailError("");
    setPasswordError("");

    if (email.trim() === "") {
      setEmailError("Email is required");
      isValid = false;
    }

    if (email.trim() !== "" && !email.includes("@")) {
      setEmailError("Invalid email");
      isValid = false;
    }

    if (password.trim() === "") {
      setPasswordError("Password is required");
      isValid = false;
    }

    return isValid;
  };

  const loginNow = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;

    const loginData = {
      email: email,
      password: password,
      captcha: captcha,
    };
    loginUserApi(loginData)
      .then((res) => {
        if (res.data.success === false) {
          toast.error(res.data.message);
          if (res?.data?.passwordExpired) {
            window.location.reload("/passwordForget");
          }
          if (res.data.message.includes("captcha")) {
            setShowCaptcha(true);
          } else {
            setCaptcha(null);
          }
        } else {
          toast.success(res.data.message);
          const jsonDecode = JSON.stringify(res.data.userData);

          localStorage.setItem("user", jsonDecode);
          localStorage.setItem("token", res.data.token);
          const expiryTime = new Date().getTime() + 15 * 60 * 1000;
          localStorage.setItem("tokenExpiry", expiryTime);

          onClose();
          navigate("/");
          if (res.data.userData.isAdmin === false) {
            navigate("/");
          } else {
            navigate("/admin-dashboard");
            window.location.reload();
          }
        }
      })
      .catch((err) => {
        toast.error("Server Error");
      });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-10 backdrop-blur-sm p-4 md:p-8">
      <div className="bg-white rounded-lg shadow-lg flex flex-col md:flex-row w-full max-w-4xl border border-black overflow-hidden">
        <div className="w-full md:w-1/2 hidden md:block">
          <img
            src="assets/images/login.png"
            alt="Adopt Me"
            className="h-full w-full object-cover rounded-l-lg"
          />
        </div>
        <div className="w-full md:w-1/2 p-8 relative flex flex-col justify-center">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-2xl text-black hover:text-red-600"
          >
            &times;
          </button>
          <div className="text-center mb-8">
            <img
              src="assets/logo/logo.png"
              alt="Petadapt"
              className="w-32 h-auto mx-auto"
            />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center md:text-left">
            Welcome to <span className="text-orange-500">Adoption</span>
            <span className="text-blue-700">Hub</span>
          </h2>
          <form>
            <div className="mb-4">
              <div className="relative">
                <span className="absolute top-1/2 transform -translate-y-1/2 left-4">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="text-gray-500"
                  />
                </span>
                <input
                  placeholder="Email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 py-3 bg-gray-100 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {emailError && (
                <p className="text-red-500 text-sm mt-2">{emailError}</p>
              )}
            </div>
            <div className="mb-4">
              <div className="relative">
                <span className="absolute top-1/2 transform -translate-y-1/2 left-4">
                  <FontAwesomeIcon icon={faLock} className="text-gray-500" />
                </span>
                <input
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  className="w-full pl-12 py-3 bg-gray-100 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {passwordError && (
                <p className="text-red-500 text-sm mt-2">{passwordError}</p>
              )}
            </div>
            {showCaptcha && (
              <div className="mb-4">
                <ReCAPTCHA
                  sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                  onChange={(value) => setCaptcha(value)}
                  onExpired={() => setCaptcha(null)}
                />
              </div>
            )}
            <div className="flex items-center justify-between mb-4">
              <a
                href="/passwordForget"
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot Password?
              </a>
            </div>
            <div className="flex flex-col items-center">
              <button
                className="bg-gradient-to-r from-orange-400 to-orange-500 text-white font-bold py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-50 w-full mb-4"
                type="button"
                onClick={loginNow}
              >
                Login
              </button>
              <p className="text-sm text-gray-600">
                Not a member?{" "}
                <Link
                  onClick={onOpenSignup}
                  className="text-blue-600 hover:underline"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
