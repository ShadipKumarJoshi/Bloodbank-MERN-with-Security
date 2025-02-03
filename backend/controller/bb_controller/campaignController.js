const Campaign = require("../../model/campaignModel");
const cloudinary = require("cloudinary");
const RegisteredUsers = require("../../model/registeredUsersForCampaign");

const addCampaign = async (req, res) => {
  // console.log(req.body);
  const {
    campaignName,
    campaignStartDate,
    campaignEndDate,
    campaignLocation,
    municipality,
    // wardNo,
    campaignGoal,
    campaignRaised,
    campaignDonors,
    campaignDonations,
    latitude,
    longitude,
    user,
  } = req.body;

  // console.log(req.body);
  if (!req.files || !req.files.campaignImage) {
    return res.json({
      success: false,
      message: "Please upload a valid image",
    });
  }
  const { campaignImage } = req.files;

  // console.log(req.body);
  if (
    !campaignName ||
    !campaignStartDate ||
    !campaignEndDate ||
    !campaignLocation ||
    !municipality ||
    // !wardNo ||
    !campaignGoal ||
    !user ||
    !latitude ||
    !longitude
  ) {
    return res.json({
      success: false,
      message: "Please Enter all fields ",
    });
  }

  try {
    const uploadedImage = await cloudinary.v2.uploader.upload(
      campaignImage.path,
      {
        folder: "Campaigns",
        crop: "scale",
      }
    );
    const newCampaign = new Campaign({
      campaignName: campaignName,
      campaignStartDate: campaignStartDate,
      campaignEndDate: campaignEndDate,
      campaignLocation: campaignLocation,
      municipality: municipality,
      // wardNo: wardNo,
      campaignGoal: campaignGoal,
      latitude: latitude,
      longitude: longitude,
      user: user,
      campaignRaised: campaignRaised ? campaignRaised : 0,
      campaignDonors: campaignDonors ? campaignDonors : 0,
      campaignDonations: campaignDonations ? campaignDonations : 0,
      campaignImageUrl: uploadedImage.secure_url,
    });

    await newCampaign.save();
    res.status(200).json({
      success: true,
      message: "Campaign has been added",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};

const viewAllCampaigns = async (req, res) => {
  try {
    const allCampaigns = await Campaign.find()
      .populate("user")
      .sort({ createdAt: -1 });
    const latestCampaings = await Campaign.find()
      .populate("user")
      .sort({ createdAt: -1 })
      .limit(3);
    res.status(200).json({
      success: true,
      allCampaigns: allCampaigns,
      latestCampaings: latestCampaings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Cannot get Campaigns",
    });
  }
};

const getCampaignByBB = async (req, res) => {
  const userId = req.params.id;
  try {
    const allCampaigns = await Campaign.find({ user: userId })
      .populate("user")
      .sort({ createdAt: -1 });
    // console.log("allCampaigns",allCampaigns);
    res.status(200).json({
      success: true,
      allCampaigns: allCampaigns,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Cannot Get Campaigns",
    });
  }
};

const deleteCampaign = async (req, res) => {
  const campaignId = req.params.id;
  try {
    const campaign = await Campaign.findById(campaignId);
    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: "Campaign not found",
      });
    }
    await Campaign.findByIdAndDelete(campaignId);
    res.status(200).json({
      success: true,
      message: "Campaign has been deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Cannot delete Campaign",
    });
  }
};

const getSingleCampaign = async (req, res) => {
  const campaignId = req.params.id;
  try {
    const campaign = await Campaign.findById(campaignId);
    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: "Campaign not found",
      });
    }
    res.status(200).json({
      success: true,
      campaign: campaign,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Cannot get Campaign",
    });
  }
};

const updateCampaigns = async (req, res) => {
  const {
    campaignName,
    campaignStartDate,
    campaignEndDate,
    campaignLocation,
    municipality,
    // wardNo,
    campaignGoal,
    campaignRaised,
    campaignDonors,
    campaignDonations,
    latitude,
    longitude,
  } = req.body;

  const campaignImage = req.files;
  const campaignId = req.params.id;

  if (!campaignId) {
    return res.json({
      success: false,
      message: "Campaign not found",
    });
  }

  if (
    !campaignName ||
    !campaignStartDate ||
    !campaignEndDate ||
    !campaignLocation ||
    !municipality ||
    // !wardNo ||
    !campaignGoal ||
    !latitude ||
    !longitude
  ) {
    return res.json({
      success: false,
      message: "Please Enter all fields ",
    });
  }

  try {
    if (campaignImage) {
      const uploadedImage = await cloudinary.v2.uploader.upload(
        campaignImage.path,
        {
          folder: "Campaigns",
          crop: "scale",
        }
      );
      const updatedCampaign = {
        campaignName: campaignName,
        campaignStartDate: campaignStartDate,
        campaignEndDate: campaignEndDate,
        campaignLocation: campaignLocation,
        municipality: municipality,
        // wardNo: wardNo,
        campaignGoal: campaignGoal,
        latitude: latitude,
        longitude: longitude,
        campaignRaised: campaignRaised ? campaignRaised : 0,
        campaignDonors: campaignDonors ? campaignDonors : 0,
        campaignDonations: campaignDonations ? campaignDonations : 0,
        campaignImageUrl: uploadedImage.secure_url,
      };

      await Campaign.findByIdAndUpdate(campaignId, updatedCampaign);
      res.status(200).json({
        success: true,
        message: "Campaign has been updated",
        campaign: updatedCampaign,
      });
    } else {
      const updatedCampaign = {
        campaignName: campaignName,
        campaignStartDate: campaignStartDate,
        campaignEndDate: campaignEndDate,
        campaignLocation: campaignLocation,
        municipality: municipality,
        // wardNo: wardNo,
        campaignGoal: campaignGoal,
        latitude: latitude,
        longitude: longitude,
        campaignRaised: campaignRaised ? campaignRaised : 0,
        campaignDonors: campaignDonors ? campaignDonors : 0,
        campaignDonations: campaignDonations ? campaignDonations : 0,
      };

      await Campaign.findByIdAndUpdate(campaignId, updatedCampaign);
      res.status(200).json({
        success: true,
        message: "Campaign has been updated",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};

module.exports = {
  addCampaign,
  viewAllCampaigns,
  getCampaignByBB,
  deleteCampaign,
  getSingleCampaign,
  updateCampaigns,
};
