import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";

const UserRoutes = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  return user != null && user != null ? <Outlet /> : <ErrorPage />;
};

export default UserRoutes;