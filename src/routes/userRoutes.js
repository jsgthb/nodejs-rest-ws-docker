// User routes
const express = require("express")
const router = express.Router()
const authController = require("../controllers/authController")
const usersController = require("../controllers/usersController")

// Register route
router.get("/register", authController.userRegister)

// Login route
router.get("/login", authController.userLogin)

// Display usernames route
router.get("/", usersController.displayUsernames)

module.exports = router