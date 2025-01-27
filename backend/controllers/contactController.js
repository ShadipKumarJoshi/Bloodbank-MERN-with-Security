const Contacts = require("../model/contactModel");
const { sendEmailController } = require("./sendEmailController");
const { body, validationResult } = require('express-validator');
const xss = require('xss');



const sendMessage = async (req, res) => {
  info('Send Message request received', { requestBody: req.body });

  const { contactName, contactEmail, contactMessage } = req.body;


  await body('contactName').trim().escape().notEmpty().run(req);
  await body('contactEmail').isEmail().normalizeEmail().run(req);
  await body('contactMessage').trim().escape().notEmpty().run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array(),
    });
  }

  try {

    const sanitizedContactName = xss(contactName);
    const sanitizedContactEmail = xss(contactEmail);
    const sanitizedContactMessage = xss(contactMessage);

    const sendEmail = await sendEmailController(
      sanitizedContactEmail,
      "Contact Us",
      "Thank You for Reaching To us!!"
    );

    if (sendEmail) {
      const newContact = await Contacts.create({
        contactName: sanitizedContactName,
        contactEmail: sanitizedContactEmail,
        contactMessage: sanitizedContactMessage,
      }).catch((error) => {
        error('Error in saving contact', { error: error.message });
        return res.status(500).json({
          success: false,
          message: "An error occurred while saving the contact",
        });
      });

      return res.json({
        success: true,
        message: "Message sent successfully",
      });
    }
  } catch (error) {
    error('Error in sending email', { error: error.message });
    return res.status(500).json({
      success: false,
      message: "An error occurred while sending the email",
    });
  }
};

const searchContacts = async (req, res) => {
  try {
    const data = await Contacts.find({
      $or: [
        { contactEmail: { $regex: new RegExp(xss(req.params.key), "i") } },
        { contactMessage: { $regex: new RegExp(xss(req.params.key), "i") } },
        { contactName: { $regex: new RegExp(xss(req.params.key), "i") } },
      ],
    });
    res.send(data);
  } catch (error) {
    error('Error in searchContacts', { error: error.message });
    res.status(500).send({ error: "Internal Server Error" });
  }
};


const getContactPagination = async (req, res) => {
  const requestedPage = parseInt(req.query.page, 10) || 1;
  const resultPerPage = 8;

  try {
    const contacts = await Contacts.find({})
      .skip((requestedPage - 1) * resultPerPage)
      .limit(resultPerPage);

    const totalContactsCount = await Contacts.countDocuments();

    if (contacts.length === 0) {
      return res.json({
        success: false,
        message: "No Contact found",
      });
    }

    res.json({
      success: true,
      contacts: contacts,
      totalPages: Math.ceil(totalContactsCount / resultPerPage),
    });
  } catch (error) {
    error('Error in getContactPagination', { error: error.message });
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


const getAllContacts = async (req, res) => {
  try {
    const listOfContacts = await Contacts.find();
    res.json({
      success: true,
      message: "Contacts Fetched Successfully",
      contacts: listOfContacts,
    });
  } catch (error) {
    error('Error in getAllContacts', { error: error.message });
    res.status(500).json("Server Error");
  }
};


const getSingleContact = async (req, res) => {
  const id = xss(req.params.id);
  if (!id) {
    return res.status(400).json({
      message: "No record with given ID",
      success: false,
    });
  }
  try {
    const singleContact = await Contacts.findById(id);
    if (!singleContact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }
    res.json({
      success: true,
      message: "Contact Fetched",
      contact: singleContact,
    });
  } catch (error) {
    error('Error in getSingleContact', { error: error.message });
    res.status(500).json("Server Error");
  }
};


const deleteContact = async (req, res) => {
  try {
    const deleteContact = await Contacts.findByIdAndDelete(xss(req.params.id));
    if (!deleteContact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }
    res.json({
      success: true,
      message: "Contact deleted Successfully",
    });
  } catch (error) {
    error('Error in deleteContact', { error: error.message });
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


const getContactCount = async (req, res) => {
  try {
    const totalContactsCount = await Contacts.countDocuments();
    res.json({
      success: true,
      totalContactsCount: totalContactsCount,
    });
  } catch (error) {
    error('Error in getContactCount', { error: error.message });
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  sendMessage,
  getAllContacts,
  getSingleContact,
  deleteContact,
  getContactPagination,
  searchContacts,
  getContactCount,
};
