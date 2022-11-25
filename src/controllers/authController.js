const User = require("../model/User")
const argon2 = require("argon2")

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
        return res.status(200).json({message: "Login successful", jwt: "JWT placeholder"})
    } else {
        return res.status(401).json({message: "Wrong username or password"})
    }
}