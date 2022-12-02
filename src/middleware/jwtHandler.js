const jwt = require("jsonwebtoken")
const fs = require('fs'); 
const publicKey = fs.readFileSync(process.env.NODE_ACCESS_KEY_PUBLIC)

const verifyToken = (req, res, next) => {
    // Check if request has bearer token
    const authHeader = req.headers["authorization"]
    if (!authHeader) return res.status(401).json({message: "Bearer token required"})
    const token = authHeader.split(" ")[1]
    // Check if token is valid
    jwt.verify(
        token,
        publicKey,
        (err, decoded) => {
            if (err) {
                console.log(err)
                return res.status(403).json({message: "Invalid authorization token"})
            } else {
                req.user = decoded.username
                next()
            }
        }
    )
}

module.exports = verifyToken