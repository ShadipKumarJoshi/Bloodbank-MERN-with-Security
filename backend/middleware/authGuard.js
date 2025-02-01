const jwt = require("jsonwebtoken");
const rateLimit = require("express-rate-limit");
const nodemailer = require("nodemailer");
const userModel = require("../models/userModel");

// **🔹 Brute-force Prevention: Rate Limiter**
const authRateLimiter = rateLimit({
  windowMs: 2 * 60 * 1000, // **2 minutes**
  max: 3, // **Limit each IP to 3 requests per window**
  message: {
    success: false,
    message: "Too many authentication attempts. Please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// **🔹 SMTP Transporter Configuration for Email**
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_EMAIL, // **Your Gmail Address**
    pass: process.env.SMTP_PASSWORD, // **Your Gmail App Password**
  },
});

// **🔹 Generate OTP and Send Email**
const sendOtpEmail = async (userEmail, otp) => {
  const mailOptions = {
    from: `"MyApp Support" <${process.env.SMTP_EMAIL}>`,
    to: userEmail,
    subject: "Email Confirmation - OTP Verification",
    text: `Your OTP code is ${otp}. Please enter this code to verify your email.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ OTP email sent to ${userEmail}`);
  } catch (error) {
    console.error("❌ Error sending OTP email:", error);
    throw new Error("Unable to send OTP email. Please try again later.");
  }
};


const generateToken = (user) => {
  const payload = {
    id: user._id,
    role: user.role
  };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
};


// **🔹 Authentication Guard Middleware**
const authGuard = async (req, res, next) => {
  console.log("📌 Incoming Headers:", req.headers);

  // **1️⃣ Extract Authorization Header**
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(400).json({ success: false, message: "Auth Header not found!" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(400).json({ success: false, message: "Token not found!" });
  }

  try {
    // **2️⃣ Verify Token**
    const decodedUserData = jwt.verify(token, process.env.JWT_SECRET);

    // **3️⃣ Check If Email is Verified**
    const user = await userModel.findById(decodedUserData.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found!" });
    }
    if (!user.isVerified) {
      return res.status(403).json({ success: false, message: "Please verify your email to log in." });
    }

    // **4️⃣ Attach User Data to Request**
    req.user = user;
    next();
  } catch (error) {
    console.error("❌ Authentication Error:", error);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ success: false, message: "Session expired. Please log in again!" });
    }

    res.status(401).json({ success: false, message: "Invalid token! Authentication failed." });
  }
};

module.exports = {
  authGuard,
  authRateLimiter,
  sendOtpEmail,
  generateToken, // Exported so it can be used in login and signup
};
