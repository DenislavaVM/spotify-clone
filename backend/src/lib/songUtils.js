import { Song } from "../models/song.model.js";

/**
 * Fetches a random list of songs with selected fields.
 * @param {number} count - Number of random songs to return
 * @returns {Promise<Array>} - List of songs
 */
export const getRandomSongs = async (count) => {
    return Song.aggregate([
        { $sample: { size: count } },
        {
            $project: {
                _id: 1,
                title: 1,
                artist: 1,
                imageUrl: 1,
                audioUrl: 1,
            },
        },
    ]);
};