const express = require("express");
const { authGuard, authRateLimiter } = require("../middleware/authGuard");

const router = express.Router();

// Protected Route Example
router.get("/protected-route", authRateLimiter, authGuard, (req, res) => {
  res.status(200).json({
    success: true,
    message: "You have accessed a protected route!",
    user: req.user,
  });
});

// Export router
module.exports = router;
