const RequestForBB = require("../../model/requestForBBModel");

const addRequestsBB = async (req, res) => {
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
    bloodbank,
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
    !longitude ||
    !bloodbank
  ) {
    return res.json({
      success: false,
      message: "Please Enter all fields",
    });
  }

  try {
    const newRequest = new RequestForBB({
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
      bloodbank: bloodbank,
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

const getAllRequestBB = async (req, res) => {
  try {
    const requestList = await RequestForBB.find()
      .sort({ createdAt: -1 })
      .populate("userId");

    res.status(200).json({
      success: true,
      requestList: requestList,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error });
  }
};

const updateRequestBB = async (req, res) => {
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
    await RequestForBB.findByIdAndUpdate(id, updatedRequest);
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

const deleteRequestBB = async (req, res) => {
  try {
    const deletedRequest = await RequestForBB.findByIdAndDelete(req.params.id);
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

const getSingleRequestBB = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.json({
      success: false,
      message: "Invalid request ID",
    });
  }

  try {
    const singleRequest = await RequestForBB.findById(id).populate("userId");

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

const getRequestsofUser = async (req, res) => {
  const userId = req.params.id;

  if (!userId) {
    return res.json({
      success: false,
      message: "Invalid request ID",
    });
  }

  await RequestForBB.find({ userId: userId })
    .populate("bloodbank", "bbName")
    .then((requests) => {
      // console.log(requests);
      if (!requests) {
        return res.status(404).json({
          success: false,
          message: "Request not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "",
        userReq: requests,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    });
};

const updateStatus = async (req, res) => {
  const { id, isAccepted } = req.body;

  try {
    const updatedRequest = await RequestForBB.findByIdAndUpdate(
      id,
      { isAccepted: isAccepted },
      { new: true }
    );

    if (!updatedRequest) {
      return res
        .status(404)
        .json({ success: false, message: "Request not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Request updated successfully",
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
  addRequestsBB,
  getAllRequestBB,
  updateRequestBB,
  deleteRequestBB,
  getRequestsofUser,
  getSingleRequestBB,
  updateStatus,
};
