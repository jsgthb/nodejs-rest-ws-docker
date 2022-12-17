require('dotenv').config()
const app = require("./src/app")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const fs = require('fs'); 
const db = require("./src/config/db")
const port = process.env.NODE_PORT || 8080

// Connect to database
db.connect()

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