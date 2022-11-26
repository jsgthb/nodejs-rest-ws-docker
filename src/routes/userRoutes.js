// User routes
const express = require("express")
const router = express.Router()
const authController = require("../controllers/authController")
const usersController = require("../controllers/usersController")

// Register route
router.post("/register", authController.userRegister)

// Login route
router.post("/login", authController.userLogin)

// Display usernames route
router.get("/", usersController.displayUsernames)

module.exports = router