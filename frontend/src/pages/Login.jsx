import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../../src/style/login.css";
import "../../src/style/navbar.css";
import { loginUserApi } from "../apis/api";
import CustomFaIcons from "../components/CustomFaIcons";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captcha, setCaptcha] = useState(null);
  const [showCaptcha, setShowCaptcha] = useState(false);

  const changeEmail = (e) => {
    setEmail(e.target.value);
  };

  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(email, password);

    const data = {
      email: email,
      password: password,
      captcha: captcha,
    };

    loginUserApi(data)
      .then((res) => {
        if (res.data.success == false) {
          toast.error(res.data.message);
          if (res.data.message.includes("captcha")) {
            setShowCaptcha(true);
          } else {
            setCaptcha(null);
          }
        } else {
          toast.success(res.data.message);
          const jsonDecode = JSON.stringify(res.data.userData);
          localStorage.setItem("user", jsonDecode);
          localStorage.setItem("token", res.data.token);
          const expiryTime = new Date().getTime() + 2 * 60 * 1000;
          localStorage.setItem("tokenExpiry", expiryTime);

          const userAdmin = res.data.userData;

          if (
            userAdmin.isPasswordReset ||
            userAdmin.isNewUser ||
            res.data.passwordExpired
          ) {
            navigate("/update-password");
          } else if (!userAdmin.isAdmin && !userAdmin.isBloodBank) {
            navigate("/home");
          } else if (!userAdmin.isAdmin && userAdmin.isBloodBank) {
            navigate("/bb/dashboard");
            window.location.reload();
          } else {
            navigate("/admin/dashboard");
            window.location.reload();
          }
        }
      })
      .catch((err) => {
        toast.error("Server Error");
        console.log(err.message);
      })
      .finally(() => {
        setCaptcha(null);
      });
  };

  return (
    <>
      <div className="loginSecondBody">
        <div className="loginContainer">
          <div className="loginForm">
            <header>Login</header>
            <form>
              <div className="loginInputBox">
                <i>
                  <CustomFaIcons icon={faEnvelope} size={"sm"} />
                </i>
                <input onChange={changeEmail} type="text" required />
                <label>Email</label>
              </div>
              <div className="loginInputBox">
                <i>
                  <CustomFaIcons icon={faLock} size={"sm"} />
                </i>
                <input
                  onChange={changePassword}
                  type="password"
                  maxLength="26"
                  required
                />
                <label>Password</label>
              </div>
              <div className="link">
                <Link to={"/forgetpassword"}> Forgot Password</Link>
              </div>
              {showCaptcha && (
                <div className="mt-5 mb-4">
                  <ReCAPTCHA
                    sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                    onChange={(value) => setCaptcha(value)}
                    onExpired={() => setCaptcha(null)}
                  />
                </div>
              )}
              <button
                className="btn btn-dark text-white border-0 btn-outline-danger"
                onClick={handleSubmit}
              >
                Login
              </button>
              <div className="link">
                <p>
                  Don't have an account? <Link to={"/register"}>Signup</Link>
                </p>
              </div>

              {/* <div className="link">
                <p>
                  Want to Register Your Blood Bank ?{" "}
                  <Link to={"/bloodbank"}>Register BloodBank</Link>
                </p>
              </div> */}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
