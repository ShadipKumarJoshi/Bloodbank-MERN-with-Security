const router = require('express').Router();
const registeredUsersController = require('../controller/user_controller/userRegisterController');
const { authGuard, authGuardAdmin, authGuardBloodBank } = require("../middleware/authGuard");


router.post('/register_for', authGuard, registeredUsersController.registerUser);

router.get('/registered_users/:id', authGuardBloodBank, registeredUsersController.registeredUsersbyCampaign);

module.exports = router;