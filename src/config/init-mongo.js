// Initialization script to create users collection in MongoDB
db.createCollection("users", { capped: false });