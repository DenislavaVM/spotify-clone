import mongoose from "mongoose";
import { Song } from "../models/song.model.js";
import { config } from "dotenv";

config();

const songs = [
    {
        title: "Blinding Lights",
        artist: "The Weeknd",
        album: "After Hours",
        imageUrl: "/cover-images/1.jpg",
        audioUrl: "/songs/1.mp3",
        duration: 46
    },
    {
        title: "Shape of You",
        artist: "Ed Sheeran",
        album: "÷ (Divide)",
        imageUrl: "/cover-images/2.jpg",
        audioUrl: "/songs/2.mp3",
        duration: 41
    },
    {
        title: "Levitating",
        artist: "Dua Lipa",
        album: "Future Nostalgia",
        imageUrl: "/cover-images/3.jpg",
        audioUrl: "/songs/3.mp3",
        duration: 24
    },
    {
        title: "Uptown Funk",
        artist: "Mark Ronson ft. Bruno Mars",
        album: "Uptown Special",
        imageUrl: "/cover-images/4.jpg",
        audioUrl: "/songs/4.mp3",
        duration: 28
    },
    {
        title: "Stay",
        artist: "The Kid LAROI & Justin Bieber",
        album: "F*CK LOVE 3: OVER YOU",
        imageUrl: "/cover-images/5.jpg",
        audioUrl: "/songs/5.mp3",
        duration: 36
    },
    {
        title: "Bad Guy",
        artist: "Billie Eilish",
        album: "When We All Fall Asleep, Where Do We Go?",
        imageUrl: "/cover-images/6.jpg",
        audioUrl: "/songs/6.mp3",
        duration: 40
    },
    {
        title: "Dance Monkey",
        artist: "Tones and I",
        album: "The Kids Are Coming",
        imageUrl: "/cover-images/7.jpg",
        audioUrl: "/songs/7.mp3",
        duration: 42
    },
    {
        title: "Watermelon Sugar",
        artist: "Harry Styles",
        album: "Fine Line",
        imageUrl: "/cover-images/8.jpg",
        audioUrl: "/songs/8.mp3",
        duration: 28
    },
    {
        title: "Drivers License",
        artist: "Olivia Rodrigo",
        album: "SOUR",
        imageUrl: "/cover-images/9.jpg",
        audioUrl: "/songs/9.mp3",
        duration: 28
    },
    {
        title: "Havana",
        artist: "Camila Cabello ft. Young Thug",
        album: "Camila",
        imageUrl: "/cover-images/10.jpg",
        audioUrl: "/songs/10.mp3",
        duration: 30
    },
    {
        title: "Rockstar",
        artist: "Post Malone ft. 21 Savage",
        album: "Beerbongs & Bentleys",
        imageUrl: "/cover-images/11.jpg",
        audioUrl: "/songs/11.mp3",
        duration: 29
    },
    {
        title: "God's Plan",
        artist: "Drake",
        album: "Scorpion",
        imageUrl: "/cover-images/12.jpg",
        audioUrl: "/songs/12.mp3",
        duration: 17
    },
    {
        title: "Shallow",
        artist: "Lady Gaga & Bradley Cooper",
        album: "A Star Is Born Soundtrack",
        imageUrl: "/cover-images/13.jpg",
        audioUrl: "/songs/13.mp3",
        duration: 39
    },
    {
        title: "Someone You Loved",
        artist: "Lewis Capaldi",
        album: "Divinely Uninspired to a Hellish Extent",
        imageUrl: "/cover-images/14.jpg",
        audioUrl: "/songs/14.mp3",
        duration: 29
    },
    {
        title: "Sunflower",
        artist: "Post Malone & Swae Lee",
        album: "Spider-Man: Into the Spider-Verse Soundtrack",
        imageUrl: "/cover-images/15.jpg",
        audioUrl: "/songs/15.mp3",
        duration: 36
    },
    {
        title: "Perfect",
        artist: "Ed Sheeran",
        album: "÷ (Divide)",
        imageUrl: "/cover-images/16.jpg",
        audioUrl: "/songs/16.mp3",
        duration: 40
    },
    {
        title: "Circles",
        artist: "Post Malone",
        album: "Hollywood's Bleeding",
        imageUrl: "/cover-images/17.jpg",
        audioUrl: "/songs/17.mp3",
        duration: 39
    },
    {
        title: "Old Town Road",
        artist: "Lil Nas X ft. Billy Ray Cyrus",
        album: "7 EP",
        imageUrl: "/cover-images/18.jpg",
        audioUrl: "/songs/18.mp3",
        duration: 29
    }
];

const seedSongs = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        await Song.deleteMany({});
        await Song.insertMany(songs);
        logger.info("Songs seeded successfully!");
    } catch (error) {
        logger.error("Error seeding songs", error);
    } finally {
        mongoose.connection.close();
    }
};

seedSongs();