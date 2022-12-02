const User = require("../model/User")
const argon2 = require("argon2")
const jwt = require("jsonwebtoken")
const fs = require('fs'); 
const privateKey = fs.readFileSync(process.env.NODE_ACCESS_KEY_SECRET)

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
        // Generate authentication & refresh JWT
        const authToken = jwt.sign(
            {
                id: user._id,
                username: user.username,
                type: "auth"
            }, 
            privateKey, 
            {
                algorithm: 'ES256', 
                expiresIn: "30m"
            }
        )
        const refreshToken = jwt.sign(
            {
                id: user._id,
                username: user.username,
                type: "refresh"
            }, 
            privateKey, 
            {
                algorithm: 'ES256',
                expiresIn: "1y"
            }
        )
        // Store refresh token in database & return tokens
        await User.updateOne({_id: user._id}, {refreshToken: refreshToken}).exec()
        // Send refresh token as cookie
        res.cookie("jwt", refreshToken, { httpOnly: true, maxAge: 12 * 31 * 24 * 60 * 60 * 1000})
        return res.status(200).json({message: "Login successful", authToken: authToken})
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