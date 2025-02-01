// Importing required modules and models
const { validationResult } = require("express-validator");
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const productModel = require("../models/productModel");
const sentOtp = require("../services/sendOTP");
const validatePassword = require("../utils/passwordValidator");
const { encrypt, decrypt } = require("../utils/encryptionHelper");
// const { sanitize } = require("../utils/sanitizer"); // Custom sanitizer utility to sanitize inputs
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const sanitize = require("mongo-sanitize");
const logger = require("../logger");
logger



// // Function to fetch user details
// const getUserDetails = async (req, res) => {
//   try {
//     // Fetch user details using the ID from the request parameters
//     const user = await userModel.findById(req.params.id);

//     // If the user is not found, send a 404 error response
//     if (!user) {
//       return res.status(404).json({ success: false, message: "User not found!" });
//     }

//     // Decrypt sensitive fields (e.g., phone number)
//     const decryptedPhone = decrypt(user.phone);

//     // Send the user data as a response
//     res.status(200).json({
//       success: true,
//       user: { ...user._doc, phone: decryptedPhone }, // Include decrypted phone in the response
//     });
//   } catch (error) {
//     console.error("Error fetching user details:", error);

//     // Send a generic error response for unexpected server issues
//     res.status(500).json({ success: false, message: "Internal server error." });
//   }
// };

const getUserDetails = async (req, res) => {
  try {
    // Ensure userId is provided
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID is required!" });
    }

    // Fetch user from database
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found!" });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("❌ Error fetching user details:", error);
    logger.error("Error fetching user details:", error.message);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};



// ✅ SMTP Configuration for Sending Email
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

// ✅ Password Validation Regex
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// ✅ Create User with Email Verification
const createUser = async (req, res) => {
  try {
    // ✅ Sanitize Inputs to Prevent NoSQL Injection
    const fullname = sanitize(req.body.fullname);
    const phone = sanitize(req.body.phone);
    const email = sanitize(req.body.email);
    const username = sanitize(req.body.username);
    const password = sanitize(req.body.password);
    const role = sanitize(req.body.role) || "Buyer";

    // ✅ Validate Required Fields
    if (!fullname || !phone || !email || !username || !password) {
      return res.status(400).json({ success: false, message: "All fields are required!" });
    }

    // ✅ Validate Password Strength
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long and include uppercase, lowercase, numbers, and special characters.",
      });
    }

    // ✅ Check if Email, Username, or Phone already exists
    const [existingUser, existingEmail, existingPhone] = await Promise.all([
      userModel.findOne({ username }),
      userModel.findOne({ email }),
      userModel.findOne({ phone }),
    ]);

    if (existingUser) {
      return res.status(400).json({ success: false, message: "Username already in use!" });
    }
    if (existingEmail) {
      return res.status(400).json({ success: false, message: "Email already registered!" });
    }
    if (existingPhone) {
      return res.status(400).json({ success: false, message: "Phone number already registered!" });
    }

    // ✅ Hash the Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Generate Email Verification Token (Expires in 1 Hour)
    const emailToken = crypto.randomBytes(32).toString("hex");
    const emailTokenExpires = Date.now() + 3600000; // 1 hour expiration

    // ✅ Create User in Database (But Not Verified Yet)
    const newUser = new userModel({
      fullname,
      phone,
      email,
      username,
      password: hashedPassword,
      role,
      emailToken,
      emailTokenExpires,
      isVerified: false, // ✅ User needs to verify their email
    });

    await newUser.save();

    // ✅ Send Confirmation Email
    // ✅ Send Confirmation Email
    const confirmationUrl = `${process.env.REACT_APP_BACKEND_URL}/api/user/verify-email?token=${emailToken}`;


  const mailOptions = {
    from: `"Kirana Support" <${process.env.SMTP_EMAIL}>`,
    to: email,
    subject: "Email Confirmation - Your Account",
    html: `
      <h2>Welcome to Kirana!</h2>
      <p>Hi ${fullname},</p>
      <p>Thank you for registering. Please confirm your email by clicking the link below:</p>
      <a href="${confirmationUrl}" target="_blank" style="background-color: #27ae60; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-size: 16px;">
        Confirm Email
      </a>
      <p>This link will expire in 1 hour.</p>
      <p>If you did not create an account, please ignore this email.</p>
    `,
  };

      await transporter.sendMail(mailOptions);

      res.status(201).json({
        success: true,
        message: "User created successfully! Please check your email to confirm your account.",
      });
    } catch (error) {
      console.error("❌ Error creating user:", error);
      logger.error("Error creating user:", error.message);
      res.status(500).json({ success: false, message: "Internal server error!" });
    }
  };



