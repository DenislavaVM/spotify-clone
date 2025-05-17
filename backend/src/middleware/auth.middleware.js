import { clerkClient } from "@clerk/express";
import { AppError } from "../lib/customError.js";

export const protectRoute = async (req, res, next) => {
    if (!req.auth.userId) {
        return next(new AppError("Unauthorized - you must be logged in", 401));
    };

    next();
};

export const requireAdmin = async (req, res, next) => {
    try {
        const currentUser = await clerkClient.users.getUser(req.auth.userId);
        const isAdmin = process.env.ADMIN_EMAIL === currentUser.primaryEmailAddress?.emailAddress;

        if (!isAdmin) {
            return next(new AppError("Unauthorized - you must be an admin", 403));
        }
        next();
    } catch (error) {
        error.statusCode = 500;
        next(error)
    }
};