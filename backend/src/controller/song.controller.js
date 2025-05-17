import { Song } from "../models/song.model.js";
import { getRandomSongs } from "../lib/songUtils.js";

export const getAllSongs = async (req, res, next) => {
    try {
        const songs = await Song.find().sort({ createdAt: -1 });
        res.status(200).json(songs);

    } catch (error) {
        next(error);
    }
};

export const getFeaturedSongs = async (req, res, next) => {
    try {
        const songs = await getRandomSongs(6);
        res.status(200).json(songs);

    } catch (error) {
        next(error);
    }
};

export const getMadeForYouSongs = async (req, res, next) => {
    try {
        const songs = await getRandomSongs(4);
        res.status(200).json(songs);

    } catch (error) {
        next(error);
    }
};

export const getTrendingSongs = async (req, res, next) => {
    try {
        const songs = await getRandomSongs(4);
        res.status(200).json(songs);

    } catch (error) {
        next(error);
    }
};