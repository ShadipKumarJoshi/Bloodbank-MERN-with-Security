const User = require("../../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary");
const nodemailer = require("nodemailer");
const RequestBlood = require("../../model/RequestBloodModel");
const { sendEmailController } = require("../sendEmailController");
const axios = require("axios");
const winston = require("winston");
const logAction = require("../../middleware/AuditLog");
const user = require("../../model/userModel");
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
      db: "mongodb://127.0.0.1:27017/mainTest",
      collection: "logs",
      level: "info",
      options: { useUnifiedTopology: true },
    }),
  ],
});

const sendEmail = async (to, subject, text) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "markbase99@gmail.com",
      pass: "hwkh esmi mezr sesw",
    },
  });

  // Send mail with defined transport object
  let info = await transporter.sendMail({
    from: "merojagir0@gmail.com",
    to: to,
    subject: subject,
    text: text,
  });
};

// In-memory store for OTPs (for demonstration purposes; consider using Redis or a database in production)
const otpStore = {};

const sendVerification = async (req, res) => {
  const otp = Math.floor(1000 + Math.random() * 9000);
  const otpExpiry = Date.now() + 2 * 60 * 1000;

  const { email } = req.body;
  console.log(otp);

  // Check if email is not valid
  if (!email || !email.includes("@")) {
    return res.json({
      success: false,
      message: "Invalid email address. Please provide a valid email.",
    });
  }

  // Validate email format
  if (!validateEmail(email)) {
    return res.json({
      success: false,
      message: "Please enter a valid email address",
    });
  }

  const isAUser = await User.findOne({ email: email });
  if (isAUser) {
    return res.json({
      success: false,
      message: "User already exists.",
    });
  }

  try {
    const emailSent = await sendEmailController(
      email,
      "Welcome to BloodBank",
      `Your verification code is: ${otp}. This code will expire in 2 minutes.`
    );

    if (emailSent) {
      otpStore[email] = { otp, otpExpiry };

      res.status(200).json({
        success: true,
        message: "OTP has been sent to your email.",
      });
    } else {
      res.status(500).json({
        success: false,
        message:
          "Failed to send email. Please check the recipient's email address.",
      });
    }
  } catch (error) {
    console.error("Error handling /send-verification route:", error);

    let errorMessage = "Server error.";
    if (error.message.includes("No recipients defined")) {
      errorMessage =
        "Invalid email address. Please check the recipient's email address.";
    }

    res.status(500).json({
      success: false,
      message: errorMessage,
    });
  }
};

const validateEmail = (email) => {
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(email);
};
const validatePassword = (password, userInputs = []) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/;

  if (!passwordRegex.test(password)) {
    return false;
  }
  // Check if password contains any part of the user inputs (like name or email)
  if (
    userInputs.some((input) =>
      password.toLowerCase().includes(input.toLowerCase())
    )
  ) {
    return false;
  }

  return true;
};

