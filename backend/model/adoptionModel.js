const mongoose = require("mongoose");

const adoptSchema = new mongoose.Schema(
  {
    ownedPetBefore: {
      type: Boolean,
      required: true,
      default: false,
    },
    haveAPet: {
      type: Boolean,
      required: true,
      default: false,
    },
    houseApartment: {
      type: String,
      required: false,
    },
    ownRent: {
      type: String,
      required: false,
    },
    permissionPet: {
      type: Boolean,
      required: true,
      default: false,
    },
    peopleInHouse: {
      type: String,
      required: false,
    },
    hoursPetAlone: {
      type: String,
      required: false,
    },
    travelFrequency: {
      type: String,
      required: false,
    },
    petCareArrangement: {
      type: String,
      required: true,
    },
    reasonForAdoption: {
      type: String,
      required: false,
    },
    isAccepted: {
      type: Boolean,
      required: false,
      default: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: false,
    },
    pet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "pet",
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Adopt = mongoose.model("adopt", adoptSchema);

module.exports = Adopt;
