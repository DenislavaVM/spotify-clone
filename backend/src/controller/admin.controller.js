import mongoose from "mongoose";
import cloudinary from "../lib/cloudinary.js";
import logger from "../lib/logger.js";
import { AppError } from "../lib/customError.js";
import Joi from "joi";
import { Album } from "../models/album.model.js";
import { Song } from "../models/song.model.js";

const songSchema = Joi.object({
    title: Joi.string().min(1).max(100).required(),
    artist: Joi.string().min(1).max(100).required(),
    albumId: Joi.string().allow(null, '').optional(),
    duration: Joi.number().min(1).required(),
});

const albumSchema = Joi.object({
    title: Joi.string().min(1).max(100).required(),
    artist: Joi.string().min(1).max(100).required(),
    releaseYear: Joi.number().min(1900).max(new Date().getFullYear()).required(),
});

export const checkAdmin = async (req, res, next) => {
    res.status(200).json({ admin: true });
};

const uploadToCloudinary = async (file) => {
    try {
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            resource_type: "auto",
        });
        return result.secure_url
    } catch (error) {
        logger.error("Error in uploadToCloudinary", error);
        throw new Error("Error uploading to cloudinary");
    }
};

export const createSong = async (req, res, next) => {
    try {
        const { error } = songSchema.validate(req.body);

        let albumId = req.body.albumId?.trim();
        if (albumId && !mongoose.Types.ObjectId.isValid(albumId)) {
            return res.status(400).json({ message: "Invalid album ID format" });
        };

        if (!req.files?.audioFile || !req.files?.imageFile) {
            return next(new AppError("Please upload both audio and image files.", 400));
        };

        const { audioFile, imageFile } = req.files;

        if (!audioFile.mimetype.startsWith("audio/")) {
            return res.status(400).json({ message: "Audio file must be of audio type." });
        };

        if (!imageFile.mimetype.startsWith("image/")) {
            return res.status(400).json({ message: "Image file must be of image type." });
        };

        const audioUrl = await uploadToCloudinary(audioFile);
        const imageUrl = await uploadToCloudinary(imageFile);

        const song = new Song({
            title: req.body.title,
            artist: req.body.artist,
            audioUrl,
            imageUrl,
            duration: req.body.duration,
            albumId: albumId || null,
        });

        await song.save();

        if (albumId) {
            await Album.findByIdAndUpdate(albumId, {
                $push: { songs: song },
            });
        };

        res.status(201).json(song);
    } catch (error) {
        logger.error("Error in createSong", error);
        next(error);
    }
};

export const deleteSong = async (req, res, next) => {
    try {
        const { id } = req.params;
        const song = await Song.findById(id);

        if (song.albumId) {
            await Album.findByIdAndUpdate(song.albumId, {
                $pull: { songs: song.id },
            });
        }

        await Song.findByIdAndDelete(id);
        res.status(200).json({ message: "Song deleted successfully" });
    } catch (error) {
        logger.error("Error in deleteSong", error);
        next(error);
    }
};

export const createAlbum = async (req, res, next) => {
    try {
        const { error } = albumSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        };

        if (!req.files?.imageFile) {
            return res.status(400).json({ message: "Image file is required." });
        }

        const imageFile = req.files.imageFile;

        if (!imageFile.mimetype.startsWith("image/")) {
            return res.status(400).json({ message: "Uploaded file must be an image." });
        }

        const imageUrl = await uploadToCloudinary(imageFile);
        const album = new Album({
            title: req.body.title,
            artist: req.body.artist,
            imageUrl,
            releaseYear: req.body.releaseYear,
        });

        await album.save();
        res.status(201).json(album);

    } catch (error) {
        logger.error("Error in createAlbum", error);
        next(error);
    }
};

export const deleteAlbum = async (req, res, next) => {
    try {
        const { id } = req.params;
        await Song.deleteMany({ albumId: id });
        await Album.findByIdAndDelete(id);
        res.status(200).json({ message: "Album deleted successfully" });

    } catch (error) {
        logger.error("Error in deleteAlbum", error);
        next(error);
    }
};