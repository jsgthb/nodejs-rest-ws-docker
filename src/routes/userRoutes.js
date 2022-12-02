// User routes
const express = require("express")
const router = express.Router()
const authController = require("../controllers/authController")
const usersController = require("../controllers/usersController")
const jwtHandler = require("../middleware/jwtHandler")

// Register route
router.post("/register", authController.userRegister)

// Login route
router.post("/login", authController.userLogin)

// Display usernames route
router.get("/", jwtHandler, usersController.displayUsernames)

// Display usernames route
router.post("/refresh", authController.refreshToken)

// Logout route
router.post("/logout", authController.logout)

module.exports = router