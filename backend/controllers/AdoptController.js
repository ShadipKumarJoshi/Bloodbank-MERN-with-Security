const Adopt = require("../model/adoptionModel");


const adoptAPet = async (req, res) => {
  info('Adoption request received', { requestBody: req.body });
  try {
    const {
      isVerified,
      ownedPetBefore,
      haveAPet,
      houseApartment,
      ownRent,
      permissionPet,
      peopleInHouse,
      hoursPetAlone,
      travelFrequency,
      petCareArrangement,
      reasonForAdoption,
      user,
      pet,
    } = req.body;
    if (
      !ownedPetBefore ||
      !haveAPet ||
      !houseApartment ||
      !ownRent ||
      !permissionPet ||
      !peopleInHouse ||
      !hoursPetAlone ||
      !travelFrequency ||
      !petCareArrangement ||
      !reasonForAdoption ||
      !user ||
      !pet
    ) {
      return res.json({
        success: false,
        message: "Please fill all the fields",
      });
    }
    const adopt = new Adopt({
      isVerified,
      ownedPetBefore,
      haveAPet,
      houseApartment,
      ownRent,
      permissionPet,
      peopleInHouse,
      hoursPetAlone,
      travelFrequency,
      petCareArrangement,
      reasonForAdoption,
      user,
      pet,
    });
    await adopt.save();
    res
      .status(201)
      .json({ success: true, message: "Adoption request sent successfully" });
  } catch (error) {
    error('Error in adoptAPet', { error: error.message });
    res.status(500).json({ success: false, message: error.message });
  }
};

const getAllAdoptions = async (req, res) => {
  try {
    const adoptions = await Adopt.find().populate("user").populate("pet");
    info('Fetched all adoptions', { adoptions });
    res.status(200).json({ adoptions });
  } catch (error) {
    error('Error in getAllAdoptions', { error: error.message });
    res.status(500).json({ message: error.message });
  }
};

const getAllAdoptionsByUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const adoptions = await Adopt.find({ user: userId })
      .populate("user")
      .populate("pet");
    info('Fetched adoptions by user', { userId, adoptions });
    res.status(200).json({ adoptions });
  } catch (error) {
    error('Error in getAllAdoptionsByUser', { error: error.message });
    res.status(500).json({ success: false, message: error.message });
  }
};

const acceptRequest = async (req, res) => {
  const { id } = req.params;
  try {
    const adoption = await Adopt.findById(id);
    adoption.isAccepted = true;
    await adoption.save();
    info('Request accepted', { requestId: id });
    res.status(200).json({ message: "Request accepted successfully" });
  } catch (error) {
    error('Error in acceptRequest', { error: error.message });
    res.status(500).json({ message: error.message });
  }
};

const deleteRequest = async (req, res) => {
  const { id } = req.params;
  try {
    await Adopt.findByIdAndDelete(id);
    info('Request deleted', { requestId: id });
    res
      .status(200)
      .json({ success: true, message: "Request deleted successfully" });
  } catch (error) {
    error('Error in deleteRequest', { error: error.message });
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  adoptAPet,
  getAllAdoptions,
  getAllAdoptionsByUser,
  acceptRequest,
  deleteRequest,
};
