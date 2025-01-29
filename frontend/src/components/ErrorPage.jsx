import React from "react";
import { Link } from "react-router-dom";
import "../style/Errorpage.css";

const ErrorPage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="errorpage">
      <div className="noise"></div>
      <div className="overlay"></div>
      <div className="terminal">
        <h1>
          Oops !!! <span className="errorcode">404</span>
        </h1>
        <p className="output">
          The page you are looking for might have been removed, had its name
          changed or is temporarily unavailable.
        </p>
        <p className="output">
          Please{" "}
          {user?.isAdmin ? (
            <Link to={"/admin/dashboard"} className="underline text-blue-500">return to the homepage</Link>
          ) : (
            <Link to={"/"}>return to the homepage</Link>
          )}
        </p>
        <p className="output">Good luck.</p>
      </div>
    </div>
  );
};

export default ErrorPage;
