const Users = require("../model/userModels");
const bcrypt = require("bcrypt");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary");
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");
const { sendEmailController } = require("./sendEmailController");
const winston = require("winston");
require("winston-mongodb");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "application.log" }),
    new winston.transports.MongoDB({
      db: "mongodb://127.0.0.1:27017/adoption",
      collection: "logs",
      level: "info",
      options: { useUnifiedTopology: true },
    }),
  ],
});

const logUserActivity = (user, action) => {
  logger.info("User Activity Logged", {
    userName: user.fullName,
    email: user.email,
    action,
    timestamp: new Date().toISOString(),
  });
};

// Function to send reset password email
const sendResetPasswordMail = async (fullName, email, token) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_Password,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_MAIL,
      to: email,
      subject: "Reset the Password",
      html:
        "Hi " +
        fullName +
        ', Please copy the link and <a href="https://localhost:3000/reset_password/' +
        token +
        '">click here</a> to reset your password',
    };

    transporter.sendMail(mailOptions, async (error, info) => {
      if (error) {
        logger.error("Error sending reset password email", {
          error: error.message,
        });
      } else {
        logger.info("Reset password email sent", { response: info.response });
      }
    });
  } catch (error) {
    logger.error("Error in sendResetPasswordMail", { error: error.message });
  }
};

// Function to create a user
const createUser = async (req, res) => {
  try {
    logger.info("Create User request received", { requestBody: req.body });

    const { fullName, email, password } = req.body;

    const nameRegex = /^[a-zA-Z]+(?:\s[a-zA-Z]+)+$/;
    if (!fullName || !nameRegex.test(fullName)) {
      return res.json({
        success: false,
        message:
          "Please enter a valid full name (first and last name, letters only).",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email address.",
      });
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!password || !passwordRegex.test(password)) {
      return res.json({
        success: false,
        message:
          "Password must be at least 8 characters long, and include an uppercase letter, a lowercase letter, a number, and a special character.",
      });
    }

    const existingUser = await Users.findOne({ email: email });
    if (existingUser) {
      return res.json({
        success: false,
        message: "User already exists.",
      });
    }

    const randomSalt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, randomSalt);

    const newUser = new Users({
      fullName,
      email,
      password: encryptedPassword,
      previousPasswords: [
        {
          passwordHash: encryptedPassword,
          date: Date.now(),
        },
      ],
    });

    const passwordExpiresAt = new Date();
    passwordExpiresAt.setDate(passwordExpiresAt.getDate() + 30);
    newUser.passwordChangedAt = new Date();
    newUser.passwordExpiresAt = passwordExpiresAt;

    await newUser.save();
    logger.info("User created successfully", { userId: newUser._id });

    res.status(200).json({
      success: true,
      message: "User created successfully.",
      data: newUser,
    });
  } catch (error) {
    logger.error("Error in createUser", { error: error.message });
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// Function to send unlock notification email
const sendUnlockNotification = async (fullName, email) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_MAIL,
      to: email,
      subject: "Account Unlocked",
      html: `Hi ${fullName},<br/><br/>Your account has been unlocked. You can now try logging in again.<br/><br/>Regards,<br/>Adoption Hub`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        logger.error("Error sending unlock notification", {
          error: error.message,
        });
      } else {
        logger.info("Unlock notification sent", { response: info.response });
      }
    });
  } catch (error) {
    logger.error("Error in sendUnlockNotification", { error: error.message });
  }
};