const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).send(`<h2 style="color:red;">❌ Invalid or missing token!</h2>`);
    }

    const user = await userModel.findOne({ emailToken: token });

    if (!user) {
      return res.status(400).send(`<h2 style="color:red;">❌ Invalid or expired token!</h2>`);
    }

    // ✅ Update `isVerified` and clear the token
    user.isVerified = true;
    user.emailToken = null;
    await user.save();

    console.log(`✅ Email verified for: ${user.email}`);

    // ✅ Show success message after verification
    return res.send(`
      <div style="text-align:center; padding: 20px; border: 1px solid #ddd; max-width: 500px; margin: auto; font-family: Arial;">
        <h2 style="color: green;">🎉 Your account has been successfully verified!</h2>
        <p>You can now log in to your account.</p>
        <a href="${process.env.REACT_APP_FRONTEND_URL}/login" 
           style="background-color: #27ae60; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-size: 16px;">
           Login Now
        </a>
      </div>
    `);
  } catch (error) {
    console.error("❌ Error verifying email:", error);
    logger.error("Error verifying email:", error.message);
    res.status(500).send(`<h2 style="color:red;">❌ Internal Server Error!</h2>`);
  }
};


// Function to confirm email
const confirmEmail = async (req, res) => {
  const { token } = req.query;

  if (!token) {
    return res.status(400).json({ success: false, message: "Invalid or missing token!" });
  }

  try {
    const user = await userModel.findOne({ emailToken: token });
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid or expired token!" });
    }

    // Mark the user as verified and clear the token
    user.isVerified = true;
    user.emailToken = null;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Email confirmed successfully! You can now log in.",
    });
  } catch (error) {
    console.error("Error confirming email:", error);
    logger.error("Error confirming email:", error.message);
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
};


const loginUser = async (req, res) => {
  // 1. Log the incoming data from the request
  console.log(req.body);

  // 2. Extract and sanitize the necessary data from the request body
  const username = sanitize(req.body.username);
  const password = sanitize(req.body.password);

  // 3. Validate the extracted data (ensure no field is empty)
  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: "Please enter all the fields!!",
    });
  }

  try {
    // 4. Check if a user with the provided username exists
    const user = await userModel.findOne({ username: username });
    if (!user) {
      return res.json({
        success: false,
        message: "User does not exist!!!",
      });
    }

    // 5. Compare the provided password with the stored hashed password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.json({
        success: false,
        message: "Incorrect Password!!!",
      });
    }

    // 6. Generate a JWT token for the user
    const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    // 7. Send a success response with the token and user data
    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      token: token,
      userData: user,
    });
  } catch (error) {
    console.log(error);
    logger.error("Error logging in user:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error!",
    });
  }
};




