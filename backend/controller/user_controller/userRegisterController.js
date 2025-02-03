const RegisteredUsers = require("../../model/registeredUsersForCampaign");

const registerUser = async (req, res) => {
  const { campaigns, fullName, email, number, bloodGroup } = req.body;
  // console.log(req.body);

  if (!campaigns || !fullName || !email || !number || !bloodGroup) {
    return res.json({
      success: false,
      message: "Please Enter all fields",
    });
  }

  try {
    const registeredUser = new RegisteredUsers({
      campaigns: campaigns,
      fullName: fullName,
      email: email,
      number: number,
      bloodGroup: bloodGroup,
    });

    await registeredUser.save();

    return res.json({
      success: true,
      message: "Registered for campaign Successfull",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const registeredUsersbyCampaign = async (req, res) => {
  const campaignId = req.params.id;
  try {
    // console.log(campaignId);
    const registeredUsers = await RegisteredUsers.find({
      campaigns: campaignId,
    });
    // console.log(registeredUsers);
    if (!registeredUsers) {
      return res.status(404).json({
        success: false,
        message: "No registered users found",
      });
    }
    res.status(200).json({
      success: true,
      registeredUsers: registeredUsers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Cannot get Registered Users",
    });
  }
};

module.exports = {
  registerUser,
  registeredUsersbyCampaign,
};
