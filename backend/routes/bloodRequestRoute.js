const router = require("express").Router();

const requestController = require("../controller/user_controller/addRequestController");
const { authGuard, authGuardAdmin, authGuardBloodBank } = require("../middleware/authGuard");


router.post("/add_request", authGuard, requestController.addRequests);

router.get("/all_requests", requestController.getAllRequest);

router.delete("/delete_request/:id", authGuard, requestController.deleteRequest);

router.get("/request/:id", requestController.getSingleRequest);

router.put("/update_request/:id", authGuard, requestController.updateRequest);

router.put("/update_show_request", authGuard, requestController.updateShowRequest);

module.exports = router;
