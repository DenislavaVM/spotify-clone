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
            {
                title: "Blinding Lights",
                artist: "The Weeknd",
                album: "After Hours",
                imageUrl: "/cover-images/1.jpg",
                audioUrl: "/songs/1.mp3",
                plays: Math.floor(Math.random() * 5000),
                duration: 46
            },
            {
                title: "Shape of You",
                artist: "Ed Sheeran",
                album: "÷ (Divide)",
                imageUrl: "/cover-images/2.jpg",
                audioUrl: "/songs/2.mp3",
                plays: Math.floor(Math.random() * 5000),
                duration: 41
            },
            {
                title: "Levitating",
                artist: "Dua Lipa",
                album: "Future Nostalgia",
                imageUrl: "/cover-images/3.jpg",
                audioUrl: "/songs/3.mp3",
                plays: Math.floor(Math.random() * 5000),
                duration: 24
            },
            {
                title: "Uptown Funk",
                artist: "Mark Ronson ft. Bruno Mars",
                album: "Uptown Special",
                imageUrl: "/cover-images/4.jpg",
                audioUrl: "/songs/4.mp3",
                plays: Math.floor(Math.random() * 5000),
                duration: 28
            },
            {
                title: "Stay",
                artist: "The Kid LAROI & Justin Bieber",
                album: "F*CK LOVE 3: OVER YOU",
                imageUrl: "/cover-images/5.jpg",
                audioUrl: "/songs/5.mp3",
                plays: Math.floor(Math.random() * 5000),
                duration: 36
            },
            {
                title: "Bad Guy",
                artist: "Billie Eilish",
                album: "When We All Fall Asleep, Where Do We Go?",
                imageUrl: "/cover-images/6.jpg",
                audioUrl: "/songs/6.mp3",
                plays: Math.floor(Math.random() * 5000),
                duration: 40
            },
            {
                title: "Dance Monkey",
                artist: "Tones and I",
                album: "The Kids Are Coming",
                imageUrl: "/cover-images/7.jpg",
                audioUrl: "/songs/7.mp3",
                plays: Math.floor(Math.random() * 5000),
                duration: 42
            },
            {
                title: "Watermelon Sugar",
                artist: "Harry Styles",
                album: "Fine Line",
                imageUrl: "/cover-images/8.jpg",
                audioUrl: "/songs/8.mp3",
                plays: Math.floor(Math.random() * 5000),
                duration: 28
            },
            {
                title: "Drivers License",
                artist: "Olivia Rodrigo",
                album: "SOUR",
                imageUrl: "/cover-images/9.jpg",
                audioUrl: "/songs/9.mp3",
                plays: Math.floor(Math.random() * 5000),
                duration: 28
            },
            {
                title: "Havana",
                artist: "Camila Cabello ft. Young Thug",
                album: "Camila",
                imageUrl: "/cover-images/10.jpg",
                audioUrl: "/songs/10.mp3",
                plays: Math.floor(Math.random() * 5000),
                duration: 30
            },
            {
                title: "Rockstar",
                artist: "Post Malone ft. 21 Savage",
                album: "Beerbongs & Bentleys",
                imageUrl: "/cover-images/11.jpg",
                audioUrl: "/songs/11.mp3",
                plays: Math.floor(Math.random() * 5000),
                duration: 29
            },
            {
                title: "God's Plan",
                artist: "Drake",
                album: "Scorpion",
                imageUrl: "/cover-images/12.jpg",
                audioUrl: "/songs/12.mp3",
                plays: Math.floor(Math.random() * 5000),
                duration: 17
            },
            {
                title: "Shallow",
                artist: "Lady Gaga & Bradley Cooper",
                album: "A Star Is Born Soundtrack",
                imageUrl: "/cover-images/13.jpg",
                audioUrl: "/songs/13.mp3",
                plays: Math.floor(Math.random() * 5000),
                duration: 39
            },
            {
                title: "Someone You Loved",
                artist: "Lewis Capaldi",
                album: "Divinely Uninspired to a Hellish Extent",
                imageUrl: "/cover-images/14.jpg",
                audioUrl: "/songs/14.mp3",
                plays: Math.floor(Math.random() * 5000),
                duration: 29
            },
            {
                title: "Sunflower",
                artist: "Post Malone & Swae Lee",
                album: "Spider-Man: Into the Spider-Verse Soundtrack",
                imageUrl: "/cover-images/15.jpg",
                audioUrl: "/songs/15.mp3",
                plays: Math.floor(Math.random() * 5000),
                duration: 36
            },
            {
                title: "Perfect",
                artist: "Ed Sheeran",
                album: "÷ (Divide)",
                imageUrl: "/cover-images/16.jpg",
                audioUrl: "/songs/16.mp3",
                plays: Math.floor(Math.random() * 5000),
                duration: 40
            },
            {
                title: "Circles",
                artist: "Post Malone",
                album: "Hollywood's Bleeding",
                imageUrl: "/cover-images/17.jpg",
                audioUrl: "/songs/17.mp3",
                plays: Math.floor(Math.random() * 5000),
                duration: 39
            },
            {
                title: "Old Town Road",
                artist: "Lil Nas X ft. Billy Ray Cyrus",
                album: "7 EP",
                imageUrl: "/cover-images/18.jpg",
                audioUrl: "/songs/18.mp3",
                plays: Math.floor(Math.random() * 5000),
                duration: 29
            }
        ]);

        const albums = [
            {
                title: "After Hours",
                artist: "The Weeknd",
                imageUrl: "/albums/1.jpg",
                releaseYear: 2020,
                songs: createdSongs.filter(song => song.album === "After Hours").map(song => song._id),
            },
            {
                title: "Future Nostalgia",
                artist: "Dua Lipa",
                imageUrl: "/albums/2.jpg",
                releaseYear: 2020,
                songs: createdSongs.filter(song => song.album === "Future Nostalgia").map(song => song._id),
            },
            {
                title: "÷ (Divide)",
                artist: "Ed Sheeran",
                imageUrl: "/albums/3.jpg",
                releaseYear: 2017,
                songs: createdSongs.filter(song => song.album === "÷ (Divide)").map(song => song._id),
            },
            {
                title: "Hollywood's Bleeding",
                artist: "Post Malone",
                imageUrl: "/albums/4.jpg",
                releaseYear: 2019,
                songs: createdSongs.filter(song => song.album === "Hollywood's Bleeding").map(song => song._id),
            }
        ];

        const createdAlbums = await Album.insertMany(albums);

        for (let i = 0; i < createdAlbums.length; i++) {
            const album = createdAlbums[i];
            const albumSongs = albums[i].songs;

            await Song.updateMany({ _id: { $in: albumSongs } }, { albumId: album._id });
        }

        logger.info("Database seeded successfully!");
    } catch (error) {
        logger.error("Error seeding database", error);
    } finally {
        mongoose.connection.close();
    }
};

seedDatabase();