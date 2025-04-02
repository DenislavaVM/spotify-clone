import mongoose from "mongoose";
import { Song } from "../models/song.model.js";
import { config } from "dotenv";

config();

const songs = [
    { "title": "Neon Pulse", "artist": "Cyberwave", "imageUrl": "/cover-images/1.jpg", "audioUrl": "/songs/1.mp3", "duration": 45 },
    { "title": "Bass Horizon", "artist": "Synth Runners", "imageUrl": "/cover-images/2.jpg", "audioUrl": "/songs/2.mp3", "duration": 48 },
    { "title": "Echo Drift", "artist": "Void Frequencies", "imageUrl": "/cover-images/3.jpg", "audioUrl": "/songs/3.mp3", "duration": 50 },
    { "title": "Midnight Circuit", "artist": "Electro Surge", "imageUrl": "/cover-images/4.jpg", "audioUrl": "/songs/4.mp3", "duration": 46 },
    { "title": "Wired Dreams", "artist": "Future Pulse", "imageUrl": "/cover-images/5.jpg", "audioUrl": "/songs/5.mp3", "duration": 44 },
    { "title": "Techno Mirage", "artist": "Hyper Glow", "imageUrl": "/cover-images/6.jpg", "audioUrl": "/songs/6.mp3", "duration": 49 },
    { "title": "Synth Abyss", "artist": "Dark Resonance", "imageUrl": "/cover-images/7.jpg", "audioUrl": "/songs/7.mp3", "duration": 52 },
    { "title": "Voltage Groove", "artist": "Neon Drive", "imageUrl": "/cover-images/8.jpg", "audioUrl": "/songs/8.mp3", "duration": 47 },
    { "title": "Binary Flow", "artist": "Bass Algorithm", "imageUrl": "/cover-images/9.jpg", "audioUrl": "/songs/9.mp3", "duration": 51 },
    { "title": "Deep Space Beat", "artist": "Astro Sound", "imageUrl": "/cover-images/10.jpg", "audioUrl": "/songs/10.mp3", "duration": 53 },
    { "title": "Celestial Pulse", "artist": "Orbit Frequency", "imageUrl": "/cover-images/11.jpg", "audioUrl": "/songs/11.mp3", "duration": 49 },
    { "title": "Electric Shadows", "artist": "Digital Sphere", "imageUrl": "/cover-images/12.jpg", "audioUrl": "/songs/12.mp3", "duration": 45 },
    { "title": "Neon Odyssey", "artist": "Synth Explorer", "imageUrl": "/cover-images/13.jpg", "audioUrl": "/songs/13.mp3", "duration": 48 },
    { "title": "Bass Reverie", "artist": "Dream Beats", "imageUrl": "/cover-images/14.jpg", "audioUrl": "/songs/14.mp3", "duration": 50 },
    { "title": "Rhythm Nexus", "artist": "Cyber Groove", "imageUrl": "/cover-images/15.jpg", "audioUrl": "/songs/15.mp3", "duration": 44 },
    { "title": "Future Echo", "artist": "Sonar Pulse", "imageUrl": "/cover-images/16.jpg", "audioUrl": "/songs/16.mp3", "duration": 46 },
    { "title": "Stellar Bassline", "artist": "Void Beats", "imageUrl": "/cover-images/17.jpg", "audioUrl": "/songs/17.mp3", "duration": 47 },
    { "title": "Moonlit Whispers", "artist": "Serene Echo", "imageUrl": "/cover-images/18.jpg", "audioUrl": "/songs/18.mp3", "duration": 43 }
];


const seedSongs = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        await Song.deleteMany({});
        await Song.insertMany(songs);
        console.log("Songs seeded successfully!");
    } catch (error) {
        console.error("Error seeding songs:", error);
    } finally {
        mongoose.connection.close();
    }
};

seedSongs();