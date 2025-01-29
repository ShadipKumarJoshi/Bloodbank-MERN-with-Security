import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import ErrorPage from "../components/ErrorPage";

const BloodBankUserRoutes = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  return user != null && user.isBloodBank ? <Outlet /> : <ErrorPage />
};

export default BloodBankUserRoutes;
