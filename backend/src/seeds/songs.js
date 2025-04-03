import mongoose from "mongoose";
import { Song } from "../models/song.model.js";
import { config } from "dotenv";

config();

const songs = [
    {
        title: "Blinding Lights",
        artist: "The Weeknd",
        imageUrl: "/cover-images/1.jpg",
        audioUrl: "/songs/1.mp3",
        duration: 46
    },
    {
        title: "Shape of You",
        artist: "Ed Sheeran",
        imageUrl: "/cover-images/2.jpg",
        audioUrl: "/songs/2.mp3",
        duration: 41
    },
    {
        title: "Levitating",
        artist: "Dua Lipa",
        imageUrl: "/cover-images/3.jpg",
        audioUrl: "/songs/3.mp3",
        duration: 24
    },
    {
        title: "Uptown Funk",
        artist: "Mark Ronson ft. Bruno Mars",
        imageUrl: "/cover-images/4.jpg",
        audioUrl: "/songs/4.mp3",
        duration: 28
    },
    {
        title: "Stay",
        artist: "The Kid LAROI & Justin Bieber",
        imageUrl: "/cover-images/5.jpg",
        audioUrl: "/songs/5.mp3",
        duration: 36
    },
    {
        title: "Bad Guy",
        artist: "Billie Eilish",
        imageUrl: "/cover-images/6.jpg",
        audioUrl: "/songs/6.mp3",
        duration: 40
    },
    {
        title: "Dance Monkey",
        artist: "Tones and I",
        imageUrl: "/cover-images/7.jpg",
        audioUrl: "/songs/7.mp3",
        duration: 42
    },
    {
        title: "Watermelon Sugar",
        artist: "Harry Styles",
        imageUrl: "/cover-images/8.jpg",
        audioUrl: "/songs/8.mp3",
        duration: 28
    },
    {
        title: "Drivers License",
        artist: "Olivia Rodrigo",
        imageUrl: "/cover-images/9.jpg",
        audioUrl: "/songs/9.mp3",
        duration: 28
    },
    {
        title: "Havana",
        artist: "Camila Cabello ft. Young Thug",
        imageUrl: "/cover-images/10.jpg",
        audioUrl: "/songs/10.mp3",
        duration: 30
    },
    {
        title: "Rockstar",
        artist: "Post Malone ft. 21 Savage",
        imageUrl: "/cover-images/11.jpg",
        audioUrl: "/songs/11.mp3",
        duration: 29
    },
    {
        title: "God's Plan",
        artist: "Drake",
        imageUrl: "/cover-images/12.jpg",
        audioUrl: "/songs/12.mp3",
        duration: 17
    },
    {
        title: "Shallow",
        artist: "Lady Gaga & Bradley Cooper",
        imageUrl: "/cover-images/13.jpg",
        audioUrl: "/songs/13.mp3",
        duration: 39
    },
    {
        title: "Someone You Loved",
        artist: "Lewis Capaldi",
        imageUrl: "/cover-images/14.jpg",
        audioUrl: "/songs/14.mp3",
        duration: 29
    },
    {
        title: "Sunflower",
        artist: "Post Malone & Swae Lee",
        imageUrl: "/cover-images/15.jpg",
        audioUrl: "/songs/15.mp3",
        duration: 36
    },
    {
        title: "Perfect",
        artist: "Ed Sheeran",
        imageUrl: "/cover-images/16.jpg",
        audioUrl: "/songs/16.mp3",
        duration: 40
    },
    {
        title: "Circles",
        artist: "Post Malone",
        imageUrl: "/cover-images/17.jpg",
        audioUrl: "/songs/17.mp3",
        duration: 39
    },
    {
        title: "Old Town Road",
        artist: "Lil Nas X ft. Billy Ray Cyrus",
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
        console.log("Songs seeded successfully!");
    } catch (error) {
        console.error("Error seeding songs:", error);
    } finally {
        mongoose.connection.close();
    }
};

seedSongs();