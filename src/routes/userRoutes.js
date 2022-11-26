// User routes
const express = require("express")
const router = express.Router()
const authController = require("../controllers/authController")

// Register route
router.get("/register", authController.userRegister)

// Login route
router.get("/login", authController.userLogin)

module.exports = router