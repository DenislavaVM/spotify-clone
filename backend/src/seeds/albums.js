import mongoose from "mongoose";
import { Song } from "../models/song.model.js";
import { Album } from "../models/album.model.js";
import { config } from "dotenv";

config();

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        await Album.deleteMany({});
        await Song.deleteMany({});

        const createdSongs = await Song.insertMany([
            { title: "Neon Pulse", artist: "Cyberwave", imageUrl: "/cover-images/1.jpg", audioUrl: "/songs/1.mp3", plays: Math.floor(Math.random() * 5000), duration: 45 },
            { title: "Bass Horizon", artist: "Synth Runners", imageUrl: "/cover-images/2.jpg", audioUrl: "/songs/2.mp3", plays: Math.floor(Math.random() * 5000), duration: 48 },
            { title: "Echo Drift", artist: "Void Frequencies", imageUrl: "/cover-images/3.jpg", audioUrl: "/songs/3.mp3", plays: Math.floor(Math.random() * 5000), duration: 50 },
            { title: "Midnight Circuit", artist: "Electro Surge", imageUrl: "/cover-images/4.jpg", audioUrl: "/songs/4.mp3", plays: Math.floor(Math.random() * 5000), duration: 46 },
            { title: "Wired Dreams", artist: "Future Pulse", imageUrl: "/cover-images/5.jpg", audioUrl: "/songs/5.mp3", plays: Math.floor(Math.random() * 5000), duration: 44 },
            { title: "Moonlit Whispers", artist: "Serene Echo", imageUrl: "/cover-images/18.jpg", audioUrl: "/songs/18.mp3", plays: Math.floor(Math.random() * 5000), duration: 43 }
        ]);

        const albums = [
            {
                title: "Synth Odyssey",
                artist: "Various Artists",
                imageUrl: "/albums/1.jpg",
                releaseYear: 2025,
                songs: createdSongs.slice(0, 3).map(song => song._id),
            },
            {
                title: "Cyber Frequencies",
                artist: "Various Artists",
                imageUrl: "/albums/2.jpg",
                releaseYear: 2025,
                songs: createdSongs.slice(3, 6).map(song => song._id),
            }
        ];

        const createdAlbums = await Album.insertMany(albums);
        for (let i = 0; i < createdAlbums.length; i++) {
            const album = createdAlbums[i];
            const albumSongs = albums[i].songs;

            await Song.updateMany({ _id: { $in: albumSongs } }, { albumId: album._id });
        }

        console.log("Database seeded successfully!");
    } catch (error) {
        console.error("Error seeding database:", error);
    } finally {
        mongoose.connection.close();
    }
};

seedDatabase();