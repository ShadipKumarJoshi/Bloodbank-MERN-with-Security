import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";

const AdminRoute = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  return user != null && user.isAdmin ? <Outlet /> : <ErrorPage />;
};

export default AdminRoute;