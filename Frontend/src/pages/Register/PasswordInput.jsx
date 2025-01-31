import React, { useState } from "react";

const PasswordInput = ({ password, setPassword, setErrors }) => {
  const [passwordErrors, setPasswordErrors] = useState([]);

  const handlePasswordChange = (e) => {
    const inputPassword = e.target.value;
    setPassword(inputPassword);

    const newRules = [];

    if (!/[A-Z]/.test(inputPassword)) newRules.push("✅ At least 1 uppercase letter (A-Z)");
    if (!/[a-z]/.test(inputPassword)) newRules.push("✅ At least 1 lowercase letter (a-z)");
    if (!/[0-9]/.test(inputPassword)) newRules.push("✅ At least 1 number (0-9)");
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(inputPassword)) newRules.push("✅ At least 1 special character (@, #, $, etc.)");
    if (inputPassword.length < 8) newRules.push("✅ At least 8 characters long");

    setPasswordErrors(newRules);
    setErrors((prev) => ({ ...prev, password: newRules.length ? "Password does not meet requirements!" : "" }));
  };

  return (
    <div>
      <input
        type="password"
        className="form-control"
        placeholder="Password"
        value={password}
        onChange={handlePasswordChange}
      />
      <ul className="password-rules">
        {passwordErrors.map((error, index) => (
          <li key={index} className="">{error}</li>
        ))}
      </ul>
    </div>
  );
};

export default PasswordInput;
