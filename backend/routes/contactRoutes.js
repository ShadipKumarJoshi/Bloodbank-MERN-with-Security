const router = require("express").Router();

const contactController = require("../controller/user_controller/contactController");

router.post("/send-message", contactController.createContact);

router.get("/getallcontact", contactController.fetchALLcontacts);

module.exports = router;
