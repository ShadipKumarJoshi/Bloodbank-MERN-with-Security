const router = require('express').Router();
const eventController = require("../controllers/eventController");
const { authGuardAdmin } = require('../middleware/authGuard');

// Create Event API
router.post('/create_event', authGuardAdmin, eventController.createEvent)

//get all event API
router.get("/get_event", eventController.getAllEvents)


//Get single event API 
router.get("/get_event/:id" , eventController.getSingleEvent)

//update event API
router.put("/update_event/:id" ,authGuardAdmin,  eventController.updateEvent)


//delete delete API
router.delete("/delete_event/:id",authGuardAdmin,   eventController.deleteEvent)

//get pagination
router.get("/get_event_pagination" , eventController.getEventPagination)

//get pagination
router.get("/get_user_event_pagination" , eventController.getUserEventPagination)

//search
router.get("/search/:key" , eventController.searchEvents)

//search
router.get("/events/count" , eventController.getEventCount)

module.exports = router;