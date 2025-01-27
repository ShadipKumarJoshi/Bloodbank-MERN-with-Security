import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Label, Modal, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { createUserApi, sendOtpApi } from "../apis/Api";

const RegisterModal = ({ isOpen, onClose, onOpenLogin }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [terms, setTerms] = useState(false);

  const [fnameerror, setFullnameError] = useState("");
  const [emailerror, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState([]);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [cpassworderror, setCpasswordError] = useState("");
  const [termsError, setTermsError] = useState("");

  const [openModal, setOpenModal] = useState(false);
  const [userVerificationCode, setUserVerificationCode] = useState("");
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(900); // 15 minutes timer

  useEffect(() => {
    let interval;
    if (openModal) {
      interval = setInterval(() => {
        setTimer((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [openModal]);

  const handleTermsChange = (e) => {
    setTerms(e.target.checked);
    if (e.target.checked) {
      setTermsError("");
    }
  };

  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 8) errors.push("At least 8 characters long");
    if (!/[A-Z]/.test(password)) errors.push("An uppercase letter");
    if (!/[a-z]/.test(password)) errors.push("A lowercase letter");
    if (!/\d/.test(password)) errors.push("A number");
    if (!/[@$!%*?&]/.test(password)) errors.push("A special character");

    setPasswordError(errors);

    if (errors.length === 0) {
      setPasswordStrength("Strong");
    } else if (errors.length <= 2) {
      setPasswordStrength("Medium");
    } else {
      setPasswordStrength("Weak");
    }
  };

  const handlePasswordChange = (e) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);
    validatePassword(passwordValue);
  };

  const Validate = () => {
    let isValid = true;
    setFullnameError("");
    setEmailError("");
    setPasswordError([]);
    setCpasswordError("");
    setTermsError("");

    if (fullName.trim() === "") {
      setFullnameError("Name is Required");
      isValid = false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.trim() === "" || !emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
      isValid = false;
    }
    if (passwordError.length > 0 || passwordStrength !== "Strong") {
      toast.error("Please ensure your password meets all criteria and is strong.");
      isValid = false;
    }
    if (password.trim() !== confirmPassword.trim()) {
      setCpasswordError("Passwords do not match.");
      isValid = false;
    }
    if (!terms) {
      setTermsError("Please agree to the terms and conditions.");
      isValid = false;
    }

    return isValid;
  };

  const validateAndSendOtp = async (e) => {
    e.preventDefault();
    const isValid = Validate();
    if (isValid) {
      const data = { email: email };
      sendOtpApi(data)
        .then((res) => {
          if (res?.data?.success === false) {
            toast.error(res?.data?.message);
          } else {
            setOpenModal(true);
            setTimer(900); // Reset timer to 15 minutes
            toast.success(res?.data?.message);
            setOtp(res?.data?.otp);
          }
        })
        .catch(() => {
          toast.error("Server Error");
        });
    }
  };

  const resendOtp = async () => {
    const data = { email: email };
    sendOtpApi(data)
      .then((res) => {
        if (res?.data?.success === false) {
          toast.error(res?.data?.message);
        } else {
          setTimer(900); // Reset timer to 15 minutes
          toast.success("OTP has been resent to your email.");
          setOtp(res?.data?.otp);
        }
      })
      .catch(() => {
        toast.error("Server Error");
      });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("fullName", fullName);
    data.append("email", email);
    data.append("password", password);
    data.append("confirmPassword", confirmPassword);

    createUserApi(data)
      .then((res) => {
        if (res.data.success === false) {
          toast.error(res.data.message);
        } else {
          onClose();
          onOpenLogin();
          toast.success(res.data.message);
        }
      })
      .catch(() => {
        toast.error("Server Error");
      });
  };

  const onCloseModal = () => {
    setOpenModal(false);
  };

  if (!isOpen) return null;

  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-10 backdrop-blur-sm p-4 md:p-8">
      <div className="bg-white rounded-lg shadow-lg flex flex-col md:flex-row w-full max-w-4xl border border-black overflow-visible">
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
            Create an Account
          </h2>
          <form className="flex flex-col items-center relative">
            <div className="mb-4 w-full">
              <div className="relative">
                <span className="absolute top-1/2 transform -translate-y-1/2 left-4">
                  <FontAwesomeIcon icon={faUser} className="text-gray-500" />
                </span>
                <input
                  placeholder="Full Name"
                  type="text"
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-12 py-3 bg-gray-100 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {fnameerror && (
                <p className="text-red-500 text-sm mt-2">{fnameerror}</p>
              )}
            </div>
            <div className="mb-4 w-full">
              <div className="relative">
                <span className="absolute top-1/2 transform -translate-y-1/2 left-4">
                  <FontAwesomeIcon icon={faEnvelope} className="text-gray-500" />
                </span>
                <input
                  placeholder="Email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 py-3 bg-gray-100 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {emailerror && (
                <p className="text-red-500 text-sm mt-2">{emailerror}</p>
              )}
            </div>
            <div className="mb-4 w-full relative">
              <div className="relative">
                <span className="absolute top-1/2 transform -translate-y-1/2 left-4">
                  <FontAwesomeIcon icon={faLock} className="text-gray-500" />
                </span>
                <input
                  placeholder="Password"
                  type="password"
                  onChange={handlePasswordChange}
                  className="w-full pl-12 py-3 bg-gray-100 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {passwordError.length > 0 && (
                <div className="absolute top-0 right-[-240px] bg-white border border-gray-300 rounded p-4 w-[220px] shadow-lg text-sm text-red-500 z-50">
                  <ul>
                    {passwordError.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}
              {passwordStrength && (
                <div className={`mt-2 text-sm ${passwordStrength === "Strong" ? "text-green-500" : passwordStrength === "Medium" ? "text-yellow-500" : "text-red-500"}`}>
                  Password Strength: {passwordStrength}
                </div>
              )}
            </div>
            <div className="mb-4 w-full">
              <div className="relative">
                <span className="absolute top-1/2 transform -translate-y-1/2 left-4">
                  <FontAwesomeIcon icon={faLock} className="text-gray-500" />
                </span>
                <input
                  placeholder="Confirm Password"
                  type="password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-12 py-3 bg-gray-100 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {cpassworderror && (
                <p className="text-red-500 text-sm mt-2">{cpassworderror}</p>
              )}
            </div>
            <div className="flex flex-col w-full items-start mb-4">
              <div className="flex items-center">
                <input
                  onChange={handleTermsChange}
                  className="cursor-pointer"
                  type="checkbox"
                  id="terms"
                />
                <label htmlFor="terms" className="ml-2 cursor-pointer text-sm">
                  I agree to the{" "}
                  <a
                    href="/terms-and-condition"
                    className="text-blue-600 hover:underline"
                  >
                    terms and conditions
                  </a>
                </label>
              </div>
              {termsError && (
                <p className="text-red-500 text-sm mt-2">{termsError}</p>
              )}
            </div>
            <button
              className="bg-gradient-to-r from-orange-400 to-orange-500 text-white font-bold py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-50 w-full mb-4"
              type="button"
              onClick={validateAndSendOtp}
            >
              Sign Up
            </button>
            <p className="text-sm text-gray-600">
              Already a member?{" "}
              <Link
                onClick={onOpenLogin}
                className="text-blue-600 hover:underline"
              >
                Login
              </Link>
            </p>
          </form>
          <Modal show={openModal} size="md" onClose={onCloseModal} popup>
            <Modal.Header>
              <h3 className="text-2xl font-semibold text-center text-gray-900">
                Verification Code
              </h3>
            </Modal.Header>
            <Modal.Body>
              <div className="space-y-6">
                <p className="text-lg text-gray-600">
                  Enter your verification code below to create your account.
                </p>
                <div>
                  <Label htmlFor="code" value="Your Verification Code" />
                  <TextInput
                    id="code"
                    type="text"
                    onChange={(e) => setUserVerificationCode(e.target.value)}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring focus:!ring-gray-500"
                  />
                </div>
                <div className="w-full flex justify-center">
                  <button
                    className="px-6 py-2 mt-4 bg-[#8BC53E] text-white font-semibold rounded-md shadow-md hover:bg-[#6aa023] transition duration-300"
                    onClick={handleRegister}
                  >
                    Create your account
                  </button>
                </div>
                {timer > 0 ? (
                  <p className="text-sm text-gray-500">
                    Resend OTP in {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                  </p>
                ) : (
                  <button
                    className="text-sm text-blue-600 hover:underline"
                    onClick={resendOtp}
                  >
                    Resend OTP
                  </button>
                )}
              </div>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
