const express = require('express')
const app = express()
const mongoose = require("mongoose")
const db = require("./src/config/db")
const userRoutes = require("./src/routes/userRoutes");
const port = process.env.NODE_PORT || 8080

// Connect to database
db.connect()

// Routes
app.use("/users", userRoutes);
// Redirect invalid endpoints
app.all("*", function(req, res) {res.status(404).json({message: "Endpoint not found"})})

// Wait for database connection
mongoose.connection.once("open", () => {
    console.log("Connected to database")
    // Start express server
    app.listen(port, () => {
        console.log(`API server listening on port ${port}`)
    })
})