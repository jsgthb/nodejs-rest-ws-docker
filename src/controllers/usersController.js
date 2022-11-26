const User = require("../model/User")

exports.displayUsernames = async (req, res) => {
    const users = await User.find({}).select("username -_id")
    res.status(200).json(users)
}