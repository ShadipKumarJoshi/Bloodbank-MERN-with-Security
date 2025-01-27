import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <>
      <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-md text-center">
          <img
            src="/assets/images/error.jpeg"
            width="300"
            height="300"
            alt="Page Not Found"
            className="mx-auto"
            style={{ aspectRatio: "300 / 300", objectFit: "cover" }}
          />
          <h1 className="mt-8 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Oops, page not found!
          </h1>
          <p className="mt-4 text-muted-foreground">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="mt-6">
            {user.isAdmin ? (
              <Link
                className="rounded-md bg-[#FF8534] hover:bg-[#F24E1E] px-4 py-2 font-bold text-white"
                to={"/admin-dashboard"}
              >
                Go to Dashboard
              </Link>
            ) : (
              <Link
                className="rounded-md bg-[#FF8534] hover:bg-[#F24E1E] px-4 py-2 font-bold text-white"
                to={"/"}
              >
                Go to Homepage
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ErrorPage;