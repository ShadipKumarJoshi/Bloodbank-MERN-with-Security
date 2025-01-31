import React, { useState } from "react";
import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
import { Link } from "react-router-dom";
import "../../styles/Register.css";
import { toast } from "react-toastify";
import { registerUserApi } from "../../api/Api";
// import zxcvbn from "zxcvbn";

import registerImg from "../../assets/images/register_cover.jpg";
import userIcon from "../../assets/images/user.png";
import PasswordInput from "./PasswordInput";


const Register = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [usertype, setUserType] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  // const [passwordStrength, setPasswordStrength] = useState(null);

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    let isValid = true;

    if (!fullname.trim()) {
      newErrors.fullname = "Full Name is required";
      isValid = false;
    }
    if (!email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }
    if (!phone.trim()) {
      newErrors.phone = "Phone is required";
      isValid = false;
    } else if (phone.length !== 10 || isNaN(phone)) {
      newErrors.phone = "Invalid Phone Number";
      isValid = false;
    }
    if (!username.trim()) {
      newErrors.username = "Username is required";
      isValid = false;
    }
    if (!usertype.trim()) {
      newErrors.usertype = "User Type is required";
      isValid = false;
    }
    // if (!password.trim()) {
    //   newErrors.password = "Password is required";
    //   isValid = false;
    // } else if (passwordStrength && passwordStrength.score < 2) {
    //   newErrors.password = "Password is too weak";
    //   isValid = false;
    // }
    if (password !== confirmpassword) {
      newErrors.confirmpassword = "Passwords do not match";
      isValid = false;
    }
    if (!confirmpassword.trim()) {
      newErrors.confirmpassword = "Confirm Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // const handlePasswordChange = (e) => {
  //   const inputPassword = e.target.value;
  //   setPassword(inputPassword);

  //   const strength = zxcvbn(inputPassword);
  //   setPasswordStrength(strength);
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!validate()) return;

  //   const data = {
  //     fullname,
  //     email,
  //     phone,
  //     usertype,
  //     username,
  //     password,
  //   };

  //   try {
  //     const res = await registerUserApi(data);
  //     if (res.data.success) {
  //       toast.success(
  //         "Registration successful! Please check your email to confirm."
  //       );
  //       window.location = "/login";
  //     } else {
  //       toast.error(res.data.message || "Registration failed. Try again.");
  //     }
  //   } catch (err) {
  //     toast.error("An error occurred during registration. Try again later.");
  //     console.error(err);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validate()) return; // Ensure validation passes
  
    const data = {
      fullname,
      email,
      phone,
      role: usertype, // Ensure the role field is sent correctly
      username,
      password,
    };
  
    console.log("📤 Sending Registration Data:", data);
  
    try {
      const res = await registerUserApi(data);
  
      console.log("✅ API Response:", res.data);
  
      if (res.data.success) {
        toast.success("Registration successful! Please check your email to confirm.");
        window.location = "/login";
      } else {
        toast.error(res.data.message || "Registration failed. Try again.");
      }
    } catch (err) {
      console.error("❌ API Error:", err);
  
      if (err.response) {
        console.error("❌ Server Response:", err.response.data);
        toast.error(err.response.data.message || "An error occurred during registration.");
      } else {
        toast.error("Network error. Please check your internet connection.");
      }
    }
  };
  
  return (
    <section>
      <Container>
        <Row>
          <Col lg="8" className="m-auto">
            <div className="register__container d-flex justify-content-between">
              <div className="register__img">
                <img src={registerImg} alt="" />
              </div>

              <div className="register__form">
                <div className="user">
                  <img src={userIcon} alt="" />
                </div>
                <h2>Register</h2>

                <Form onSubmit={handleSubmit}>
                  <FormGroup>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Full Name"
                      value={fullname}
                      onChange={(e) => {
                        setFullname(e.target.value);
                        setErrors((prev) => ({ ...prev, fullname: "" }));
                      }}
                    />
                    {errors.fullname && (
                      <p className="text__danger">{errors.fullname}</p>
                    )}
                  </FormGroup>

                  <FormGroup>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setErrors((prev) => ({ ...prev, email: "" }));
                      }}
                    />
                    {errors.email && (
                      <p className="text__danger">{errors.email}</p>
                    )}
                  </FormGroup>

                  <FormGroup>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Phone"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        setErrors((prev) => ({ ...prev, phone: "" }));
                      }}
                    />
                    {errors.phone && (
                      <p className="text__danger">{errors.phone}</p>
                    )}
                  </FormGroup>

                  <FormGroup>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => {
                        setUsername(e.target.value);
                        setErrors((prev) => ({ ...prev, username: "" }));
                      }}
                    />
                    {errors.username && (
                      <p className="text__danger">{errors.username}</p>
                    )}
                  </FormGroup>

                  <FormGroup>
                    <select
                      className="form-control"
                      value={usertype}
                      onChange={(e) => {
                        setUserType(e.target.value);
                        setErrors((prev) => ({ ...prev, usertype: "" }));
                      }}
                    >
                      <option value="">Select Option</option>
                      <option value="Buyer">Buyer</option>
                      <option value="Seller">Seller</option>
                    </select>
                    {errors.usertype && (
                      <p className="text__danger">{errors.usertype}</p>
                    )}
                  </FormGroup>

                  {/* <FormGroup>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      
                      onChange={handlePasswordChange}
                    />
                    {errors.password && (
                      <p className="text__danger">{errors.password}</p>
                    )}
                    {passwordStrength && (
                      <p
                        className={`text__${
                          ["danger", "warning", "success"][
                            passwordStrength.score
                          ]
                        }`}
                      >
                        {passwordStrength.feedback.suggestions[0] || ""}
                      </p>
                    )}
                  </FormGroup> */}

                  <FormGroup>
      <PasswordInput password={password} setPassword={setPassword} setErrors={setErrors} />
      {errors.password && <p className="">{errors.password}</p>}
    </FormGroup>

                  <FormGroup>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Confirm Password"
                      value={confirmpassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        setErrors((prev) => ({ ...prev, confirmpassword: "" }));
                      }}
                    />
                    {errors.confirmpassword && (
                      <p className="text__danger">{errors.confirmpassword}</p>
                    )}
                  </FormGroup>

                  <Button className="btn secondary__btn auth__btn" type="submit">
                    Register
                  </Button>
                </Form>

                <p>
                  Already have an account? <Link to="/login">Login</Link>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Register;