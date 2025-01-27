const mongoose = require("mongoose");

const petSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
    },
    number: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    petType: {
      type: String,
      required: true,
    },
    petAge: {
      type: String,
      required: false,
    },
    petGender: {
      type: String,
      required: false,
    },
    condition: {
      type: String,
      required: false,
    },
    purpose: {
      type: String,
      required: false,
    },

    description: {
      type: String,
      required: false,
    },
    petImageUrlOne: {
      type: String,
      required: false,
    },
    petImageUrlTwo: {
      type: String,
      required: false,
    },
    petImageUrlThree: {
      type: String,
      required: false,
    },
    petImageUrlFour: {
      type: String,
      required: false,
    },

    petImageUrlFive: {
      type: String,
      required: false,
    },

    petFileUrl: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      required: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: false,
    },
    vaccines: [
      {
        name: {
          type: String,
          required: true,
        },
        dateAdministered: {
          type: Date,
          required: false,
        },
        additionalInfo: {
          type: String,
          required: false,
        },
      },
    ],
    isVaccinated: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Pet = mongoose.model("pet", petSchema);

module.exports = Pet;