// Function to update user details
const updateUserDetails = async (req, res) => {
  console.log(req.body);

  // Extract the necessary data from the request body
  const { userId, fullname, username, password } = req.body;

  // Validate the data (ensure no field is empty)
  if (!userId || !fullname || !username || !password) {
    return res.status(400).json({
      success: false,
      message: "Please enter all the fields!!",
    });
  }

  try {
    // Check if another user with the same username already exists
    const existingUserByUsername = await userModel.findOne({
      username: username,
    });
    if (
      existingUserByUsername &&
      existingUserByUsername._id.toString() !== userId
    ) {
      return res.status(400).json({
        success: false,
        message: "Username already in use!",
      });
    }

    // Check if the password is at least 6 characters long
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long!",
      });
    }

    // Hash the new password before storing it
    const randomSalt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, randomSalt);

    // Update the user's details in the database
    const user = await userModel.findByIdAndUpdate(userId, {
      fullname: fullname,
      username: username,
      password: hashedPassword,
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist!!!",
      });
    }

    // Save the updated user
    await user.save();

    // Send a success response back to the client
    res.status(200).json({
      success: true,
      message: "User updated successfully",
    });
  } catch (error) {
    console.log(error);
    logger.error("Error updating user:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error!",
    });
  }
};


const updatePassword = async (req, res) => {
  const { userId, newPassword } = req.body;

  // 🔹 Validate request body
  if (!userId || !newPassword) {
    return res.status(400).json({ success: false, message: "User ID and new password are required!" });
  }

  try {
    // 🔹 Find user by ID
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found!" });
    }

    // 🔹 Check password expiration (90 days policy)
    const passwordExpiryDays = 90;
    const daysSinceLastUpdate = (Date.now() - new Date(user.passwordLastUpdated)) / (1000 * 60 * 60 * 24);
    if (daysSinceLastUpdate > passwordExpiryDays) {
      return res.status(401).json({ success: false, message: "Your password has expired. Please reset it." });
    }

    // 🔹 Validate new password strength
    if (!validatePassword(newPassword)) {
      return res.status(400).json({ success: false, message: "Weak password! Use a mix of uppercase, lowercase, numbers, and special characters." });
    }

    // 🔹 Prevent password reuse (Check last 3 passwords)
    const isReusedPassword = user.passwordHistory.some((oldHash) =>
      bcrypt.compareSync(newPassword, oldHash)
    );
    if (isReusedPassword) {
      return res.status(400).json({
        success: false,
        message: "You cannot reuse a recent password. Please choose a different password.",
      });
    }

    // 🔹 Hash the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // 🔹 Update Password & Password History
    user.password = hashedNewPassword;
    user.passwordHistory.push(hashedNewPassword);

    // Keep only the last 3 passwords in history
    if (user.passwordHistory.length > 3) {
      user.passwordHistory.shift();
    }

    // 🔹 Update password last updated timestamp
    user.passwordLastUpdated = Date.now();

    // 🔹 Save the updated user data
    await user.save();

    res.status(200).json({ success: true, message: "Password updated successfully!" });
  } catch (error) {
    console.error("❌ Error updating password:", error);
    logger.error("Error updating password:", error.message);
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
};

module.exports = { updatePassword };

 // Ensure this path is correct to your user model

const userDelete = async (req, res) => {
  const { userId, password } = req.body;  // Expecting userId and password from request body

  debugger
  console.log("password->>>>>>>>>>>>>>>", password)
  if (!userId || !password) {
    return res.status(400).json({
      success: false,
      message: "User ID and password must be provided!"
    });
  }

  try {
    // Find the user by ID
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found!"
      });
    }

    // Verify user's password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password!"
      });
    }

    // Delete the user if password matches
    await userModel.deleteOne({ _id: user._id });
    res.status(200).json({
      success: true,
      message: "Account successfully deleted."
    });
  } catch (error) {
    console.error('Error during user deletion:', error);
    logger.error('Error during user deletion:', error.message);
    res.status(500).json({
      success: false,
      message: `Internal server error: ${error.message}`
    });
  }
};

module.exports = userDelete;

