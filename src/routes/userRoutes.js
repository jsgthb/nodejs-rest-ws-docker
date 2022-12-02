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

module.exports = router