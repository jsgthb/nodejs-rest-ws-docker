// User routes
const express = require("express")
const router = express.Router()

// Register route
router.get("/register", function(req, res) {
    res.status(200).json({message: "TODO"})
})

// Login route
router.get("/login", function(req, res) { 
    res.status(200).json({message: "TODO"})
})

module.exports = router