const contactController = require("../controllers/contactController")
const router = require('express').Router();
const { authGuardAdmin } = require('../middleware/authGuard');

//create contact api
router.post('/sendMessage', contactController.sendMessage)

//get all products API
router.get("/get_contact", contactController.getAllContacts)


//Get single product API | /get_product/:id
router.get("/get_single_contact/:id" , contactController.getSingleContact)


//delete product API
router.delete("/delete_contact/:id", contactController.deleteContact)

//get pagination
router.get("/get_contact_pagination" , contactController.getContactPagination)

//search
router.get("/search/:key" , contactController.searchContacts)

//usercount
router.get('/contacts/count', contactController.getContactCount);

// exporting
module.exports = router;