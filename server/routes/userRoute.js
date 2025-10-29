// routes/userRoute.js
const express = require("express");
const { check } = require("express-validator");
const {
  registerController,
  loginController,
  getMe,
} = require("../controllers/userController");
const { protect } = require("../middleware/auth");

const router = express.Router();

// @route   POST /api/v1/users/register
// @desc    Register a new user
// @access  Public
router.post(
  "/register",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  registerController
);

// @route   POST /api/v1/users/login
// @desc    Authenticate user & get token
// @access  Public
router.post(
  "/login",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  loginController
);

// @route   GET /api/v1/users/me
// @desc    Get current user
// @access  Private
router.get("/me", protect, getMe);

module.exports = router;