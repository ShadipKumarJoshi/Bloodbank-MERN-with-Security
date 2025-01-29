import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { verifyUserApi } from "../apis/Api";

function OTPVerify({ userOtp, isOpen, closeModal, onResend }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const [otp, setOtp] = useState(Array(6).fill(""));
  const firstInputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      firstInputRef.current?.focus();
    }
  }, [isOpen]);

  const handleChange = (element, index) => {
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    if (element.nextSibling && element.value) {
      element.nextSibling.focus();
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let otpValue = parseInt(otp.join(""));
    const data = new FormData();
    data.append("email", user?.email);
    data.append("otp", otp);
    if (otpValue === userOtp) {
      verifyUserApi(data).then((res) => {
        if (res.data.success === true) {
          closeModal();
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      });
      closeModal();
    } else {
      toast.error("Invalid OTP");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-70 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex flex-row justify-end">
          <button title="Close Modal" onClick={closeModal} className="p-1">
            <FontAwesomeIcon
              icon={faTimes}
              className="text-gray-500 hover:text-gray-700"
            />
          </button>
        </div>
        <div className="flex justify-center space-x-4 mb-6">
          {otp.map((_, index) => (
            <input
              key={index}
              ref={index === 0 ? firstInputRef : null}
              type="number"
              maxLength="1"
              className="form-input text-center w-14 h-14 border-2 no-spinners border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-shadow shadow-sm"
              onChange={(e) => handleChange(e.target, index)}
              value={otp[index]}
            />
          ))}
        </div>
        <p className="text-sm text-gray-600 mb-4 text-center">
          An OTP has been sent to the email address {user?.email}
        </p>
        <button
          onClick={handleSubmit}
          className="bg-[#FF8534] hover:bg-[#F24E1E] text-white font-bold py-2 px-4 rounded w-full transition-colors"
        >
          Verify
        </button>
        <p
          className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer mt-4 text-center"
          onClick={onResend}
        >
          Did not receive the OTP? <span className="underline">Resend</span>
        </p>
      </div>
    </div>
  );
}

export default OTPVerify;
