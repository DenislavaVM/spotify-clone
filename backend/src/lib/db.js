import mongoose from "mongoose";
import logger from "./logger.js";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        logger.info(`Connected to MongoDB ${conn.connection.host}`);
    } catch (error) {
        logger.error("Failed to connect to MongoDB", error);
        process.exit(1);
    }
};