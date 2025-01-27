import { useCallback } from "react";
import { toast } from "react-toastify";

const isAuthenticated = () => {
  return localStorage.getItem("user") !== null;
};

const useAuthCheck = () => {
  const verifyAuthBeforeAction = useCallback((action) => {
    if (isAuthenticated()) {
      action();
    } else {
      toast.error("You must LogIn First");
    }
  }, []);

  return verifyAuthBeforeAction;
};

export default useAuthCheck;
