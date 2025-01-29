const Request = require("../../model/RequestBloodModel");

const addRequests = async (req, res) => {
  const {
    userId,
    patientName,
    patientAge,
    patientBloodType,
    components,
    phoneNumber,
    hospitalName,
    hospitalAddress,
    municipality,
    wardNo,
    quantity,
    urgency,
    reason,
    date,
    instruction,
    anyPrecautions,
    contactPerson,
    latitude,
    longitude,
  } = req.body;

  // console.log(req.body);

  if (
    !userId ||
    !patientName ||
    !patientBloodType ||
    !phoneNumber ||
    !hospitalName ||
    !hospitalAddress ||
    !municipality ||
    !wardNo ||
    !quantity ||
    !urgency ||
    !date ||
    !contactPerson ||
    !latitude ||
    !longitude
  ) {
    return res.json({
      success: false,
      message: "Please Enter all fields ",
    });
  }

  try {
    const newRequest = new Request({
      patientName: patientName,
      patientAge: patientAge,
      patientBloodType: patientBloodType,
      components: components,
      phoneNumber: phoneNumber,
      hospitalName: hospitalName,
      hospitalAddress: hospitalAddress,
      municipality: municipality,
      wardNo: wardNo,
      quantity: quantity,
      urgency: urgency,
      reason: reason,
      date: date,
      instruction: instruction,
      anyPrecautions: anyPrecautions,
      contactPerson: contactPerson,
      userId: userId,
      latitude: latitude,
      longitude: longitude,
    });
    await newRequest.save();
    res.status(200).json({
      success: true,
      message: "Your Request has been added",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};

const getAllRequest = async (req, res) => {
  try {
    const requestList = await Request.find({showRequest : true}).sort({ createdAt: -1 }).populate("userId","fullName");
    const limitedRequestList = requestList.slice(0, 5);
    const categorizedData = {
      critical: [],
      urgent: [],
      normal: [],
    };

    requestList.forEach((request) => {
      switch (request.urgency) {
        case "Critical":
          if (categorizedData.critical.length < 5) {
            categorizedData.critical.push(request);
          }
          break;
        case "Urgent":
          if (categorizedData.urgent.length < 5) {
            categorizedData.urgent.push(request);
          }
          break;
        case "Normal":
          if (categorizedData.normal.length < 5) {
            categorizedData.normal.push(request);
          }
          break;
      }
    });

    res.status(200).json({
      success: true,
      categorizedData: categorizedData,
      requestList: requestList,
      requestLists: limitedRequestList,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error });
  }
};

const updateRequest = async (req, res) => {
  const {
    patientName,
    patientAge,
    patientBloodType,
    components,
    phoneNumber,
    hospitalName,
    hospitalAddress,
    municipality,
    wardNo,
    quantity,
    urgency,
    reason,
    date,
    instruction,
    anyPrecautions,
    contactPerson,
    latitude,
    longitude,
  } = req.body;

  const id = req.params.id;

  // validation
  if (
    !patientName ||
    !patientBloodType ||
    !phoneNumber ||
    !hospitalName ||
    !hospitalAddress ||
    !municipality ||
    !wardNo ||
    !quantity ||
    !urgency ||
    !date ||
    !contactPerson ||
    !latitude ||
    !longitude
  ) {
    return res.json({
      success: false,
      message: "Cannot be empty",
    });
  }

  try {
    const updatedRequest = {
      patientName: patientName,
      patientAge: patientAge,
      patientBloodType: patientBloodType,
      components: components,
      phoneNumber: phoneNumber,
      hospitalName: hospitalName,
      hospitalAddress: hospitalAddress,
      municipality: municipality,
      wardNo: wardNo,
      quantity: quantity,
      urgency: urgency,
      reason: reason,
      date: date,
      instruction: instruction,
      anyPrecautions: anyPrecautions,
      contactPerson: contactPerson,
      latitude: latitude,
      longitude: longitude,
    };
    await Request.findByIdAndUpdate(id, updatedRequest);
    res.json({
      success: true,
      message: "Request Updated Successfully",
      requestblood: updatedRequest,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const deleteRequest = async (req, res) => {
  try {
    const deletedRequest = await Request.findByIdAndDelete(req.params.id);
    if (!deletedRequest) {
      return res.json({
        success: false,
        message: "Request Not Found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Request Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
const getSingleRequest = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.json({
      success: false,
      message: "Invalid request ID",
    });
  }

  try {
    const singleRequest = await Request.findById(id).populate("userId");

    if (!singleRequest) {
      return res.status(404).json({
        success: false,
        message: "Request not found",
      });
    }

    const user = singleRequest.userId;

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found for the given request",
      });
    }

    res.status(200).json({
      success: true,
      message: "",
      requestblood: {
        ...singleRequest._doc,
        user: {
          userId: user._id,
          username: user.username,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const updateShowRequest = async (req, res) => {
  const { id, showRequest } = req.body;

  try {
    const updatedRequest = await Request.findByIdAndUpdate(
      id,
      { showRequest },
      { new: true }
    );

    if (!updatedRequest) {
      return res
        .status(404)
        .json({ success: false, message: "Request not found" });
    }

    return res.status(200).json({
      success: true,
      message: "showRequest updated successfully",
      data: updatedRequest,
    });
  } catch (error) {
    console.error("Error updating showRequest:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
module.exports = {
  addRequests,
  getAllRequest,
  updateRequest,
  deleteRequest,
  getSingleRequest,
  updateShowRequest,
};
