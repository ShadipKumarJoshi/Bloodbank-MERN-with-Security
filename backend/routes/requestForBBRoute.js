const router = require("express").Router();

const reqForBBController = require("../controller/bb_controller/reqForBBController");
const { authGuard } = require("../middleware/authGuard");

router.post("/add_request_bb", authGuard, reqForBBController.addRequestsBB);

router.get("/all_requests_bb", reqForBBController.getAllRequestBB);

router.delete("/delete_request_bb/:id", authGuard, reqForBBController.deleteRequestBB);

router.get("/request_bb/:id", authGuard, reqForBBController.getSingleRequestBB);

router.put("/update_request_bb/:id", authGuard, reqForBBController.updateRequestBB);

router.get("/get_user_request/:id", reqForBBController.getRequestsofUser);

router.put("/update_status", authGuard, reqForBBController.updateStatus);

module.exports = router;
