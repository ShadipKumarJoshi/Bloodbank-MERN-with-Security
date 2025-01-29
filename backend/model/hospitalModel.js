const { waitFor } = require("@testing-library/react");
const mongoose = require("mongoose");

const hospitalSchema = mongoose.Schema(
  {
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
      type: Number,
      required: true,
    },

    hospitalContactNumber: {
      type: Number,
      required: true,
    },

    hospitalType: {
      type: String,
      required: true,
    },

    hospitalServices: {
      type: String,
      required: true,
    },
    latitude: {
      required: true,
      type: Number,
    },
    longitude: {
      required: true,
      type: Number,
    },
    hospitalImageUrl: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Hospital = mongoose.model("hospital", hospitalSchema);
module.exports = Hospital;
