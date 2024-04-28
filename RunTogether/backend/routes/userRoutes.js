const express = require("express");
const {
  createUser,
  login,
  getUserByEmail,
  updateUserProfile,
  deleteUser,
} = require("../controllers/userController.js");

const router = express.Router();

// Create a new user
router.post("/", createUser);

// Get user by ID
router.post("/login", login);

// Update user profile
router.put("/:email", updateUserProfile);

// Delete user
router.delete("/:email", deleteUser);

//export apiClient aswell
module.exports = router;
