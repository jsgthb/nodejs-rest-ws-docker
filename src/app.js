const express = require('express')
const app = express()
const cookieParser = require("cookie-parser")
const userRoutes = require("./routes/userRoutes")
const errorHandler = require("./middleware/errorHandler")

// JSON middleware
app.use(express.json())
// Cookie parser middleware
app.use(cookieParser())
// Routes
app.use("/users", userRoutes);
// Redirect invalid endpoints
app.all("*", function(req, res) {res.status(404).json({message: "Endpoint not found"})})
// General error handler
app.use(errorHandler)

module.exports  = app