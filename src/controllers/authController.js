require('dotenv').config()
const User = require("../services/userService")
const argon2 = require("argon2")
const jwt = require("jsonwebtoken")
const { publicKey, privateKey } = require("./../services/keyService")

exports.userLogin = async (req, res) => {
    // Check if request body is valid
    const { username, password } = req.body
    if (!username || !password) return res.status(400).json({message: "Username and password are required"})
    // Check if user exists
    const user = await User.searchByUsername(username)
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
        await User.updateRefreshToken(user._id, refreshToken)
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
    const duplicate = await User.searchByUsername(username)
    if (duplicate) return res.status(409).json({message: "User already exists"})
    // Create user
    try {
        // Hash password with argon2
        const passwordHash = await argon2.hash(password)
        // Store new user & send response
        const newUser = await User.createNew(username, passwordHash)
        res.status(201).json({message: "User successfully created"})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

exports.refreshToken = async (req, res) => {
    // Check if refresh token is set
    const cookies = req.cookies
    if (!cookies?.jwt) return res.status(401).json({message: "Refresh token required"})
    const refreshToken = cookies.jwt
    // Compare refresh token
    const user = await User.searchByRefreshToken(refreshToken)
    if (!user) return res.status(403).json({message: "Invalid refresh token"})
    // Verify JWT
    jwt.verify(
        refreshToken,
        publicKey,
        (err, decoded) => {
            if (err || user.id !== decoded.id || decoded.type !== "refresh") {
                return res.status(403).json({message: "Invalid refresh token"})
            } else {
                // Send new authentication token
                const authToken = jwt.sign(
                    {
                        id: decoded._id,
                        username: decoded.username,
                        type: "auth"
                    }, 
                    privateKey, 
                    {
                        algorithm: 'ES256', 
                        expiresIn: "30m"
                    }
                )
                return res.status(200).json({message: "Refresh successful", authToken: authToken})
            }
        }
    )
}

exports.logout = async (req, res) => {
    // Check if refresh token is set
    const cookies = req.cookies
    if (!cookies?.jwt) return res.status(204).json()
    const refreshToken = cookies.jwt
    // Check if user exists
    const user = await User.searchByRefreshToken(refreshToken)
    if (!user) {
        // Remove cookie if user doesn't exist
        res.clearCookie("jwt", refreshToken, { httpOnly: true, maxAge: 12 * 31 * 24 * 60 * 60 * 1000})
        return res.status(204).json()
    }
    // Delete refresh token in database and client
    await User.deleteRefreshToken(user._id)
    res.clearCookie("jwt", refreshToken, { httpOnly: true, maxAge: 12 * 31 * 24 * 60 * 60 * 1000})
    return res.status(204).json()
}