// Function to log in a user
const loginUser = async (req, res) => {
  const { email, password, captcha } = req.body;

  if (!email || !password) {
    return res.json({
      success: false,
      message: "Please fill all the fields.",
    });
  }

  try {
    const user = await Users.findOne({ email: email });
    if (!user) {
      return res.json({
        success: false,
        message: "User does not exist.",
      });
    }

    if (user.isLocked && new Date() < user.lockUntil) {
      const remainingTime = Math.ceil((user.lockUntil - new Date()) / 60000);
      return res.json({
        success: false,
        message: `Your account is locked. Try again in ${remainingTime} minutes.`,
      });
    }

    if (user.failedLoginAttempts >= 5) {
      user.isLocked = true;
      user.lockUntil = new Date(Date.now() + 15 * 60000);
      await user.save();
      return res.json({
        success: false,
        message:
          "Your account is locked due to multiple failed login attempts. Please try again after 5 minutes.",
      });
    }

    if (user.failedLoginAttempts >= 3) {
      if (!captcha) {
        return res.json({
          success: false,
          message: "Please complete the captcha.",
        });
      }

      const secretKey = process.env.RECAPTCHA_SECRET_KEY;
      const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captcha}`;

      const response = await axios.post(verificationUrl);
      const { success } = response.data;

      if (!success) {
        return res.json({
          success: false,
          message: "Captcha validation failed.",
        });
      }
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      user.failedLoginAttempts += 1;
      user.lastFailedAttempt = new Date();
      await user.save();

      if (user.failedLoginAttempts >= 5) {
        user.isLocked = true;
        user.lockUntil = new Date(Date.now() + 1 * 60000);
        await user.save();

        setTimeout(async () => {
          user.isLocked = false;
          user.failedLoginAttempts = 0;
          user.lockUntil = null;
          await user.save();
          await sendUnlockNotification(user.fullName, user.email);
        }, 5 * 60000);

        return res.json({
          success: false,
          message:
            "Your account is locked due to multiple failed login attempts. Please try again after 5 minutes.",
        });
      }

      return res.json({
        success: false,
        message: "Password does not match.",
      });
    }

    user.failedLoginAttempts = 0;
    user.lastFailedAttempt = null;
    user.isLocked = false;
    user.lockUntil = null;
    await user.save();

    const now = new Date();
    let passwordExpired = false;

    if (user.passwordExpiresAt && now > user.passwordExpiresAt) {
      passwordExpired = true;
      return res.json({
        success : false,
        passwordExpired : passwordExpired,
        message : "Your Password has been expired !"
      })
    }

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    logger.info({
      message: {
        text: "User logged in successfully",
        userId: user._id,
        Fullname: user.fullName,
        sessionId: req.sessionID,
        url: req.originalUrl,
        method: req.method,
      },
    });

    res.status(200).json({
      success: true,
      token: token,
      userData: user,
      message: "Welcome to Adoption Hub",
    });
  } catch (error) {
    logger.error("Error in loginUser", {
      error: error.message,
      url: req.originalUrl,
      method: req.method,
    });
    res.json(error);
  }
};

// Function to get user pagination
const getUserPagination = async (req, res) => {
  const requestedPage = req.query.page;
  const resultPerPage = 8;
  try {
    const users = await Users.find({})
      .skip((requestedPage - 1) * resultPerPage)
      .limit(resultPerPage);

    const totalUsersCount = await Users.countDocuments();

    if (users.length === 0) {
      return res.json({
        success: false,
        message: "No Users found",
      });
    }

    logger.info("User pagination fetched", {
      page: requestedPage,
      totalUsers: totalUsersCount,
    });

    res.json({
      success: true,
      users,
      totalPages: Math.ceil(totalUsersCount / resultPerPage),
    });
  } catch (error) {
    logger.error("Error in getUserPagination", { error: error.message });
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Function to get all users
const getAllUsers = async (req, res) => {
  try {
    const listOfUsers = await Users.find();
    logger.info("Fetched all users", { totalUsers: listOfUsers.length });
    res.json({
      success: true,
      message: "User Fetched Successfully",
      users: listOfUsers,
    });
  } catch (error) {
    logger.error("Error in getAllUsers", { error: error.message });
    res.status(500).json("Server Error");
  }
};

// Function to get a single user
const getSingleUsers = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.json({
      message: "No record with given id:",
      success: false,
    });
  }
  try {
    const singleUser = await Users.findById(id);
    logger.info("Fetched single user", { userId: id });
    res.json({
      success: true,
      message: "User Fetched",
      user: singleUser,
    });
  } catch (error) {
    logger.error("Error in getSingleUsers", { error: error.message });
    res.status(500).json("Server Error");
  }
};

// Function to update a user
const updateUser = async (req, res) => {
  logger.info("Update User request received", {
    requestBody: req.body,
    requestFiles: req.files,
  });

  const { fullName, email, address } = req.body;
  const { userImage } = req.files;
  const id = req.params.id;

  if (!fullName || !email) {
    return res.json({
      success: false,
      message: "Please enter all the fields",
    });
  }
  try {
    if (userImage) {
      let uploadedImage = await cloudinary.v2.uploader.upload(userImage.path, {
        folder: "users",
        crop: "scale",
      });

      const updatedUser = {
        fullName,
        email,
        userImageUrl: uploadedImage.secure_url,
      };
      await Users.findByIdAndUpdate(id, updatedUser);
      logger.info("User updated successfully with image", { userId: id });
      res.json({
        success: true,
        message: "Updated Successfully",
        user: updatedUser,
      });
    } else {
      const updatedUser = {
        fullName,
        email,
        address,
      };
      await Users.findByIdAndUpdate(id, updatedUser);
      logger.info("User updated successfully without image", { userId: id });
      res.json({
        success: true,
        message: "Updated Successfully Without Image",
        user: updatedUser,
      });
    }
  } catch (error) {
    logger.error("Error in updateUser", { error: error.message });
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Function to change password
const changePassword = async (req, res) => {
  const userId = req.params.id;
  const { currentPassword, newPassword, confirmPassword } = req.body;

  try {
    // Fetch the user by ID
    const user = await Users.findById(userId);

    // Check if the user exists
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check if the current password is correct
    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    // Check if newPassword and confirmPassword match
    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "New password and confirm password do not match",
      });
    }

    const isPreviousPassword = await Promise.all(
      user.previousPasswords.map(async (prevPassword) => {
        return await bcrypt.compare(newPassword, prevPassword.passwordHash);
      })
    );

    if (isPreviousPassword.includes(true)) {
      return res.json({
        success: false,
        message: "Password cannot be the same as the previous password",
      });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    user.password = hashedPassword;

    // Set password expiration to 30 days from now
    user.passwordChangedAt = new Date();
    const passwordExpiresAt = new Date();
    passwordExpiresAt.setDate(passwordExpiresAt.getDate() + 30);
    user.passwordExpiresAt = passwordExpiresAt;

    user.previousPasswords.push({
      passwordHash: user.password,
      date: Date.now(),
    });

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error("Error in changePassword:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};
// Function to delete a user
const deleteUser = async (req, res) => {
  try {
    const deleteUser = await Users.findByIdAndDelete(req.params.id);
    if (!deleteUser) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    logger.info("User deleted successfully", { userId: req.params.id });

    res.json({
      success: true,
      message: "User deleted Successfully",
    });
  } catch (error) {
    logger.error("Error in deleteUser", { error: error.message });
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Function to handle forgotten passwords
const forgetPassword = async (req, res) => {
  try {
    const userData = await Users.findOne({ email: req.body.email });
    if (userData) {
      const randomString = randomstring.generate();
      await Users.updateOne(
        { email: req.body.email },
        { $set: { token: randomString } }
      );
      sendResetPasswordMail(userData.fullName, userData.email, randomString);
      logger.info("Reset password email sent", { email: userData.email });
      res
        .status(200)
        .send({ success: true, message: "Please check your inbox of mail" });
    } else {
      res
        .status(200)
        .send({ success: true, message: "This email does not exist" });
    }
  } catch (error) {
    logger.error("Error in forgetPassword", { error: error.message });
    res.status(400).send({ success: false, message: error.message });
  }
};

// Function to search users
const searchUsers = async (req, res) => {
  try {
    const data = await Users.find({
      $or: [
        { fullName: { $regex: new RegExp(req.params.key, "i") } },
        { email: { $regex: new RegExp(req.params.key, "i") } },
      ],
    });

    logger.info("Users search performed", {
      searchKey: req.params.key,
      resultCount: data.length,
    });

    res.send(data);
  } catch (error) {
    logger.error("Error in searchUsers", { error: error.message });
    res.status(500).send({ error: "Internal Server Error" });
  }
};

const resetPassword = async (req, res) => {
  try {
    const token = req.params.token;
    const tokenData = await Users.findOne({ token });

    console.log(tokenData);

    if (!tokenData) {
      return res
        .status(200)
        .send({ success: false, message: "The token is expired" });
    }

    const { password } = req.body;
    if (!password || password.trim() === "") {
      return res.json({ success: false, message: "Invalid password" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const isPreviousPassword = await Promise.all(
      tokenData.previousPasswords.map(async (prevPassword) => {
        return await bcrypt.compare(password, prevPassword.passwordHash);
      })
    );

    console.log(isPreviousPassword);

    if (isPreviousPassword.includes(true)) {
      return res.json({
        success: false,
        message: "Password cannot be the same as the previous password",
      });
    }

    await tokenData.previousPasswords.push({
      passwordHash: tokenData.password,
      date: Date.now(),
    });

    await tokenData.save();

    await Users.updateOne({ token }, { $set: { password: hashedPassword } });

    tokenData.passwordChangedAt = new Date();
    const passwordExpiresAt = new Date();
    passwordExpiresAt.setDate(passwordExpiresAt.getDate() + 30);
    tokenData.passwordExpiresAt = passwordExpiresAt;

    logger.info("Password reset successfully", { email: tokenData.email });

    res
      .status(200)
      .send({ success: true, message: "Password reset successfully" });
  } catch (error) {
    logger.error("Error in resetPassword", { error: error.message });
    res.status(400).send({ success: false, message: error.message });
  }
};

// Function to get user count
const getUserCount = async (req, res) => {
  try {
    const totalUsersCount = await Users.countDocuments();
    logger.info("User count retrieved", { totalUsersCount });
    res.json({
      success: true,
      totalUsersCount,
    });
  } catch (error) {
    logger.error("Error in getUserCount", { error: error.message });
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


const sendOtp = async (req, res) => {
  const { email } = req.body;
  // const user = await Users.findOne({ email: email });
  const randomOtp = Math.floor(100000 + Math.random() * 900000);
  // console.log(randomOtp);
  await sendEmailController(
    email,
    "Adoption Hub",
    `Your Otp is: ${randomOtp}`
  ).then(async (success) => {
    if (success) {
      res.status(200).json({
        success: true,
        message: "Otp sent successfully",
        otp: randomOtp,
      });
    }
  });
  // } else {
  //   res.json({
  //     success: false,
  //     message: "User not found",
  //   });
  // }
};

// Function to verify a user
const verifyUser = async (req, res) => {
  logger.info("Verify User request received", { requestBody: req.body });
  const { email, otp } = req.body;

  try {
    const user = await Users.findOne({ email });

    if (!user) {
      logger.error("User not found during verification", { email });
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    if (user.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP.",
      });
    }

    if (new Date() > user.otpExpiresAt) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired. Please request a new one.",
      });
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpiresAt = null;
    await user.save();

    logger.info("User verified successfully", { email });
    res.json({
      success: true,
      message: "User verified successfully.",
    });
  } catch (error) {
    logger.error("Error during user verification", { error: error.message });
    res.status(500).json({
      success: false,
      message: "Server Error.",
    });
  }
};

module.exports = {
  createUser,
  loginUser,
  updateUser,
  getAllUsers,
  getSingleUsers,
  deleteUser,
  getUserPagination,
  forgetPassword,
  resetPassword,
  getUserCount,
  changePassword,
  searchUsers,
  sendOtp,
  verifyUser,
};
