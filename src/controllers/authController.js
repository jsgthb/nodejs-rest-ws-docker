const User = require("../model/User")
const argon2 = require("argon2")
const jwt = require("jsonwebtoken")

exports.userLogin = async (req, res) => {
    // Check if request body is valid
    const { username, password } = req.body
    if (!username || !password) return res.status(400).json({message: "Username and password are required"})
    // Check if user exists
    const user = await User.findOne({username: username}).exec()
    if (!user) return res.status(404).json({message: "User does not exist"})
    // Compare hash & send response
    const validate = await argon2.verify(user.password, password);
    if (validate) {
        // Generate JWT
        const tokenSecret = process.env.NODE_ACCESS_TOKEN_SECRET
        const token = jwt.sign({username: user._id}, tokenSecret, {expiresIn: "1m"})
        return res.status(200).json({message: "Login successful", jwt: token})
    } else {
        return res.status(401).json({message: "Wrong username or password"})
    }
}

exports.userRegister = async (req, res) => {
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