const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Warning: MongoDB Connection failed (${error.message}). Running in DB-less Simulation Mode.`);
        // Note: Removed process.exit(1) so the dev-mode local server stays alive!
    }
};

module.exports = connectDB;
