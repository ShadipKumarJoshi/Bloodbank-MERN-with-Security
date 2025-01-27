import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { changePasswordApi } from '../apis/Api';
import { faLock, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const UpdatedPasswords = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match");
      return;
    }

    try {
      const response = await changePasswordApi(id, {
        currentPassword,
        newPassword,
        confirmPassword,
      });

      if (response.data.success === true) {
        toast.success(response.data.message);
        navigate('/');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error('Server Error');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm" style={{ fontFamily: 'Poppins' }}>
      <div className="bg-white rounded-lg shadow-lg flex border border-black w-full max-w-[1102px] h-[711px] mx-4 p-6" style={{ borderRadius: '25px' }}>
        <div className="w-1/2">
          <img
            src="/assets/images/login.png"
            alt="Adopt Me"
            className="h-full w-[600px] object-cover rounded-l-lg"
          />
        </div>
        <div className="w-1/2 p-6 relative">
          <button
            onClick={() => navigate('/')}
            className="absolute"
            style={{ top: '29px', right: '27px', fontSize: '1.5rem', color: 'black' }}
          >
            <FontAwesomeIcon icon={faTimes} size="lg" />
          </button>
          <img src="/assets/logo/logo.png" alt="" className="mb-5" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Change Your Password
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <FontAwesomeIcon icon={faLock} className="text-gray-950" />
                </span>
                <input
                  placeholder="Enter your current password"
                  type="password"
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full pl-10 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gray-950"
                  style={{ width: '431px', height: '62px', borderRadius: '10px', fontSize: '16px' }}
                />
              </div>
            </div>
            <div className="mb-4">
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <FontAwesomeIcon icon={faLock} className="text-gray-950" />
                </span>
                <input
                  placeholder="Enter your new password"
                  type="password"
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full pl-10 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gray-950"
                  style={{ width: '431px', height: '62px', borderRadius: '10px', fontSize: '16px' }}
                />
              </div>
            </div>
            <div className="mb-4">
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <FontAwesomeIcon icon={faLock} className="text-gray-950" />
                </span>
                <input
                  placeholder="Re-Enter your new password"
                  type="password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gray-950"
                  style={{ width: '431px', height: '62px', borderRadius: '10px', fontSize: '16px' }}
                />
              </div>
            </div>
            <div className="flex flex-col items-start gap-3">
              <button
                type="submit"
                className="bg-orange-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all duration-500 ease-in-out"
                style={{ width: '431px', height: '62px', borderRadius: '10px', fontSize: '16px', transition: 'all 500ms ease-in-out' }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "#FF7148";
                  e.target.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
                  e.target.style.border = "2px solid black";
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = "#FF8534";
                  e.target.style.boxShadow = "none";
                  e.target.style.border = "none";
                }}
              >
                Submit
              </button>
              <p
                style={{ textAlign: "center", marginTop: "20px", color: "#666" }}
              >
                Remembered the Password?{" "}
                <a
                  href="/"
                  className="text-blue-800 underline"
                >
                  Back to Login
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdatedPasswords;
