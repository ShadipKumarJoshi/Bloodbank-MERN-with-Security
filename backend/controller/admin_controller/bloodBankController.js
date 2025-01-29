const BloodBanks = require("../../model/bloodBankModel.js");
const cloudinary = require("cloudinary");
const User = require("../../model/userModel.js");
const bcrypt = require("bcrypt");
const { sendEmailController } = require("../sendEmailController");

const addBloodBanks = async (req, res) => {
  // console.log(req.body);
  const {
    bName,
    bAddress,
    bContact,
    // oHours,
    // bgavailable,
    // serviceOffered,
    // specialInstructions,
    // additionalNotes,
    // socialLinks,
    // latitude,
    // longitude,
    // municipality,
    // wardNo,
    contactEmail,
  } = req.body;

  // console.log(req.body)

  if (!req.files || !req.files.bbImage) {
    return res.json({
      success: false,
      message: "Please upload a valid image",
    });
  }

  const { bbImage } = req.files;

  // console.log(req.body);
  if (
    !bName ||
    !bAddress ||
    !bContact 
    // ||
    // !oHours ||
    // !bgavailable ||
    // !serviceOffered ||
    // !specialInstructions ||
    // !additionalNotes ||
    // !socialLinks ||
    // !municipality ||
    // !wardNo ||
    // !latitude ||
    // !longitude
  ) {
    return res.json({
      success: false,
      message: "Please Enter all fields",
    });
  }

  try {
    const uploadedImage = await cloudinary.v2.uploader.upload(bbImage.path, {
      folder: "BloodBanks",
      crop: "scale",
    });

    const newBloodBank = new BloodBanks({
      bbName: bName,
      bbAddress: bAddress,
      bbContact: bContact,
      // operatingHours: oHours,
      // serviceOffered: serviceOffered,
      // specialInstructions: specialInstructions,
      // municipality: municipality,
      // wardNo: wardNo,
      // additionalNotes: additionalNotes,
      // availableBloodGroups: bgavailable,
      // socialMediaLinks: socialLinks,
      // latitude: latitude,
      // longitude: longitude,
      contactEmail: contactEmail,
      bbImageUrl: uploadedImage.secure_url,
    });

    const { userImage } = bbImage;
    if (userImage) {
      // Validate image size
      if (userImage.size > 10485760) {
        return res.json({
          success: false,
          message: "Image size too large. Maximum is 10 MB.",
        });
      }
      if ((!fullName && !email, !number && !password && !currentAddress)) {
        return res.json({
          success: false,
          message: "Please fill all the details",
        });
      }

      const userExists = await User.findOne({ email: email });
      if (userExists) {
        return res.json({
          success: false,
          message: "User Already Exists",
        });
      }
    }

    const randomPassword = generateRandomPassword(8);
    const generateSalt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(randomPassword, generateSalt);
    // console.log(randomPassword);

    // Create User Account for BloodBank
    const defaultEmail = `${bName
      .replace(/\s+/g, "")
      .toLowerCase()}@bloodbank.com`;

    const uploadedBBImage = await cloudinary.v2.uploader.upload(bbImage.path, {
      folder: "Users",
      crop: "scale",
    });

    const newUser = new User({
      fullName: bName,
      currentAddress: bAddress,
      number: bContact,
      currentAddress: bAddress,
      userImageURL: uploadedBBImage.secure_url,
      email: defaultEmail,
      password: hashedPassword,
      isBloodBank: true,
      bloodBankId: newBloodBank._id,
      bbName: bName,
      bbAddress: bAddress,
      bbContact: bContact,
      // wardNo: wardNo,
      // municipality: municipality,
      // operatingHours: oHours,
      // serviceOffered: serviceOffered,
      // specialInstructions: specialInstructions,
      // additionalNotes: additionalNotes,
      // availableBloodGroups: bgavailable,
      // socialMediaLinks: socialLinks,
      // latitude: latitude,
      // longitude: longitude,
      contactEmail: contactEmail,
      isNewUser : true
    });

    await sendEmailController(
      contactEmail,
      "Bloodbank Account Details",
      `Your BloodBank email is: ${defaultEmail} and Password is: ${randomPassword}`
    ).then(async (success) => {
      if (success) {
        await newBloodBank.save();
        await newUser.save();
        res.status(200).json({
          success: true,
          message: "Bloodbank added Please check your email for login details",
        });
      } else {
        console.log("Failed to send email.");
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};
function generateRandomPassword(length) {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+{}[]|;:,.<>?";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
}

const getAllBloodBanks = async (req, res) => {
  try {
    const {
      bbAddressSearch = "",
      bloodGroupsSearch = "",
      bloodbankSearch = "",
    } = req.query;
    const sortBy = req.query.sortBy || "createdAt";
    const sortOrder = req.query.sortOrder === "desc" ? -1 : 1;

    // Reset search values to empty strings if they are "All"
    const normalizedBbAddressSearch =
      bbAddressSearch.toLowerCase() === "all" ? "" : bbAddressSearch;
    const normalizedBloodGroupsSearch =
      bloodGroupsSearch.toLowerCase() === "all" ? "" : bloodGroupsSearch;
    const normalizedBloodbankSearch =
      bloodbankSearch.toLowerCase() === "all" ? "" : bloodbankSearch;
    // console.log("Sorting Params:", sortBy, sortOrder);

    const query = {};

    if (normalizedBbAddressSearch) {
      query.bbAddress = {
        $regex: new RegExp(`^${normalizedBbAddressSearch}`, "i"),
      };
    }

    if (normalizedBloodGroupsSearch) {
      query.availableBloodGroups = {
        $regex: new RegExp(`${normalizedBloodGroupsSearch}`, "i"),
      };
    }

    if (normalizedBloodbankSearch) {
      query.bbName = {
        $regex: new RegExp(`^${normalizedBloodbankSearch}`, "i"),
      };
    }

    const bloodBankList = await User.find({
      $and: [query, { isBloodBank: true }],
    }).sort({
      [sortBy]: sortOrder,
    });

    const mobbank = await User.find({ isBloodBank: true });
    const fewBloodBanks = bloodBankList.slice(0, 5);

    // console.log("BloodBanks List:", bloodBankList);

    res.json({
      success: true,
      bloodBank: bloodBankList,
      bloodBanks: bloodBankList,
      fewBloodBanks: fewBloodBanks,
      mobbank: mobbank,
      bloodbanks: bloodBankList,
      message: "Fetched",
    });
  } catch (error) {
    res.json(error);
  }
};

const getBloodbankbyId = async (req, res) => {
  try {
    // console.log(req.params.id)
    const id = req.params.id;
    const bloodBanks = await User.findById(id);

    if (!bloodBanks) {
      return res.status(404).json({
        success: false,
        message: "BloodBank not found",
      });
    }

    res.status(200).json({
      success: true,
      bloodbank: bloodBanks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateBloodBank = async (req, res) => {
  const {
    bName,
    bAddress,
    bContact,
    // oHours,
    // bgavailable,
    // serviceOffered,
    // specialInstructions,
    // additionalNotes,
    // socialLinks,
    // latitude,
    // longitude,
  } = req.body;

  const { bbImage } = req.files;

  const id = req.params.id;

  // validation
  if (
    !bName ||
    !bAddress ||
    !bContact 
    // ||
    // !oHours ||
    // !bgavailable ||
    // !serviceOffered ||
    // !specialInstructions ||
    // !additionalNotes ||
    // !socialLinks ||
    // !latitude ||
    // !longitude
  ) {
    return res.json({
      success: false,
      message: "Cannot be empty",
    });
  }

  try {
    if (bbImage) {
      const uploadedImage = await cloudinary.v2.uploader.upload(bbImage.path, {
        folder: "BloodBanks",
        corp: "scale",
      });
      const updatedBloodBanks = {
        bName: bName,
        bAddress: bAddress,
        bContact: bContact,
        // oHours: oHours,
        // bgavailable: bgavailable,
        // serviceOffered: serviceOffered,
        // specialInstructions: specialInstructions,
        // additionalNotes: additionalNotes,
        // socialLinks: socialLinks,
        // latitude: latitude,
        // longitude: longitude,
        bbImageUrl: uploadedImage.secure_url,
      };
      await BloodBanks.findByIdAndUpdate(id, updatedBloodBanks);
      res.status(200).json({
        success: true,
        message: "BloodBanks Updated Successfully With Image",
        bloodbanks: updatedBloodBanks,
      });
    } else {
      const updatedBloodBanks = {
        bName: bName,
        bAddress: bAddress,
        bContact: bContact,
        // oHours: oHours,
        // bgavailable: bgavailable,
        // serviceOffered: serviceOffered,
        // specialInstructions: specialInstructions,
        // additionalNotes: additionalNotes,
        // socialLinks: socialLinks,
        // latitude: latitude,
        // longitude: longitude,
      };
      await BloodBanks.findByIdAndUpdate(id, updatedBloodBanks);
      res.status(200).json({
        success: true,
        message: "BloodBanks Updated Successfully Without Image",
        bloodbanks: updatedBloodBanks,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// const sendEmailController = async (req, res) => {
//   try {
//     const reqBloodBank = await BloodBanks.findById(req.params.id);

//     if (!reqBloodBank) {
//       return res.json({
//         success: false,
//         message: "BloodBank Not Found",
//       });
//     }
//     console.log(reqBloodBank);
//     const defaultEmail = `${reqBloodBank.bbName
//       .replace(/\s+/g, "")
//       .toLowerCase()}@bloodbank.com`;

//     sendEmail(
//       `${reqBloodBank.contactEmail}`,
//       "Bloodbank email and Password",
//       `"Your BloodBank email is:  ${defaultEmail} and Password is: password123`
//     ).then((success) => {
//       if (success) {
//         console.log("Email sent successfully!");
//         reqBloodBank.isVerified = true;
//       } else {
//         console.log("Failed to send email.");
//       }
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       success: false,
//       message: "Server Error",
//     });
//   }
// };

const deleteBloodBank = async (req, res) => {
  try {
    const deletedBloodBank = await User.findByIdAndDelete(req.params.id);
    if (!deletedBloodBank) {
      return res.json({
        success: false,
        message: "BloodBank Not Found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "BloodBank Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const bloodBankPagination = async (req, res) => {
  const requestedPage = Number(req.query.page);

  const resultPerPage = 6;

  try {
    const bloodbanks = await BloodBanks.find({})
      .skip((requestedPage - 1) * resultPerPage)
      .limit(resultPerPage);

    if (bloodbanks.length === 0) {
      return res.json({
        success: false,
        message: "No Blood Banks Right Now",
      });
    }

    res.json({
      success: true,
      bloodbanks: bloodbanks,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// const searchBloodbanks = async (req, res, next) => {
//   try {
//     const { q } = req.query;
//     const bloodbanks = await Bb.find({
//       name: { $regex: q, $options: "i" },
//     });

//     if (bloodbanks.length < 1)
//       throw new ErrorHandler(404, "No BloodBanks found");

//     res.status(201).json({
//       status: "success",
//       message: "Found",
//       bloodbanks,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

module.exports = {
  getAllBloodBanks,
  addBloodBanks,
  updateBloodBank,
  deleteBloodBank,
  bloodBankPagination,
  // searchBloodbanks,
  getBloodbankbyId,
  // sendEmailController,
};
