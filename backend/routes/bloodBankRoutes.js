const router = require("express").Router();

const bloodBankController = require("../controller/admin_controller/bloodBankController");
const { authGuard, authGuardAdmin, authGuardBloodBank } = require("../middleware/authGuard");


router.post("/addbloodbank", bloodBankController.addBloodBanks);

router.delete("/deletebloodbank/:id", authGuardAdmin,bloodBankController.deleteBloodBank);

router.put("/updatebloodbank/:id", authGuardAdmin,bloodBankController.updateBloodBank);

router.get("/getallbloodbank", bloodBankController.getAllBloodBanks);

router.get("/single-bloodbank/:id",authGuardAdmin, bloodBankController.getBloodbankbyId);

// router.get("/send-info/:id", bloodBankController.sendEmailController);

module.exports = router;
