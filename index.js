const express = require('express')
const app = express()
const mongoose = require("mongoose")
const db = require("./config/db")
const port = process.env.NODE_PORT || 8080

// Connect to database
db.connect()

app.get('/', (req, res) => {
    res.send("Hello World!")
})

// Wait for database connection
mongoose.connection.once("open", () => {
    console.log("Connected to database")
    // Start express server
    app.listen(port, () => {
        console.log(`API server listening on port ${port}`)
    })
})