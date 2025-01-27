import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { forgotPasswordApi } from "../apis/Api";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PasswordForgot = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await forgotPasswordApi({ email });
      console.log(response.data); // Handle the response as needed

      // Check the response for success or failure
      if (response.data.success === true) {
        // Show success message or navigate to another page
        toast.success(response.data.message);
        // You can also navigate to the login page or another page
        navigate('/home');
      } else {
        // Show an error message
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      // Handle error, show an error message, etc.
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-10 backdrop-blur-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <div className="bg-white rounded-lg shadow-lg flex border border-black">
        <div className="w-1/2">
          <img
            src="assets/images/login.png"
            alt="Adopt Me"
            className="h-full w-[600px] object-cover rounded-l-lg"
          />
        </div>
        <div className="w-1/2 p-6 relative">
          <button
            onClick={() => navigate('/')}
            className="absolute top-4 right-4 text-gray-700 text-xl"
          >
            &times;
          </button>
          <img src="assets/logo/logo.png" alt="" className="mb-5" />
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Forgot Your Password
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <div className="relative">
                <span className="absolute bottom-3 flex items-center pl-3">
                  <FontAwesomeIcon icon={faEnvelope} className="text-gray-950" />
                </span>
                <input
                  placeholder="Enter your email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-8 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gray-950"
                />
              </div>
            </div>
            <div className="flex flex-col items-start gap-3">
              <button
                type="submit"
                className="bg-orange-500 w-full hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Send the link
              </button>
              <p
                style={{ textAlign: "center", marginTop: "20px", color: "#666" }}
              >
                Remembered the Password?{" "}
                <a
                  href="/"
                  className="text-blue-800 underline"
                >
                  Back to login
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PasswordForgot;
