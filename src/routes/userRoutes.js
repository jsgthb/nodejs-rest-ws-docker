// User routes
const express = require("express")
const router = express.Router()
const registerController = require("../controllers/registerController")
const authController = require("../controllers/authController")

// Register route
router.get("/register", registerController.handleNewUser)

// Login route
router.get("/login", authController.userLogin)

module.exports = router