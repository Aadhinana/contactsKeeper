const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const secret = config.get("jwtSecret");

const { check, validationResult } = require("express-validator");

// Get the user model
const User = require("../../models/user");

// POST /api/users Registers the new user and returns a JWT for auth.
router.post(
  "/",
  [
    check("name", "Please Enter Name").not().isEmpty(),
    check("email", "Please Enter Email").isEmail(),
    check(
      "password",
      "Please enter a password of length more than 5"
    ).isLength({ min: 5 }),
  ],
  async (req, res) => {
    // Check for any errors in the req body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Register the user and save
    const { email, name, password } = req.body;

    // Check if the emailID already exists
    try {
      let user = await User.findOne({ email: email });

      if (user) {
        return res
          .status(400)
          .json({ msg: "User with Email ID already exists" });
      }
      // Unique user. Register and save
      // hash the password before saving
      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(password, salt);

      user = new User({
        email: email,
        name: name,
        password: hashedPassword,
      });

      await user.save();

      // Sign the userID with jwt and send it back for auth
      jwt.sign(
        { id: user._id },
        secret,
        { expiresIn: 3600 },
        (error, token) => {
          if (error) {
            return res
              .status(500)
              .json({ message: "Something went wrong in the server side" });
          }
          return res.status(200).json({ token: token });
        }
      );
    } catch (err) {
      console.log(err.message);
      return res
        .status(500)
        .json({ message: "Something went wrong in the server side" });
    }
  }
);

module.exports = router;
