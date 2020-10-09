const express = require("express");
const router = express.Router();

const authMiddleware = require("../../middleware/authMiddleware");
const { check, validationResult } = require("express-validator");
const Contact = require("../../models/contact");

// GET / fetches all the users contacts
// Protected route
router.get("/", authMiddleware, async (req, res) => {
  // Since authenticated req.user will have the user id
  try {
    const contacts = await Contact.find({ user: req.user }).sort({ date: -1 });
    return res.status(200).json(contacts);
  } catch (err) {
    console.log(err.message);
    return res
      .status(500)
      .json({ message: "Something went wrong in the server side" });
  }
});

// POST / add a contact to the logged in user
// protected route
router.post(
  "/",
  [authMiddleware, [check("name", "Enter name for contact").not().isEmpty()]],
  async (req, res) => {
    // Check for any errors in the req body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, type } = req.body;

    // create a new contact from model
    try {
      const newContact = new Contact({
        name: name,
        email: email,
        phone: phone,
        type: type,
        user: req.user,
      });

      // save the contact to DB
      const contact = await newContact.save();

      return res.status(200).json({ contact });
    } catch (err) {
      console.log(err.message);
      return res
        .status(500)
        .json({ message: "Something went wrong in the server side" });
    }
  }
);

// PUT /:id udpates a given contact with contact id
// protected route
router.put("/:id", authMiddleware, async (req, res) => {
  // Check all the params in the req.body and create a new contact
  const { name, email, phone, type } = req.body;

  const updatedContact = {};

  if (name) updatedContact.name = name;
  if (email) updatedContact.email = email;
  if (phone) updatedContact.phone = phone;
  if (type) updatedContact.type = type;

  try {
    // try finding the contact
    let contact = await Contact.findById(req.params.id);

    // contact not found
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    // make sure user owns the contact
    if (contact.user.toString() !== req.user) {
      return res.status(401).json({ message: "Not Authorized" });
    }

    // udpate the contact info with the newly set values or create a new fields
    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: updatedContact },
      { new: true }
    );

    return res.status(200).json(contact);
  } catch (err) {
    console.log(err.message);
    return res
      .status(500)
      .json({ message: "Something went wrong in the server side" });
  }
});

// DELETE /:id deletes a contact with a given id
// protected route
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);
    // contact not found
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    // make sure user owns the contact
    if (contact.user.toString() !== req.user) {
      return res.status(401).json({ message: "Not Authorized" });
    }

    // remove the contact  from DB
    await Contact.findByIdAndRemove(req.params.id);

    return res.status(200).json({ message: "Contact Removed" });
  } catch (err) {
    console.log(err.message);
    return res
      .status(500)
      .json({ message: "Something went wrong in the server side" });
  }
});

module.exports = router;
