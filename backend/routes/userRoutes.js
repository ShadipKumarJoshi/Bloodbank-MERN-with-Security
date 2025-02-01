const express = require("express");
const { body, validationResult } = require("express-validator");
const sanitize = require("mongo-sanitize"); // ✅ NoSQL Injection Prevention
const userController = require("../controllers/userControllers");
const { authGuard, authRateLimiter } = require("../middleware/authGuard");
const rbac = require("../middleware/rbac");

const router = express.Router();

// ✅ Middleware to Prevent NoSQL Injection Before Processing Requests
const sanitizeInput = (req, res, next) => {
  try {
    req.body = sanitize(req.body);
    req.query = sanitize(req.query);
    req.params = sanitize(req.params);
    next();
  } catch (error) {
    console.error("Sanitization Error:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// ✅ Secure User Registration (Prevents NoSQL Injection)
router.post(
  "/create",
  sanitizeInput, // 🛡️ Sanitizes Inputs
  [
    body("fullname").trim().isLength({ min: 3 }).withMessage("Fullname must be at least 3 characters long"),
    body("phone").isMobilePhone().withMessage("Invalid phone number"),
    body("email").isEmail().normalizeEmail().withMessage("Invalid email address"),
    body("username").trim().isAlphanumeric().withMessage("Username must be alphanumeric"),
    body("password")
      .isLength({ min: 8 }).withMessage("Password must be at least 8 characters")
      .matches(/[A-Z]/).withMessage("Password must include an uppercase letter")
      .matches(/[a-z]/).withMessage("Password must include a lowercase letter")
      .matches(/\d/).withMessage("Password must include a number")
      .matches(/[@$!%*?&]/).withMessage("Password must include a special character"),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
  },
  userController.createUser
);

// ✅ Secure Email Verification
router.get("/verify-email", sanitizeInput, userController.verifyEmail);

// ✅ Secure User Login (Prevents NoSQL Injection)
router.post(
  "/login",
  sanitizeInput, // 🛡️ Sanitizes Inputs
  [
    body("username").trim().isAlphanumeric().withMessage("Invalid username"),
    body("password").trim().isLength({ min: 8 }).withMessage("Invalid password"),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
  },
  authRateLimiter,
  userController.loginUser
);
// User Login (Rate Limited)
// router.post("/login", authRateLimiter, userController.loginUser);

// ✅ Secure Update User (Prevents NoSQL Injection)
router.put("/update", sanitizeInput, authGuard, rbac(["Admin", "Buyer", "Seller"]), userController.updateUserDetails);

// ✅ Secure Delete User (Prevents NoSQL Injection)
router.delete("/delete", sanitizeInput, authGuard, rbac(["Buyer"]), userController.userDelete);

// ✅ Secure Get User Details (Prevents NoSQL Injection)
router.get("/details", sanitizeInput, authGuard, rbac(["Admin", "Buyer", "Seller"]), userController.getUserDetails);

// ✅ Secure User Orders (Prevents NoSQL Injection)
router.post("/orders", sanitizeInput, authGuard, rbac(["Buyer"]), userController.orders);
router.post('/updateUser', userController.updateUserDetails);

// ✅ Secure Forgot Password (Prevents NoSQL Injection)
router.post("/forgot_password", sanitizeInput, userController.forgotPassword);

// ✅ Secure OTP Verification (Prevents NoSQL Injection)
router.post("/verify_otp", sanitizeInput, userController.verifyOtpAndSetPassword);

// ✅ Secure Get Logged-in User Details (Prevents NoSQL Injection)
router.get("/getMe", sanitizeInput, authGuard, rbac(["Admin", "Buyer", "Seller"]), userController.getMe);

module.exports = router;
