const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { verifyToken, checkRole } = require("../helpers/jwt.hepers");

// Route to create a new user
router.post("/", verifyToken, checkRole(['admin', 'moderator']), userController.createUser);

// Route to get user details by ID
router.get("/:userId", userController.getUser);

// Route to update user details by ID
router.put("/:userId", userController.updateUser);

// Route to delete a user by ID
router.delete("/:userId", userController.deleteUser);

module.exports = router;
