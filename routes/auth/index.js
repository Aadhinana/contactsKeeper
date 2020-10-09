const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const secret = config.get("jwtSecret");

const { check, validationResult } = require("express-validator");
const User = require("../../models/user");

const authMiddleware = require("../../middleware/authMiddleware");

// GET /api/auth Will get the current logged in user
// protected route
router.get("/", authMiddleware, async (req, res) => {
  //   req.user will have the user id use that and get user from database wihtout the password
  try {
    const user = await User.findById(req.user).select("-password");
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Something went wrong in the server side" });
  }
});

// POST /api/auth Will act as login for a given user
router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Please enter password").exists(),
  ],
  async (req, res) => {
    // Check for any errors in the req body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password } = req.body;

      // Check if user email exists
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: "Email not registered" });
      }

      //   Check if the passwords match
      const isMatch = await bcryptjs.compare(password, user.password);

      // Wrong password
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      // Valid credentials - Sign token and send to user
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
