// User routes
const express = require("express")
const router = express.Router()
const registerController = require("../controllers/registerController")

// Register route
router.get("/register", registerController.handleNewUser)

// Login route
router.get("/login", function(req, res) { 
    res.status(200).json({message: "TODO"})
})

module.exports = router