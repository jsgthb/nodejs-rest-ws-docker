const User = require("../model/User")
const argon2 = require("argon2")

exports.handleNewUser = async (req, res) => {
    // Check if request body is valid
    const { username, password } = req.body
    if (!username || !password) return res.status(400).json({message: "Username and password are required"})
    // Check if user already exists
    const duplicate = await User.findOne({username: username}).exec()
    if (duplicate) return res.status(409).json({message: "User already exists"})
    // Create user
    try {
        // Hash password with argon2
        const passwordHash = await argon2.hash(password)
        // Store new user & send response
        const newUser = await User.create({username: username, password: passwordHash})
        res.status(201).json({message: "User successfully created"})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}