import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { updatePasswordApi } from "../../../apis/api";

const UpdatePaasswordAfterReset = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Use state to manage error messages and password strength
  const [oldpasswordError, setOldPasswordError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");

  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

  const validate = () => {
    let isValid = true;

    // Reset error messages
    setOldPasswordError("");
    setPasswordError("");
    setConfirmPasswordError("");

    if (!oldPassword.trim()) {
      setOldPasswordError("Old Password is required");
      isValid = false;
    }

    if (!password.trim()) {
      setPasswordError("Password is required");
      isValid = false;
    } else if (!password.match(passwordRegex)) {
      setPasswordError(
        "Password must be 6 or more characters with at least one number and one uppercase and lowercase letter"
      );
      isValid = false;
    }

    if (!confirmPassword.trim()) {
      setConfirmPasswordError("Please confirm your password");
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      isValid = false;
    }

    return isValid;
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) {
      return;
    }

    try {
      const formData = new FormData();
      formData.append("email", user.email);
      formData.append("oldPassword", oldPassword);
      formData.append("newPassword", password);

      const res = await updatePasswordApi(formData);

      if (res.data.success) {
        toast.success(res.data.message);
        setPassword("");
        setOldPassword("");
        setConfirmPassword("");
        setConfirmPasswordError("");
        setPasswordError("");
        setOldPasswordError("");
        if (user.isBloodBank) {
          navigate("/bb/dashboard");
        } else {
          navigate("/");
        }
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("An error occurred while updating the password.");
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordError("");
    const strength = calculatePasswordStrength(newPassword);
    setPasswordStrength(strength);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setConfirmPasswordError("");
  };

  const handleOldPasswordChange = (e) => {
    setOldPassword(e.target.value);
    setOldPasswordError("");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white relative p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-xl font-bold text-red-600 mb-4">Update Password</h1>

        <form onSubmit={handleSubmit}>
          <div className="col-md-12 mb-3">
            <label className="small mb-1" htmlFor="oldPassword">
              Old Password
            </label>
            <input
              className="form-control"
              id="oldPassword"
              type="password"
              placeholder="Enter your Old Password"
              onChange={handleOldPasswordChange}
              value={oldPassword}
            />
          </div>
          {oldpasswordError && (
            <p className="text-red-600">{oldpasswordError}</p>
          )}
          <div className="col-md-12 mb-3">
            <label className="small mb-1" htmlFor="newPassword">
              New Password
            </label>
            <input
              className="form-control"
              id="newPassword"
              type="password"
              placeholder="Enter New Password"
              onChange={handlePasswordChange}
              value={password}
            />
            {passwordError && <p className="text-red-600">{passwordError}</p>}
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
          </div>
          <div className="col-md-12 mb-3">
            <label htmlFor="confirm-password" className="small mb-1">
              Confirm Password
            </label>
            <input
              className="form-control"
              id="confirmPassword"
              type="password"
              placeholder="Enter your password again"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            {confirmPasswordError && (
              <p className="text-red-600">{confirmPasswordError}</p>
            )}
          </div>
          <button
            type="submit"
            className="bg-[#da3131] hover:bg-[#742828] text-white font-bold text-lg py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePaasswordAfterReset;
