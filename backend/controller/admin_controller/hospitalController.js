const Hospital = require("../../model/hospitalModel.js");
const cloudinary = require("cloudinary");

const addHospitals = async (req, res) => {
  const {
    hospitalName,
    hospitalAddress,
    // municipality,
    // wardNo,
    hospitalContactNumber,
    // hospitalType,
    // hospitalServices,
    // latitude,
    // longitude,
  } = req.body;

  // Check if req.files and req.files.bbImage exist
  if (!req.files || !req.files.hospitalImage) {
    return res.json({
      success: false,
      message: "Please upload a valid image",
    });
  }
  const { hospitalImage } = req.files;

  // console.log(req.body);
  if (
    !hospitalName ||
    !hospitalAddress ||
    // !municipality ||
    // !wardNo ||
    !hospitalContactNumber
    //  ||
    // !hospitalType ||
    // !hospitalServices ||
    // !latitude ||
    // !longitude
  ) {
    return res.json({
      success: false,
      message: "Please Enter all fields ",
    });
  }

  try {
    const uploadedImage = await cloudinary.v2.uploader.upload(
      hospitalImage.path,
      {
        folder: "Hospitals",
        crop: "scale",
      }
    );

    const newHospital = new Hospital({
      hospitalName: hospitalName,
      hospitalAddress: hospitalAddress,
      hospitalContactNumber: hospitalContactNumber,
      // municipality: municipality,
      // wardNo: wardNo,
      // hospitalType: hospitalType,
      // hospitalServices: hospitalServices,
      // latitude: latitude,
      // longitude: longitude,
      hospitalImageUrl: uploadedImage.secure_url,
    });

    await newHospital.save();
    res.status(200).json({
      success: true,
      message: "Hospital has been added",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};

const getHospitalById = async (req, res) => {
  try {
    const id = req.params.id;
    const hospital = await Hospital.findById(id);

    if (!hospital) {
      return res.status(404).json({
        success: false,
        message: "Hospital not found",
      });
    }

    res.status(200).json({
      success: true,
      hospital: hospital,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllHospitals = async (req, res) => {
  try {
    const {
      addressSearch = "",
      bloodGroupsSearch = "",
      hospitalSearch = "",
    } = req.query;
    const sortBy = req.query.sortBy || "createdAt";
    const sortOrder = req.query.sortOrder === "desc" ? -1 : 1;

    // Reset search values if they are "All"
    const normalizedaddressSearch =
      addressSearch.toLowerCase() === "all" ? "" : addressSearch;
    const normalizedBloodGroupsSearch =
      bloodGroupsSearch.toLowerCase() === "all" ? "" : bloodGroupsSearch;
    const normalizedhospitalSearch =
      hospitalSearch.toLowerCase() === "all" ? "" : hospitalSearch;
    // console.log("Sorting Params:", sortBy, sortOrder);

    const query = {};

    if (normalizedaddressSearch) {
      query.hospitalAddress = {
        $regex: new RegExp(`^${normalizedaddressSearch}`, "i"),
      };
    }

    if (normalizedBloodGroupsSearch) {
      query.hospitalServices = {
        $regex: new RegExp(`${normalizedBloodGroupsSearch}`, "i"),
      };
    }

    if (normalizedhospitalSearch) {
      query.hospitalName = {
        $regex: new RegExp(`^${normalizedhospitalSearch}`, "i"),
      };
    }

    const hospitalLists = await Hospital.find(query).sort({
      [sortBy]: sortOrder,
    });

    const allHospitals = await Hospital.find();

    const fewHospitals = hospitalLists.slice(-5);

    res.status(200).json({
      success: true,
      hospital: hospitalLists,
      fewHospitals: fewHospitals,
      allHospitals : allHospitals,
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

const updateHospital = async (req, res) => {
  const {
    hospitalName,
    hospitalAddress,
    // municipality,
    // wardNo,
    hospitalContactNumber,
    // hospitalType,
    // hospitalServices,
    // latitude,
    // longitude,
  } = req.body;

  const { hospitalImage } = req.files;

  const id = req.params.id;

  // validation
  if (
    !hospitalName ||
    !hospitalAddress ||
    // !municipality ||
    // !wardNo ||
    !hospitalContactNumber 
    // ||
    // !hospitalType ||
    // !hospitalServices ||
    // !latitude ||
    // !longitude
  ) {
    return res.json({
      success: false,
      message: "Cannot be empty",
    });
  }

  try {
    if (hospitalImage) {
      const uploadedImage = await cloudinary.v2.uploader.upload(
        hospitalImage.path,
        {
          folder: "Hospitals",
          crop: "scale",
        }
      );

      const updatedHospital = {
        hospitalName: hospitalName,
        hospitalAddress: hospitalAddress,
        // municipality: municipality,
        // wardNo: wardNo,
        hospitalContactNumber: hospitalContactNumber,
        // hospitalType: hospitalType,
        // hospitalServices: hospitalServices,
        // latitude: latitude,
        // longitude: longitude,
        hospitalImageUrl: uploadedImage.secure_url,
      };
      await Hospital.findByIdAndUpdate(id, updatedHospital);
      res.json({
        success: true,
        message: "Hospital Updated Successfully",
        hospital: updatedHospital,
      });
    } else {
      const updatedHospital = {
        hospitalName: hospitalName,
        hospitalAddress: hospitalAddress,
        // municipality: municipality,
        // wardNo: wardNo,
        hospitalContactNumber: hospitalContactNumber,
        // hospitalType: hospitalType,
        // hospitalServices: hospitalServices,
        // latitude: latitude,
        // longitude: longitude,
      };
      await Hospital.findByIdAndUpdate(id, updatedHospital);
      res.json({
        success: true,
        message: "Hospital Updated Successfully Without Image",
        hospital: updatedHospital,
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

const deleteHospital = async (req, res) => {
  try {
    const deletedHospital = await Hospital.findByIdAndDelete(req.params.id);
    if (!deletedHospital) {
      return res.json({
        success: false,
        message: "Hospital Not Found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Hospital Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  addHospitals,
  getAllHospitals,
  updateHospital,
  deleteHospital,
  getHospitalById,
};
