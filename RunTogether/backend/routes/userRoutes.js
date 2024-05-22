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

router.post("/", createUser);

router.get("/:userId", getUserByID)

router.get("/email/:userEmail", getUserByEmail)

router.post("/login", login);

router.put("/:userId", updateUserProfile);

router.delete("/:email", deleteUser);

module.exports = router;
