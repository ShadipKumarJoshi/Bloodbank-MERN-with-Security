const Events = require("../model/eventModel");
const cloudinary = require("cloudinary");
const winston = require('winston');


const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'application.log' })
    ]
});

const createEvent = async (req, res) => {
  logger.info('Create Event request received', { requestBody: req.body, files: req.files });

  const { eventTitle, eventContent, organizedBy, eventDate } = req.body;
  const { eventImageOneUrl, eventImageTwoUrl, eventFileUrl } = req.files;

  if (!eventTitle || !eventContent || !organizedBy || !eventDate) {
    return res.json({
      success: false,
      message: "Please fill all the fields.",
    });
  }

  try {
    const uploadedImageOne = await cloudinary.v2.uploader.upload(
      eventImageOneUrl.path,
      {
        folder: "events",
        crop: "scale",
      }
    );
    const uploadedImageTwo = await cloudinary.v2.uploader.upload(
      eventImageTwoUrl.path,
      {
        folder: "events",
        crop: "scale",
      }
    );

    const uploadEventFileUrl = await cloudinary.v2.uploader.upload(
      eventFileUrl.path,
      {
        folder: "events",
        crop: "scale",
      }
    );

    const newEvent = new Events({
      eventTitle: eventTitle,
      eventContent: eventContent,
      organizedBy: organizedBy,
      eventImageOneUrl: uploadedImageOne.secure_url,
      eventImageTwoUrl: uploadedImageTwo.secure_url,
      eventFileUrl: uploadEventFileUrl.secure_url,
      eventDate: eventDate,
    });

    await newEvent.save();
    res.status(201).json({
      success: true,
      message: "Event created successfully",
      data: newEvent,
    });
  } catch (err) {
    logger.error('Error in createEvent', { error: err.message });
    res.status(400).json({ message: err.message });
  }
};

const getAllEvents = async (req, res) => {
  try {
    const listOfEvents = await Events.find();
    res.json({
      success: true,
      message: "Events fetched successfully",
      events: listOfEvents,
    });
  } catch (error) {
    logger.error('Error in getAllEvents', { error: error.message });
    res.status(500).json("Server Error");
  }
};

const getSingleEvent = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.json({
      message: "No record with given id:",
      success: false,
    });
  }
  try {
    const singleEvent = await Events.findById(id);
    res.json({
      success: true,
      message: "Event Fetched",
      event: singleEvent,
    });
  } catch (error) {
    logger.error('Error in getSingleEvent', { error: error.message });
    res.status(500).json("Server Error");
  }
};

const updateEvent = async (req, res) => {
  logger.info('Update Event request received', { requestBody: req.body, files: req.files });

  const { eventTitle, eventContent, organizedBy, eventDate } = req.body;
  const { eventImageOneUrl, eventImageTwoUrl, eventFileUrl } = req.files;

  const id = req.params.id;

  if (!eventTitle || !eventContent || !organizedBy || !eventDate) {
    res.json({
      success: false,
      message: "Please fill all fields",
    });
  }
  try {
    let updatedEvent = {};

    if (eventImageOneUrl) {
      const uploadedImageOne = await cloudinary.v2.uploader.upload(
        eventImageOneUrl.path,
        {
          folder: "events",
          crop: "scale",
        }
      );
      updatedEvent.eventImageOneUrl = uploadedImageOne.secure_url;
    }
    if (eventImageTwoUrl) {
      const uploadedImageTwo = await cloudinary.v2.uploader.upload(
        eventImageTwoUrl.path,
        {
          folder: "events",
          crop: "scale",
        }
      );
      updatedEvent.eventImageTwoUrl = uploadedImageTwo.secure_url;
    }
    if (eventFileUrl) {
      const uploadEventFileUrl = await cloudinary.v2.uploader.upload(
        eventFileUrl.path,
        {
          folder: "events",
          crop: "scale",
        }
      );
      updatedEvent.eventFileUrl = uploadEventFileUrl.secure_url;
    }

    updatedEvent = {
      ...updatedEvent,
      eventTitle,
      eventContent,
      organizedBy,
      eventDate,
    };

    await Events.findByIdAndUpdate(id, updatedEvent);

    res.json({
      success: true,
      message: "Updated Successfully",
      event: updatedEvent,
    });
  } catch (error) {
    logger.error('Error in updateEvent', { error: error.message });
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const searchEvents = async (req, res) => {
  try {
    const data = await Events.find({
      $or: [
        { eventTitle: { $regex: new RegExp(req.params.key, "i") } },
        { organizedBy: { $regex: new RegExp(req.params.key, "i") } },
        { eventCategory: { $regex: new RegExp(req.params.key, "i") } },
        { eventContent: { $regex: new RegExp(req.params.key, "i") } },
      ],
    });
    res.send(data);
  } catch (error) {
    logger.error('Error in searchEvents', { error: error.message });
    res.status(500).send({ error: "Internal Server Error" });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const deletedEvent = await Events.findByIdAndDelete(req.params.id);
    if (!deletedEvent) {
      return res.json({
        success: false,
        message: "Event post not found",
      });
    }
    res.json({
      success: true,
      message: "Event post deleted",
    });
  } catch (err) {
    logger.error('Error in deleteEvent', { error: err.message });
    res.status(500).json({
      success: false,
      message: "server error",
    });
  }
};

const getEventPagination = async (req, res) => {
  const requestedPage = req.query.page;
  const resultPerPage = 7;

  try {
    const events = await Events.find({})
      .skip((requestedPage - 1) * resultPerPage)
      .limit(resultPerPage);

    const totalEventsCount = await Events.countDocuments();

    if (events.length === 0) {
      return res.json({
        success: false,
        message: "No Event found",
      });
    }

    res.json({
      success: true,
      events: events,
      totalPages: Math.ceil(totalEventsCount / resultPerPage),
    });
  } catch (error) {
    logger.error('Error in getEventPagination', { error: error.message });
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getUserEventPagination = async (req, res) => {
  const requestedPage = req.query.page;
  const resultPerPage = 4;

  try {
    const events = await Events.find({})
      .skip((requestedPage - 1) * resultPerPage)
      .limit(resultPerPage);

    const totalEventsCount = await Events.countDocuments();

    if (events.length === 0) {
      return res.json({
        success: false,
        message: "No Event found",
      });
    }

    res.json({
      success: true,
      events: events,
      totalPages: Math.ceil(totalEventsCount / resultPerPage),
    });
  } catch (error) {
    logger.error('Error in getUserEventPagination', { error: error.message });
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getEventCount = async (req, res) => {
  try {
    const totalEventsCount = await Events.countDocuments();
    res.json({
      success: true,
      totalEventsCount: totalEventsCount,
    });
  } catch (error) {
    logger.error('Error in getEventCount', { error: error.message });
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  createEvent,
  updateEvent,
  getAllEvents,
  getSingleEvent,
  deleteEvent,
  getEventPagination,
  getUserEventPagination,
  searchEvents,
  getEventCount,
};
