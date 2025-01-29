const router = require("express").Router();

const userController = require("../controller/user_controller/userControllers");
const { authGuard } = require("../middleware/authGuard");

// create account routes
router.post("/register", userController.createUser);

// login routes

router.post("/login", userController.loginUser);

router.post("/send_otp", userController.sendVerification);

router.put("/beadonor/:id", authGuard, userController.beAdonor);

router.get("/getAllUsers", userController.getAllUsers);

router.get("/single_user/:id", userController.getSingleUser);

router.put("/updateUser/:id", authGuard, userController.updateUser);

router.post("/forgetpassword", userController.forgetPassword);

router.post("/update-password", userController.updatePassword);

// for flutter
router.put(
  "/update_user/:id",
  authGuard,
  userController.updateUserWithoutImage
);

router.get("/search_user", userController.searchUsers);

router.get(
  "/get_my_request/:id",
  authGuard,
  userController.getRequestsByUserId
);

module.exports = router;
