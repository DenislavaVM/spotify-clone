import express from "express";
import dotenv from "dotenv";
import { clerkMiddleware } from "@clerk/express";
import fileupload from "express-fileupload";
import { fileURLToPath } from "url";
import path from "path";
import cors from "cors";
import fs from "fs";
import cron from "node-cron";

import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import adminRoutes from "./routes/admin.route.js";
import songRoutes from "./routes/song.route.js";
import albumRoutes from "./routes/album.route.js";
import statRoutes from "./routes/stat.route.js";
import { connectDB } from "./lib/db.js";
import { createServer } from "http";
import { initializeSocket } from "./lib/socket.js";

import { errorHandler } from "./middleware/errorHandler.js";
import logger from "./lib/logger.js";

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT;

const httpServer = createServer(app);
initializeSocket(httpServer);

const ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "https://spotify-clone-2j8a.onrender.com",
];
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || ALLOWED_ORIGINS.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(clerkMiddleware());
app.use(fileupload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "tmp"),
    createParentPath: true,
    limits: {
        fileSize: 10 * 1024 * 1024,
    },
}));

const tempDir = path.join(process.cwd(), "tmp");
cron.schedule("0 * * * *", () => {
    if (fs.existsSync(tempDir)) {
        fs.readdir(tempDir, (err, files) => {
            if (err) {
                console.error("Error reading temp directory:", err);
                return;
            }

            let deleted = 0;

            for (const file of files) {
                try {
                    fs.unlinkSync(path.join(tempDir, file));
                    deleted++;
                } catch (err) {
                    console.error("Error deleting file:", file, err);
                }
            }

            logger.info(`[CLEANUP] Deleted ${deleted} temp file(s) at ${new Date().toISOString()}`);
        });
    }
});

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/stats", statRoutes);

app.use(errorHandler);

app.get("/", (req, res) => {
    res.send("Spotify Clone API is running.");
});

httpServer.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
    connectDB().catch((err) => {
        logger.error("MongoDB connection error", err);
        process.exit(1);
    });
});