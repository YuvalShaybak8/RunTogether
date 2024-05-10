const express = require("express");
const {
  createUser,
  login,
  updateUserProfile,
  deleteUser,
  getUserByID,
  getUserByEmail
} = require("../controllers/userController.js");
const router = express.Router();

// Create a new user
router.post("/", createUser);

// Get user by ID
router.get("/:userId", getUserByID)

// Get user by Email
router.get("/email/:userEmail", getUserByEmail)

// Login
router.post("/login", login);

// Update user profile
router.put("/:userId", updateUserProfile);

// Delete user
router.delete("/:email", deleteUser);

//export apiClient aswell
module.exports = router;
