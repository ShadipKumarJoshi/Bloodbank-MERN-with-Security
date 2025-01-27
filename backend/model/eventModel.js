const mongoose = require("mongoose");

// event Post Schema
const eventSchema = new mongoose.Schema({
  eventTitle: {
    type: String,
    required: true,
    trim: true,
  },
  eventContent: {
    type: String,
    required: true,
  },
  organizedBy: {
    type: String,
    required: true,
    trim: true,
  },
  eventDate: {
    type: Date,
  },
  eventImageOneUrl: {
    type: String,
    required: true,
    trim: true,
  },
  eventImageTwoUrl: {
    type: String,
    required: true,
    trim: true,
  },
  eventFileUrl: {
    type: String,
    required: true,
    trim: true,
  },
},{
  createdAt: 'createdAt',
});

// eventPost model based on the schema
const events = mongoose.model("events", eventSchema);

module.exports = events;
