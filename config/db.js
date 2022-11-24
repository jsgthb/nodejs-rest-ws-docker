const mongoose = require("mongoose");

exports.connect = async () => {
    const url = process.env.MONGODB_URL
    const port = process.env.MONGODB_PORT
    const db = process.env.MONGODB_DB
    const user = process.env.MONGODB_USER
    const pass = process.env.MONGODB_PASS
    try {
        await mongoose.connect(`mongodb://${url}:${port}/${db}`, {
            authSource: "admin",
            user: user,
            pass: pass,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    } catch (error) {
        console.error(error)
    }
}