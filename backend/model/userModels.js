const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    userImageUrl: {
      type: String,
      default: null,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    token : {
      type : String,
      default: '',
  },
    failedLoginAttempts: {
      type: Number,
      default: 0,
    },
    lastFailedAttempt: {
      type: Date,
    },
   
    otp: {
      type: String,
      default: null,
    },
    otpExpiresAt: {
      type: Date,
      default: null,
    },
    previousPasswords: [
      {
        passwordHash: String,
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
 
    passwordChagedAt: {
      type: Date,
      default: Date.now,
    },
 
    passwordExpiresAt: {
      type: Date,
      // default: Date.now().setDate(Date.now().getDate() + 90),
    },
  },
  { timestamps: true }
);

const Users = mongoose.model("users", userSchema);
module.exports = Users;
