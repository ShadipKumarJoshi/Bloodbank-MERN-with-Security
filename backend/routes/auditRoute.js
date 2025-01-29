const auditController = require("../controller/auditController");
const router = require("express").Router();

const { authGuardAdmin } = require("../middleware/authGuard");

router.get("/get-all-logs", authGuardAdmin, auditController.getAllLogs);


module.exports = router;