const createUser = async (req, res) => {
  try {
    const {
      fullName,
      email,
      number,
      password,
      currentAddress,
      // municipality,
      // wardNo,
      userVerificationCode,
    } = req.body;

    const { userImage } = req.files;

    // Validate required fields
    if (
      !fullName ||
      !email ||
      !number ||
      !password ||
      !currentAddress
      //  ||
      // !municipality ||
      // !wardNo
    ) {
      return res.json({
        success: false,
        message: "Please fill all the details",
      });
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.json({
        success: false,
        message: "User Already Exists",
      });
    }

    // Validate the OTP
    const otpRecord = otpStore[email];
    if (!otpRecord) {
      return res.json({
        success: false,
        message: "OTP has expired.",
      });
    }

    if (Date.now() > otpRecord.otpExpiry) {
      delete otpStore[email];
      return res.json({
        success: false,
        message: "OTP has expired.",
      });
    }

    if (parseInt(userVerificationCode) !== parseInt(otpRecord.otp)) {
      return res.json({
        success: false,
        message: "Invalid OTP.",
      });
    }

    let userImageURL = null;
    if (userImage) {
      if (userImage.size > 10485760) {
        return res.json({
          success: false,
          message: "Image size too large. Maximum is 10 MB.",
        });
      }

      const uploadedImage = await cloudinary.v2.uploader.upload(
        userImage.path,
        {
          folder: "Users",
          crop: "scale",
        }
      );

      userImageURL = uploadedImage.secure_url;
    }

    // Encrypt the password
    const generateSalt = await bcrypt.genSalt(10);
    const passwordEncrypted = await bcrypt.hash(password, generateSalt);

    // Create the new user object
    const newUser = new User({
      fullName,
      email,
      number,
      currentAddress,
      // municipality,
      // wardNo,
      password: passwordEncrypted,
      userImageURL,
      previousPasswords: [
        {
          passwordHash: passwordEncrypted,
          date: Date.now(),
        },
      ],
    });

    // Set password expiration to 30 days from creation
    const passwordExpiresAt = new Date();
    passwordExpiresAt.setDate(passwordExpiresAt.getDate() + 30);
    newUser.passwordChangedAt = new Date();
    newUser.passwordExpiresAt = passwordExpiresAt;

    // Save the new user
    await newUser.save();

    delete otpStore[email];

    return res.status(201).json({
      success: true,
      message: "Your account has been created",
    });
  } catch (e) {
    console.error(e);
    res.status(500).json("Server Error!! \n Please Try Again");
  }
};

