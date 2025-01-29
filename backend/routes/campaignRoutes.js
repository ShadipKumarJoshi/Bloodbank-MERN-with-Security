const router = require("express").Router();

const campaignController = require("../controller/bb_controller/campaignController");
const { authGuard, authGuardAdmin, authGuardBloodBank } = require("../middleware/authGuard");


router.post("/add_campaign", authGuardBloodBank , campaignController.addCampaign);

router.get("/get_all_campaign", campaignController.viewAllCampaigns);

router.delete("/delete_campaign/:id", authGuardBloodBank , campaignController.deleteCampaign);

router.get("/single_campaign/:id", campaignController.getSingleCampaign);

router.get("/campaign_by_bb/:id", campaignController.getCampaignByBB);

router.put("/update_campaign/:id", authGuardBloodBank , campaignController.updateCampaigns);

module.exports = router;
