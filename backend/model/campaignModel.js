const mongoose = require("mongoose");
const user = require("./userModel");

const campaignSchema = mongoose.Schema(
  {
    campaignName: {
      required: true,
      type: String,
    },
    campaignImageUrl: {
      type: String,
      required: true,
    },
    campaignStartDate: {
      type: Date,
      required: true,
    },
    campaignEndDate: {
      type: Date,
      required: true,
    },
    campaignGoal: {
      type: String,
      required: true,
    },
    campaignDonors: {
      type: Number,
      required: false,
    },
    campaignDonations: {
      type: Number,
      required: false,
    },
    campaignLocation: {
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
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Campaign = mongoose.model("Campaign", campaignSchema);

module.exports = Campaign;
