const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
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
    currentAddress: {
      type: String,
      required: true,
    },
    // municipality: {
    //   type: String,
    //   required: true,
    // },
    // wardNo: {
    //   type: Number,
    //   required: true,
    // },
    password: {
      type: String,
      required: true,
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },
    // optionals

    isAvailable: {
      type: Boolean,
      default: true,
    },

    isADonor: {
      type: Boolean,
      default: false,
    },
    gender: {
      type: String,
      required: false,
    },
    dob: {
      type: String,
      required: false,
    },
    bloodGroup: {
      type: String,
      required: false,
    },

    noPreviousDonation: {
      type: String,
      required: false,
    },

    emergencyNumber: {
      type: String,
      required: false,
    },

    userImageURL: {
      type: String,
      required: false,
      default:
        "https://res.cloudinary.com/dm7yesms2/image/upload/v1708584317/Users/cq2ndw5yfe3sh4eceleq",
    },
    isBloodBank: {
      type: Boolean,
      default: false,
    },
    bbName: {
      required: false,
      type: String,
    },

    bbAddress: {
      required: false,
      type: String,
    },

    bbContact: {
      required: false,
      type: Number,
    },

    operatingHours: {
      required: false,
      type: String,
    },
    serviceOffered: {
      required: false,
      type: String,
    },

    specialInstructions: {
      required: false,
      type: String,
    },

    additionalNotes: {
      required: false,
      type: String,
    },
    isNewUser: {
      type: Boolean,
      default: false,
    },
    availableBloodGroups: {
      required: false,
      type: [String],
    },

    socialMediaLinks: {
      required: false,
      type: String,
    },
    latitude: {
      required: false,
      type: Number,
    },
    longitude: {
      required: false,
      type: Number,
    },

    bbImageUrl: {
      type: String,
      required: false,
      trim: true, // cuts space and stores in the db
    },
    failedLoginAttempts: {
      type: Number,
      default: 0,
    },
    lastFailedAttempt: {
      type: Date,
    },
    isLocked: {
      type: Boolean,
      default: false,
    },
    lockUntil: {
      type: Date,
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
    isPasswordReset: {
      type: Boolean,
      default: false,
    },

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

const user = mongoose.model("user", userSchema);
module.exports = user;
