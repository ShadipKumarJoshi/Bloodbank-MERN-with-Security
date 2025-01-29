const mongoose = require("mongoose");

const UserRequestSchema = mongoose.Schema(
  {
    patientName: {
      type: String,
      required: true,
    },
    patientAge: {
      type: String,
      required: false,
    },
    patientBloodType: {
      type: String,
      required: true,
    },
    components: {
      type: String,
      required: false,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    hospitalName: {
      type: String,
      required: true,
    },
    hospitalAddress: {
      type: String,
      required: true,
    },
    municipality: {
      type: String,
      required: true,
    },
    wardNo: {
      type: String,
      required: true,
    },
    quantity: {
      type: String,
      required: true,
    },
    urgency: {
      type: String,
      required: true,
    },
    reason: {
      type: String,
      required: false,
    },
    date: {
      type: String,
      required: true,
    },
    instruction: {
      type: String,
      required: false,
    },
    anyPrecautions: {
      type: String,
      required: false,
    },
    contactPerson: {
      type: String,
      required: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    bloodbank: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    isAccepted: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

const UserRequest = mongoose.model("UserRequest", UserRequestSchema);
module.exports = UserRequest;
