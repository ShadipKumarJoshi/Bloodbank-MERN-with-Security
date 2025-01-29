import { CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { forgetPasswordApi } from "../../../apis/api";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();
    const data = { email: email };

    forgetPasswordApi(data)
      .then((res) => {
        if (res.data.success == true) {
          toast.success(res.data.message);
          navigate("/");
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        toast.error("Server Error", err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <div className="flex  items-center justify-content-center mt-32 p-32">
      <div className="bg-white p-8 rounded-md shadow-lg w-96 ">
        <h1 className="text-2xl font-semibold mb-4">Forgot Password</h1>
        <p className="text-gray-600 mb-6">
          Enter your email to reset your password.
        </p>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-600"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="mt-1 p-2 w-full border rounded-md"
            placeholder="Your email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          {isLoading ? (
            <CircularProgress color={"info"} size={20} />
          ) : (
            "Reset Password"
          )}
        </button>
      </div>
    </div>
  );
};

export default ForgetPassword;
