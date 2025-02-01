const mongoose = require("mongoose");
const { encrypt, decrypt } = require("../utils/encryptionHelper");

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String, // Changed to String to ensure flexibility for country codes
    required: true,
    unique: true,
    set: encrypt, 
    get: decrypt
  },
  password: {
    type: String,
    minLength: 6,
    required: true,
  },
  passwordHistory: {
    type: [String], // Array to store hashes of old passwords
    default: [],
  },
  email: {
  type: String,
  required: true,
  unique: true,
},
emailToken: {
  type: String,
  default: null,
},
isVerified:{ type: Boolean, default: false, required: true },
  passwordLastUpdated: {
    type: Date,
    default: Date.now, // Automatically sets the creation date
  },
  role: {
    type: String,
    enum: ["Admin", "Buyer"], // Restrict role values to these options
    default: "Buyer", // Default role is "Buyer"
  },
  orders: {
    type: Array,
    default: [],
  },
  cart: {
    type: Array,
    default: [],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  resetPasswordOTP: {
    type: Number,
    default: null,
  },
  resetPasswordExpires: {
    type: Date,
    default: null,
  },
});

// Create a collection in MongoDB with the name "users"
const User = mongoose.model("users", userSchema);
module.exports = User;
