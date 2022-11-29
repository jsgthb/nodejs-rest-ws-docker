const express = require('express')
const app = express()
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const fs = require('fs'); 
const db = require("./src/config/db")
const userRoutes = require("./src/routes/userRoutes");
const errorHandler = require("./src/middleware/errorHandler");
const port = process.env.NODE_PORT || 8080

// Connect to database
db.connect()

// JSON middleware
app.use(express.json())
// Routes
app.use("/users", userRoutes);
// Redirect invalid endpoints
app.all("*", function(req, res) {res.status(404).json({message: "Endpoint not found"})})
// General error handler
app.use(errorHandler)

try {
    // Load privateKey
    const privateKey = fs.readFileSync(process.env.NODE_ACCESS_KEY_SECRET)
    // Check if jwt signature is working
    jwt.sign({}, privateKey, {algorithm: 'ES256'})
    // Wait for database connection
    mongoose.connection.once("open", () => {
        console.log("Connected to database")
        // Start express server
        app.listen(port, () => {
            console.log(`API server listening on port ${port}`)
        })
    })
} catch (error) {
    console.error(error)
}