const mongoose = require("mongoose");

const registeredUserSchema = mongoose.Schema(
  {
    campaigns: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Campaign",
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    number: {
      type: Number,
      required: true,
    },
    bloodGroup: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const RegisteredUsers = mongoose.model("RegisteredUsers", registeredUserSchema);
module.exports = RegisteredUsers;