const loginUser = async (req, res) => {
  const { email, password, captcha } = req.body;

  if (!email || !password) {
    return res.json({
      success: false,
      message: "Please enter all the fields",
    });
  }

  try {
    const findUser = await User.findOne({ email });

    if (!findUser) {
      return res.json({
        success: false,
        message: "Username or password invalid",
      });
    }

    if (findUser.isLocked && new Date() > findUser.lockUntil) {
      findUser.isLocked = false;
      findUser.failedLoginAttempts = 0;
      findUser.lockUntil = null;
      await findUser.save();
    }

    if (findUser.isLocked && new Date() < findUser.lockUntil) {
      const remainingTime = Math.ceil(
        (findUser.lockUntil - new Date()) / 60000
      );
      return res.json({
        success: false,
        message: `Your account is locked. Try again in ${remainingTime} minutes.`,
      });
    }

    if (findUser.failedLoginAttempts >= 5) {
      findUser.isLocked = true;
      findUser.lockUntil = new Date(Date.now() + 5 * 60000);
      await findUser.save();
      return res.json({
        success: false,
        message:
          "Your account is locked due to multiple failed login attempts. Please try again after 5 minutes.",
      });
    }

    if (findUser.failedLoginAttempts >= 3) {
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

    // Compare the provided password with the stored password
    const isMatched = await bcrypt.compare(password, findUser.password);

    if (!isMatched) {
      findUser.failedLoginAttempts += 1;
      findUser.lastFailedAttempt = new Date();
      await findUser.save();

      if (findUser.failedLoginAttempts >= 5) {
        findUser.isLocked = true;
        findUser.lockUntil = new Date(Date.now() + 5 * 60000);
        await findUser.save();

        setTimeout(async () => {
          findUser.isLocked = false;
          findUser.failedLoginAttempts = 0;
          findUser.lockUntil = null;
          await findUser.save();
        }, 5 * 60000);

        await logAction(
          "ACCOUNT_LOCKED",
          findUser._id,
          null,
          null,
          req.route.path,
          req
        );

        return res.json({
          success: false,
          message:
            "Your account is locked due to multiple failed login attempts. Please try again after 5 minutes.",
        });
      }

      await logAction(
        "LOGIN_FAILED",
        findUser._id,
        null,
        null,
        req.route.path,
        req
      );

      return res.json({
        success: false,
        message: "Username or password invalid",
      });
    }

    findUser.failedLoginAttempts = 0;
    findUser.lastFailedAttempt = null;
    findUser.isLocked = false;
    findUser.lockUntil = null;

    const now = new Date();
    let passwordExpired = false;

    if (findUser.passwordExpiresAt && now > findUser.passwordExpiresAt) {
      passwordExpired = true;
      findUser.isPasswordReset = true;
    }

    await findUser.save();

    const token = jwt.sign(
      {
        id: findUser._id,
        isAdmin: findUser.isAdmin,
        isBloodBank: findUser.isBloodBank,
      },
      process.env.JWT_TOKEN_SECRET
    );

    await logAction(
      "LOGIN_SUCCESS",
      findUser._id,
      null,
      null,
      req.route.path,
      req
    );

    logger.info({
      message: {
        text: "User logged in successfully",
        userId: findUser._id,
        Fullname: findUser.fullName,
        sessionId: req.sessionID,
        url: req.originalUrl,
        method: req.method,
      },
    });

    const userData = { ...findUser._doc };
    delete userData.password;

    return res.status(200).json({
      success: true,
      token: token,
      userData: userData,
      passwordExpired: passwordExpired,
      message: "Logged in successfully",
    });
  } catch (error) {
    console.error("Server error: ", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const beAdonor = async (req, res) => {
  const { gender, dob, bloodGroup, noPreviousDonation, emergencyNumber } =
    req.body;
  // console.log(gender, dob, bloodGroup, noPreviousDonation, emergencyNumber);

  const id = req.params.id;

  if (
    !gender ||
    !dob ||
    !bloodGroup ||
    !noPreviousDonation ||
    !emergencyNumber
  ) {
    return res.json({
      success: false,
      message: "Please provide all the required ",
    });
  }

  try {
    // Update donor information
    const updatedDonor = {
      gender: gender,
      dob: dob,
      bloodGroup: bloodGroup,
      noPreviousDonation: noPreviousDonation,
      emergencyNumber: emergencyNumber,
      isADonor: true,
    };
    const updatedUser = await User.findByIdAndUpdate(id, updatedDonor, {
      new: true,
    });

    if (!updatedUser) {
      return res.json({
        success: false,
        message: "User not found or update failed.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "You have been registered as a donor.",
      updatedUser,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error occurred.",
    });
  }
};

//  fetching all the users
const getAllUsers = async (req, res) => {
  try {
    const userList = await User.find({
      $and: [{ isAdmin: false }, { isBloodBank: false }],
    }).sort({ createdAt: -1 });
    const userListForBloodBank = await User.find({
      $and: [{ isAdmin: false }, { isADonor: true }, { isBloodBank: false }],
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      users: userList,
      userListForBloodBank: userListForBloodBank,
      message: "Success",
    });
  } catch (error) {
    res.json(error);
  }
};

const getSingleUser = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.json({
      success: false,
      message: "",
    });
  }
  try {
    const singleUser = await User.findById(id);
    res.status(200).json({
      success: true,
      message: "",
      user: singleUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    // console.log(user.isADonor);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User does not exist",
      });
    }
    let previousData = user.toObject(); // Store previous data for logging purposes
    let updatedUser;

    const { userImage } = req.files;
    // console.log(userImage);
    if (userImage) {
      const uploadedImage = await cloudinary.v2.uploader.upload(
        userImage.path,
        {
          folder: "Users",
          crop: "scale",
        }
      );

      if (user.isADonor == false) {
        const {
          fullName,
          email,
          number,
          currentAddress,
          // municipality,
          // wardNo,
        } = req.body;

        if (
          !fullName ||
          !email ||
          !number ||
          !currentAddress
          //  ||
          // !municipality ||
          // !wardNo
        ) {
          return res.json({
            success: false,
            message: "Please Enter all the fields",
          });
        }
        updatedUser = {
          fullName: fullName,
          email: email,
          number: number,
          currentAddress: currentAddress,
          // municipality: municipality,
          // wardNo: wardNo,
          userImageURL: uploadedImage.secure_url,
        };
      } else {
        const {
          fullName,
          email,
          number,
          currentAddress,
          // municipality,
          // wardNo,
          gender,
          dob,
          isAvailable,
          bloodGroup,
          noPreviousDonation,
          emergencyNumber,
        } = req.body;
        if (
          !fullName ||
          !email ||
          !number ||
          !currentAddress ||
          // !municipality ||
          // !wardNo ||
          !fullName ||
          !gender ||
          !dob ||
          !bloodGroup ||
          !noPreviousDonation ||
          !emergencyNumber
        ) {
          return res.json({
            success: false,
            message: "Please Enter all the fields",
          });
        }
        updateUser = {
          fullName: fullName,
          email: email,
          number: number,
          currentAddress: currentAddress,
          // municipality: municipality,
          // wardNo: wardNo,
          gender: gender,
          dob: dob,
          bloodGroup: bloodGroup,
          noPreviousDonation: noPreviousDonation,
          emergencyNumber: emergencyNumber,
          isAvailable: isAvailable,
          userImageURL: uploadedImage.secure_url,
        };
      }
    } else {
      if (user.isADonor == false) {
        const {
          fullName,
          email,
          number,
          currentAddress,
          // municipality,
          // wardNo,
        } = req.body;

        if (!fullName || !email || !number || !currentAddress) {
          return res.json({
            success: false,
            message: "Please Enter all the fields",
          });
        }
        updatedUser = {
          fullName: fullName,
          email: email,
          number: number,
          currentAddress: currentAddress,
          // municipality: municipality,
          // wardNo: wardNo,
        };
      } else {
        const {
          fullName,
          email,
          number,
          currentAddress,
          // municipality,
          // wardNo,
          gender,
          dob,
          isAvailable,
          bloodGroup,
          noPreviousDonation,
          emergencyNumber,
        } = req.body;
        if (
          !fullName ||
          !email ||
          !number ||
          !currentAddress ||
          // !municipality ||
          // !wardNo ||
          !fullName ||
          !gender ||
          !dob ||
          !bloodGroup ||
          !noPreviousDonation ||
          !emergencyNumber
        ) {
          return res.json({
            success: false,
            message: "Please Enter all the fields",
          });
        }
        updateUser = {
          fullName: fullName,
          email: email,
          number: number,
          currentAddress: currentAddress,
          // municipality: municipality,
          // wardNo: wardNo,
          gender: gender,
          dob: dob,
          bloodGroup: bloodGroup,
          noPreviousDonation: noPreviousDonation,
          emergencyNumber: emergencyNumber,
          isAvailable: isAvailable,
        };
      }
    }

    await User.findByIdAndUpdate(id, updatedUser);
    // Log the update action
    await logAction(
      "UPDATE_USER",
      user._id,
      previousData,
      updatedUser,
      req.route.path,
      req
    );

    return res.status(200).json({
      success: true,
      message: "You Account has been successfully Updated without image",
      updateUser: updatedUser,
    });
  } catch (error) {
    console.log(error);
    // Log the error
    await logAction(
      "UPDATE_USER_FAILED",
      user._id,
      null,
      null,
      null,
      req.route.path,
      req
    );
    return res.status(500).json({
      success: false,
      message: "Internal server error !!",
    });
  }
};

const updateUserWithoutImage = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    // console.log(user.isADonor);
    // console.log(req.body);

    if (user.isADonor == false) {
      const { fullName, email, number, currentAddress, 
        // municipality, wardNo
       } =
        req.body;

      if (
        !fullName ||
        !email ||
        !number ||
        !currentAddress 
        // ||
        // !municipality ||
        // !wardNo
      ) {
        return res.status(404).json({
          success: false,
          message: "Please Enter all the fields",
        });
      }
      const updatedUser = {
        fullName: fullName,
        email: email,
        number: number,
        currentAddress: currentAddress,
        // municipality: municipality,
        // wardNo: wardNo,
      };
      await User.findByIdAndUpdate(id, updatedUser);

      return res.status(200).json({
        success: true,
        message: "You have been register as a donor",
        userData: updatedUser,
      });
    } else {
      const {
        fullName,
        email,
        number,
        currentAddress,
        // municipality,
        // wardNo,
        gender,
        dob,
        isAvailable,
        bloodGroup,
        noPreviousDonation,
        emergencyNumber,
      } = req.body;
      if (
        !fullName ||
        !email ||
        !number ||
        !currentAddress ||
        // !municipality ||
        // !wardNo ||
        !fullName ||
        !gender ||
        !dob ||
        !bloodGroup ||
        !noPreviousDonation ||
        !emergencyNumber
      ) {
        return res.status(404).json({
          success: false,
          message: "Please Enter all the fields",
        });
      }
      const updatedDonor = {
        fullName: fullName,
        email: email,
        number: number,
        currentAddress: currentAddress,
        // municipality: municipality,
        // wardNo: wardNo,
        gender: gender,
        dob: dob,
        bloodGroup: bloodGroup,
        noPreviousDonation: noPreviousDonation,
        emergencyNumber: emergencyNumber,
        isAvailable: isAvailable,
      };
      await User.findByIdAndUpdate(id, updatedDonor);

      return res.status(201).json({
        success: true,
        message: "You Account has been successfully Updated",
        updateUser: updatedDonor,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

const forgetPassword = async (req, res) => {
  const { email } = req.body;
  // console.log(req.body);

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    const generatedPassword = Math.random().toString(36).slice(-6);

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(generatedPassword, salt);
    user.isPasswordReset = true;

    await user.save();

    const emailSubject = "Password Reset";
    const emailText = `Your new password is: ${generatedPassword}`;
    console.log(generatedPassword);

    await sendEmail(email, emailSubject, emailText);

    res.json({
      success: true,
      message: "New password sent to your email for password reset",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const searchUsers = async (req, res) => {
  try {
    const { district, bloodGroup } = req.query;
    let query = {};
    if (district) {
      query.currentAddress = { $regex: district, $options: "i" };
    }
    if (bloodGroup) {
      query.bloodGroup = new RegExp(
        "^" + bloodGroup.replace("+", "\\+").replace("-", "\\-") + "?"
      );
    }
    const users = await User.find({
      $and: [query, { isADonor: true }],
    });
    // console.log(users);

    res.json({
      success: true,
      users: users,
      message: "success",
    });
  } catch (error) {
    console.error("Error searching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getRequestsByUserId = async (req, res) => {
  const id = req.params.id;
  // console.log(id);

  try {
    const userRequests = await RequestBlood.find({ userId: id }).sort({
      createdAt: -1,
    });

    // console.log(userRequests);

    if (!userRequests || userRequests.length === 0) {
      return res.json({
        success: false,
        message: "No requests found for this user",
      });
    }

    res.status(200).json({
      success: true,
      userRequests: userRequests,
      message: "Requests found successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const updatePassword = async (req, res) => {
  const { email, newPassword, oldPassword } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    const isMatched = await bcrypt.compare(oldPassword, user.password);
    if (!isMatched) {
      return res.json({
        success: false,
        message: "Old password is incorrect",
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

    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);

    user.previousPasswords.push({
      passwordHash: user.password,
      date: Date.now(),
    });

    user.password = hashedNewPassword;
    user.isPasswordReset = false;
    user.isNewUser = false;

    // Set password expiration to 30 days from now
    user.passwordChangedAt = new Date();
    const passwordExpiresAt = new Date();
    passwordExpiresAt.setDate(passwordExpiresAt.getDate() + 30);
    user.passwordExpiresAt = passwordExpiresAt;

    await user.save();

    res.json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  createUser,
  loginUser,
  beAdonor,
  getAllUsers,
  getSingleUser,
  updateUser,
  updateUserWithoutImage,
  forgetPassword,
  searchUsers,
  getRequestsByUserId,
  sendVerification,
  updatePassword,
};