// Function to handle placing an order
const orders = async (req, res) => {
  console.log(req.body); // Log the request body for debugging

  const { userId, productCost, paidStatus, orderId, productIds } = req.body;

  // Check if any required fields are missing
  if (!userId || !productCost || paidStatus === undefined || !orderId) {
    return res.json({
      success: false,
      message: "All fields are required!", // Return an error if any fields are missing
    });
  }

  try {
    // Find the user by their ID in the database
    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({
        success: false,
        message: "User does not exist!", // Return an error if the user doesn't exist
      });
    }

    // Create a new order object with the provided details
    const userOrder = {
      userId,
      productCost,
      paidStatus,
      orderId,
    };

    if (productIds != null) {
      for (const productId of productIds) {
        const product = await productModel.findById(productId);
        if (product) {
          product.adminOrders.push(userOrder);
          await product.save();
        } else {
          console.log(`Product with ID ${productId} not found.`); // Log if the product is not found
        }
      }
    }

    // Clear user cart after placing the order
    user.cart = [];
    // Add the order to the user's orders and save the user
    user.orders.push(userOrder);
    await user.save();

    // Send a success response with the order details
    res.json({
      success: true,
      message: "Order placed successfully!",
      orderD: userOrder,
    });
  } catch (e) {
    console.log(e); // Log any errors that occur
    return res.json({
      success: false,
      message: "Internal server error!", // Return an error if something goes wrong
    });
  }
};

// Function to handle forgot password requests
const forgotPassword = async (req, res) => {
  const { phone } = req.body;

  // Check if the phone number is provided
  if (!phone) {
    return res.status(400).json({
      success: false,
      message: "Please enter phone number!", // Return an error if the phone number is missing
    });
  }

  try {
    // Find the user by their phone number
    const user = await userModel.findOne({ phone: phone });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Phone not found!", // Return an error if the phone number is not found
      });
    }

    // Generate a random 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    // Set the OTP expiry time to 6 minutes
    const expiryDate = Date.now() + 360000;

    // Save the OTP and its expiry time to the user's account
    user.resetPasswordOTP = otp;
    user.resetPasswordExpires = expiryDate;
    await user.save();

    // Send the OTP to the user's phone number
    const isSent = await sentOtp(phone, otp);

    // Check if the OTP was sent successfully
    if (!isSent) {
      return res.status(400).json({
        success: false,
        message: "Error sending OTP!", // Return an error if the OTP couldn't be sent
      });
    }

    // Send a success response if the OTP was sent successfully
    return res.status(200).json({
      success: true,
      message: "OTP sent successfully!",
    });
  } catch (e) {
    console.log(e); // Log any errors that occur
    logger.error("Error sending OTP:", e.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!", // Return an error if something goes wrong
    });
  }
};

// function getMe requests
const getMe = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log(`Decoded token: ${JSON.stringify(decoded)}`);

    const user = await userModel.findById(decoded.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User does not exist!",
      });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    logger.error("Error fetching user:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Function to verify OTP and set a new password
const verifyOtpAndSetPassword = async (req, res) => {
  console.log(req.body);
  // 1. Get data from the request body
  const { phone, otp, newPassword } = req.body;

  // 2. Validate the data (If empty, stop the process and send an error response)
  if (!phone || !otp || !newPassword) {
    return res.status(400).json({
      success: false,
      message: "Please enter all fields!",
    });
  }

  try {
    // 3. Find the user by phone number
    const user = await userModel.findOne({ phone: phone });

    // 4. Check if the OTP has expired
    if (user.resetPasswordExpires < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "OTP Expired!",
      });
    }

    // 5. Verify the OTP
    if (user.resetPasswordOTP != otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP!",
      });
    }

    // 6. Hash the new password
    const randomSalt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, randomSalt);

    // 7. Update the user's password in the database
    user.password = hashedPassword;
    await user.save();

    // 8. Send a success response
    return res.status(200).json({
      success: true,
      message: "Password updated successfully!",
    });
  } catch (error) {
    console.log(error);
    logger.error("Error updating password:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

// Exporting all the functions so they can be used in other parts of the application
module.exports = {
  createUser,
  loginUser,
  updatePassword,
  updateUserDetails,
  userDelete,
  getUserDetails,
  orders,
  forgotPassword,
  verifyOtpAndSetPassword,
  getMe,
  confirmEmail,
  verifyEmail,

};











