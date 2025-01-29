const Contact = require("../../model/contactModel");

const createContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.json({ success: false, message: "Empty Fields !!" });
    }

    const newContact = new Contact({
      name: name,
      email: email,
      subject: subject,
      message: message,
    });
    await newContact.save();

    res.status(201).json({
      success: true,
      message: "Message Sent successfully",
      contact: newContact,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const fetchALLcontacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json({ success: true, contacts });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
module.exports = { createContact, fetchALLcontacts };
