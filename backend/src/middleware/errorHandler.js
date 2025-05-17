import logger from "../lib/logger.js";

export const errorHandler = (err, req, res, next) => {
    logger.error(err.stack || err.message);

    const statusCode = err.statusCode || 500;
    let message = err.message;

    if (process.env.NODE_ENV === "production" && statusCode === 500) {
        message = "Something went wrong. Please try again later.";
    };

    if (!message) {
        switch (statusCode) {
            case 400: message = "Bad Request"; break;
            case 401: message = "Unauthorized"; break;
            case 403: message = "Forbidden"; break;
            case 404: message = "Not Found"; break;
            case 500: message = "Internal Server Error"; break;
        };
    };

    res.status(statusCode).json({
        success: false,
        message,
    });
};