import dotenv from "dotenv";
dotenv.config();

import logger from "./logger.js";
import { Server } from "socket.io";
import { Message } from "../models/message.model.js";

export const initializeSocket = (server) => {
    const allowedOrigins = process.env.CORS_ALLOWED_ORIGINS?.split(",") || [];
    const io = new Server(server, {
        cors: {
            origin: allowedOrigins,
            credentials: true,
        },
    });

    const userSockets = new Map();
    const userActivities = new Map();

    io.on("connection", (socket) => {
        socket.on("user_connected", (userId) => {
            userSockets.set(userId, socket.id);
            userActivities.set(userId, "Idle");

            io.emit("user_connected", userId);
            socket.emit("users_online", Array.from(userSockets.keys()));
            io.emit("activities", Array.from(userActivities.entries()));
        });

        socket.on("update_activity", ({ userId, activity }) => {
            logger.info(`Activity updated: ${userId} - ${activity}`);
            userActivities.set(userId, activity);
            io.emit("activity_updated", { userId, activity });
        });

        socket.on("send_message", async (data) => {
            try {
                const { senderId, receiverId, content } = data;

                const message = await Message.create({
                    senderId,
                    receiverId,
                    content,
                });

                const receiverSocketId = userSockets.get(receiverId);
                if (receiverSocketId) {
                    io.to(receiverSocketId).emit("receive_message", message);
                }

                socket.emit("receive_message", message);
            } catch (error) {
                logger.error("Message error", error);
                socket.emit("message_error", error.message);
            }
        });

        socket.on("disconnect", () => {
            let disconnectedUserId;
            for (const [userId, socketId] of userSockets.entries()) {
                if (socketId === socket.id) {
                    disconnectedUserId = userId;
                    userSockets.delete(userId);
                    userActivities.delete(userId);
                    break;
                }
            }
            if (disconnectedUserId) {
                io.emit("user_disconnected", disconnectedUserId);
            }
        });
    });
};