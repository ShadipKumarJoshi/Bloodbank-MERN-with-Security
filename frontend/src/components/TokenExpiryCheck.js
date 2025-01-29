import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const useTokenExpiryCheck = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkTokenExpiry = () => {
      const token = localStorage.getItem("token");
      const expiryTime = localStorage.getItem("tokenExpiry");
      if (token && expiryTime) {
        const now = new Date().getTime();
        if (now > expiryTime) {
          // Token has expired
          logoutUser();
        } else {
          const timeout = expiryTime - now;
          setTimeout(logoutUser, timeout);
        }
      }
    };

    const logoutUser = () => {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("tokenExpiry");
      toast.info("Session expired. Please log in again.");
      navigate("/login");
    };

    checkTokenExpiry();
  }, [navigate]);
};

export default useTokenExpiryCheck;
