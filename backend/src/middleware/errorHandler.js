import logger from "../lib/logger.js";

export const errorHandler = (err, req, res, next) => {
    logger.error(err.stack || err.message);

    res.status(500).json({
        success: false,
        message: process.env.NODE_ENV === "production"
            ? "Something went wrong"
            : err.message,
    });
};