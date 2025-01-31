
import React, { useState } from "react";
import { toast } from "react-toastify";
import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/Login.css";
import { loginUserApi } from "../../api/Api";
import loginImg from "../../assets/images/login_cover.png";
import userIcon from "../../assets/images/user.png";
import Captcha from "../Captcha/Captcha"; // Your reCAPTCHA component

const Login = () => {
  const navigate = useNavigate();

  // State for username, password, and CAPTCHA token
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [captchaToken, setCaptchaToken] = useState(null);

  // State for error messages
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Validation function
  const validation = () => {
    let isValid = true;

    if (username.trim() === "") {
      setUsernameError("Username is required");
      isValid = false;
    }

    if (password.trim() === "") {
      setPasswordError("Password is required");
      isValid = false;
    }

    if (!captchaToken) {
      toast.error("Please complete the CAPTCHA.");
      isValid = false;
    }

    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form inputs
    const isValidated = validation();
    if (!isValidated) {
      return;
    }

    // Data to send to the backend
    const data = {
      username: username,
      password: password,
      captchaToken: captchaToken, // Include CAPTCHA token
    };

    try {
      const res = await loginUserApi(data); // API call to backend

      if (!res.data || res.data.success === false) {
        toast.error(res.data?.message || "Login failed. Please try again."); // Show error toast if login fails
        return;
      }

      toast.success(res.data.message); // Show success toast if login succeeds

      // Ensure userData exists before proceeding
      const user = res.data.userData;
      if (!user) {
        toast.error("Invalid response from the server. Please contact support.");
        return;
      }

      // Store the token and user data in localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userData", JSON.stringify(user));

      // Navigate based on user role
      if (user.isAdmin) {
        navigate("/admin/dashboard");
      } else {
        navigate("/home");
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="8" className="m-auto">
            <div className="login__container d-flex justify-content-between">
              <div className="login__img">
                <img src={loginImg} alt="" />
              </div>

              <div className="login__form">
                <div className="user">
                  <img src={userIcon} alt="" />
                </div>
                <h2>Login</h2>

                <Form onSubmit={handleSubmit}>
                  <FormGroup>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => {
                        setUsername(e.target.value);
                        setUsernameError("");
                      }}
                    />
                    {usernameError && (
                      <p className="text__danger">{usernameError}</p>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setPasswordError("");
                      }}
                    />
                    {passwordError && (
                      <p className="text__danger">{passwordError}</p>
                    )}
                  </FormGroup>
                  <Captcha onCaptchaChange={(value) => setCaptchaToken(value)} /> {/* Capture CAPTCHA token */}

                  <Button className="btn secondary__btn auth__btn" type="submit">
                    Login
                  </Button>
                </Form>

                <p>
                  Don't have an account? <Link to="/register">Create</Link>
                </p>
                <p>
                  <Link to="/forgotpassword">Forgot Password?</Link>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Login;