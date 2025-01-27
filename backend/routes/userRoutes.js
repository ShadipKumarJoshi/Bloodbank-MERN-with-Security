// import
const router = require("express").Router();
const userController = require("../controllers/userController");
const { authGuardAdmin, authGuard } = require("../middleware/authGuard");

// creating user api
router.post("/create", userController.createUser);

// creating login api
router.post("/login", userController.loginUser);

//get all users API
router.get("/get_user", authGuardAdmin,  userController.getAllUsers);

//Get single user API | /get_product/:id
router.get("/get_single_user/:id", authGuard, userController.getSingleUsers);

//update user API
router.put("/update_user/:id", authGuard, userController.updateUser);

//get pagination
router.get("/get_user_pagination", userController.getUserPagination);

//update user API
router.delete("/delete_user/:id", authGuardAdmin, userController.deleteUser);
// exporting

//search
router.get("/search/:key", userController.searchUsers);

//forgot password
router.post("/forget_password", userController.forgetPassword);

//reset password
router.post("/reset_password/:token", userController.resetPassword);

//change password
router.put("/change_password/:id", userController.changePassword);

//usercount
router.get('/users/count', userController.getUserCount);

router.post('/send_otp', userController.sendOtp);

router.post('/verify_user', userController.verifyUser);



module.exports = router;
