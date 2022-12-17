const User = require("../model/User")

exports.searchByUsername = async (username) => {
    return User.findOne({username: username}).exec()
}

exports.updateRefreshToken = async (id, refreshToken) => {
    return User.updateOne({_id: id}, {refreshToken: refreshToken}).exec()
}

exports.createNew = async (username, passwordHash) => {
    return User.create({username: username, password: passwordHash})
}

exports.searchByRefreshToken = async (refreshToken) => {
    return User.findOne({refreshToken: refreshToken}).exec()
}

exports.deleteRefreshToken = async (id) => {
    const user = await User.findOne({_id: id}).exec()
    user.refreshToken = null
    return user.save()
}