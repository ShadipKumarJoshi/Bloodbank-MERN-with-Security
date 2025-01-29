const router = require("express").Router();

const hospitalController = require("../controller/admin_controller/hospitalController");
const { authGuard, authGuardAdmin, authGuardBloodBank } = require("../middleware/authGuard");


router.post("/addhospital", authGuardAdmin,hospitalController.addHospitals);

router.get("/getallhospitals", hospitalController.getAllHospitals);

router.delete("/deletehospital/:id",authGuardAdmin, hospitalController.deleteHospital);

router.put("/updatehospital/:id",authGuardAdmin, hospitalController.updateHospital);

router.get("/single-hospital/:id",authGuardAdmin, hospitalController.getHospitalById);

module.exports = router;
