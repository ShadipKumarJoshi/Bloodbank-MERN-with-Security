import {
  faAddressBook,
  faEnvelope,
  faLocation,
  faLock,
  faMapLocation,
  faPhone,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../../src/style/navbar.css";
import "../../src/style/register.css";
import { createUserApi, sendOtpApi } from "../apis/api";
import CustomFaIcons from "../components/CustomFaIcons";

import { CircularProgress } from "@mui/material";
import { Label, Modal, TextInput } from "flowbite-react";
import DistrictList from "../components/DistrictsList.jsx";

const Register = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [otp, setOtp] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  const sendOtp = async () => {
    setIsLoading(true);
    const data = { email: email };
    sendOtpApi(data)
      .then((res) => {
        if (res.data.success === false) {
          setIsLoading(false);
          toast.error(res.data.message);
        } else {
          setOpenModal(true);
          toast.success(res.data.message);
          setOtp(res?.data?.otp);
          setIsLoading(false);
          startResendTimer();
        }
      })
      .catch((err) => {
        toast.error("Server Error");
        console.log(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const validatein = (e) => {
    e.preventDefault();
    const isValid = Validate();
    if (!isValid) {
      return;
    } else {
      sendOtp(email);
    }
  };

  function onCloseModal() {
    setOpenModal(false);
  }

  const startResendTimer = () => {
    setIsResendDisabled(true);
    setResendTimer(60);
    const interval = setInterval(() => {
      setResendTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(interval);
          setIsResendDisabled(false);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);
  };

  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
  const [email, setEmail] = useState("");
  const [number, setContact] = useState("");
  const [currentAddress, setCurrentAddress] = useState("");
  const [municipality, setMunicipality] = useState("");
  const [wardNo, setWardNo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userVerificationCode, setUserVerificationCode] = useState("");
  const [userImage, setUserImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setUserImage(file);
    setPreviewImage(URL?.createObjectURL(file));
  };

  const [fnameerror, setFullnameError] = useState("");
  const [addressError, setCurrentAddressError] = useState("");
  const [municipalityError, setMunicipalityError] = useState("");
  const [wardNoError, setWardNoError] = useState("");
  const [emailerror, setEmailError] = useState("");
  const [numbererror, setNumberError] = useState("");
  const [passworderror, setPasswordError] = useState("");
  const [cpassworderror, setCpasswordError] = useState("");

  const Validate = () => {
    let isValid = true;

    setFullnameError("");
    setCurrentAddressError("");
    setMunicipalityError("");
    setWardNoError("");
    setNumberError("");
    setEmailError("");
    setPasswordError("");
    setCpasswordError("");

    if (fullName.trim() === "") {
      setFullnameError("Name is Required");
      isValid = false;
    }
    if (email.trim() === "") {
      setEmailError("Email is Required");
      isValid = false;
    }
    if (email.trim() !== "" && !email.includes("@")) {
      setEmailError("Invalid Email");
      isValid = false;
    }

    if (number.trim() === "" || number.length !== 10) {
      setNumberError("Number is Invalid (Must be 10 digits) ");
      isValid = false;
    }

    if (currentAddress.trim() === "") {
      setCurrentAddressError("Address is Required");
      isValid = false;
    }

    if (municipality.trim() === "") {
      setMunicipalityError("Municipality is Required");
      isValid = false;
    }

    if (wardNo.trim() === "") {
      setWardNoError("Ward No is Required");
      isValid = false;
    }

    if (password.trim() === "") {
      setPasswordError("Password is Required");
      isValid = false;
    }
    if (password.trim() !== "" && !password.match(passwordRegex)) {
      setPasswordError(
        "Password must be 6 or more characters with at least one number and one uppercase and lowercase letter"
      );
      isValid = false;
    }
    if (confirmPassword.trim() === "") {
      setCpasswordError("Password does not match");
      isValid = false;
    }

    if (password.trim() !== confirmPassword.trim()) {
      setCpasswordError("Password does not match");
      isValid = false;
    }
    return isValid;
  };

  const changeFullName = (e) => {
    setFullName(e.target.value);
  };

  const changeEmail = (e) => {
    setEmail(e.target.value);
  };

  const changeCode = (e) => {
    setUserVerificationCode(e.target.value);
  };

  const changeContact = (e) => {
    setContact(e.target.value);
  };

  const changeCurrentAddress = (e) => {
    setCurrentAddress(e.target.value);
  };

  const changePassword = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    const strength = calculatePasswordStrength(newPassword);
    setPasswordStrength(strength);
  };

  const changeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const calculatePasswordStrength = (password) => {
    if (password.length < 6) {
      return "Weak";
    }
    const hasLowerCase = /[a-z]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSymbols = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (hasLowerCase && hasUpperCase && hasNumbers && hasSymbols) {
      return "Strong";
    } else if ((hasLowerCase || hasUpperCase) && hasNumbers) {
      return "Normal";
    } else {
      return "Weak";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      fullName: fullName,
      email: email,
      number: number,
      currentAddress: currentAddress,
      municipality: municipality,
      wardNo: wardNo,
      password: password,
      userImage: userImage,
      userVerificationCode: userVerificationCode,
      otp: otp,
    };

    createUserApi(data)
      .then((res) => {
        if (res.data.success === false) {
          toast.error(res.data.message);
        } else {
          navigate("/login");
          toast.success(res.data.message);
        }
      })
      .catch((err) => {
        toast.error("Server Error");
        console.log(err.message);
      });
  };

  return (
    <>
      <div className="registerSecondBody">
        <div className="registerContainer">
          <header>Signup</header>
          <form className="form-control">
            <div className="registerInputBox">
              <i>
                <CustomFaIcons icon={faUser} className={"m-0"} />
              </i>
              <input
                style={{ boxShadow: "none" }}
                onChange={changeFullName}
                type="text"
                required
              />
              <label>Enter Your Fullname</label>
            </div>
            {fnameerror && <p className="text-danger">{fnameerror}</p>}
            <div className="registerInputBox">
              <i>
                <CustomFaIcons icon={faEnvelope} className={"m-0"} />
              </i>
              <input
                style={{ boxShadow: "none" }}
                onChange={changeEmail}
                type="text"
                maxLength="26"
                required
              />
              <label>Enter Your Email</label>
            </div>
            {emailerror && <p className="text-danger">{emailerror}</p>}
            <div className="registerInputBox">
              <i>
                <CustomFaIcons icon={faPhone} className={"m-0"} />
              </i>
              <input
                style={{ boxShadow: "none" }}
                onChange={changeContact}
                type="number"
                maxLength="10"
                required
              />
              <label>Enter Your Contact No.</label>
            </div>
            {numbererror && <p className="text-danger">{numbererror}</p>}
            <div className="registerInputBox">
              <i>
                <CustomFaIcons icon={faLocation} className={"m-0"} />
              </i>
              <DistrictList
                className="block px-4 py-2 !w-full !border-none rounded-md appearance-none focus:!outline-none focus:!ring focus:!border-gray-300"
                label={" "}
                onChange={changeCurrentAddress}
              />
            </div>
            {addressError && <p className="text-danger">{addressError}</p>}
            <div className="registerInputBox">
              <i>
                <CustomFaIcons icon={faMapLocation} className={"m-0"} />
              </i>
              <input
                onChange={(e) => setMunicipality(e.target.value)}
                type="text"
                maxLength="26"
                required
              />
              <label>Enter Your Municipality</label>
            </div>
            {municipalityError && (
              <p className="text-danger">{municipalityError}</p>
            )}
            <div className="registerInputBox">
              <i>
                <CustomFaIcons icon={faAddressBook} className={"m-0"} />
              </i>
              <input
                onChange={(e) => setWardNo(e.target.value)}
                type="number"
                maxLength="26"
                required
              />
              <label>Enter Your Ward No</label>
            </div>
            {wardNoError && <p className="text-danger">{wardNoError}</p>}
            <div className="registerInputBox">
              <i>
                <CustomFaIcons icon={faLock} className={"m-0"} />
              </i>
              <input
                style={{ boxShadow: "none" }}
                onChange={changePassword}
                type="password"
                maxLength="26"
                required
              />
              <label>Enter Your Password</label>
            </div>
            <div className="password-strength mt-2">
              <div
                className={`h-2 rounded ${
                  passwordStrength === "Strong"
                    ? "bg-green-500"
                    : passwordStrength === "Normal"
                    ? "bg-yellow-500"
                    : "bg-red-500"
                }`}
              ></div>
              {passwordStrength && (
                <span
                  className={`text-${
                    passwordStrength === "Strong"
                      ? "green-500"
                      : passwordStrength === "Normal"
                      ? "yellow-500"
                      : "red-500"
                  }`}
                >
                  {passwordStrength} Password
                </span>
              )}
            </div>
            {passworderror && <p className="text-danger">{passworderror}</p>}
            <div className="registerInputBox">
              <i>
                <CustomFaIcons icon={faLock} className={"m-0"} />
              </i>
              <input
                style={{ boxShadow: "none" }}
                onChange={changeConfirmPassword}
                type="password"
                maxLength="26"
                required
              />
              <label>Confirm your Password</label>
            </div>
            {cpassworderror && <p className="text-danger">{cpassworderror}</p>}
            <button
              className="btn btn-dark text-white border-0 btn-outline-danger"
              onClick={(e) => validatein(e)}
            >
              {isLoading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                "Sign Up"
              )}
            </button>
            <Modal show={openModal} size="md" onClose={onCloseModal} popup>
              <Modal.Header />
              <Modal.Body>
                <div className="space-y-6">
                  <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                    Enter Your Verification code here ....
                  </h3>
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="code" value="Your Verification Code" />
                    </div>
                    <TextInput
                      id="code"
                      type="text"
                      onChange={changeCode}
                      required
                    />
                  </div>
                  <div className="w-full d-flex flex-row justify-center">
                    <button
                      className="btn btn-dark text-white border-0 btn-outline-danger"
                      onClick={handleSubmit}
                    >
                      Create your account
                    </button>
                  </div>
                  <div className="flex flex-row justify-end">
                    <span>
                      Resend the otp from here :{" "}
                      {isLoading ? (
                        <CircularProgress size={20} color="inherit" />
                      ) : (
                        <>
                          {isResendDisabled ? (
                            <span>{resendTimer} seconds</span>
                          ) : (
                            <Link onClick={validatein}>Resend OTP</Link>
                          )}
                        </>
                      )}
                    </span>
                  </div>
                </div>
              </Modal.Body>
            </Modal>
            <div className="link">
              <p>
                Already have an account? <Link to={"/login"}>Login</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
