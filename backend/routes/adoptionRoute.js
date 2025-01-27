const router = require("express").Router();
const adoptionController = require("../controllers/AdoptController");
const { authGuard , authGuardAdmin } = require("../middleware/authGuard");

router.post("/adopt",authGuard, adoptionController.adoptAPet);

router.get("/get-my-adoption/:id",authGuard, adoptionController.getAllAdoptionsByUser);

router.get("/get-all-adoptions", adoptionController.getAllAdoptions);

router.delete("/delete-adoption/:id", authGuardAdmin, adoptionController.deleteRequest);


module.exports = router;
