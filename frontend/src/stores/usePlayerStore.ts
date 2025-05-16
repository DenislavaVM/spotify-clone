import { create } from "zustand";
import { Song } from "@/types";
import { trackActivity } from "@/lib/trackActivity";

interface PlayerStore {
    currentSong: Song | null;
    isPlaying: boolean;
    queue: Song[];
    currentIndex: number;
    isBuffering: boolean;
    isShuffle: boolean;
    isRepeat: boolean;

    initializeQueue: (songs: Song[]) => void;
    playAlbum: (songs: Song[], startIndex?: number) => void;
    setCurrentSong: (song: Song | null) => void;
    togglePlay: () => void;
    playNext: () => void;
    playPrevious: () => void;
    toggleShuffle: () => void;
    toggleRepeat: () => void;
    setIsBuffering: (value: boolean) => void;
};

const getStoredBool = (key: string, fallback = false) => {
    if (typeof window !== "undefined") {
        const val = localStorage.getItem(key);
        return val === "true" ? true : fallback;
    }
    return fallback;
};

export const usePlayerStore = create<PlayerStore>((set, get) => ({
    currentSong: null,
    isPlaying: false,
    queue: [],
    currentIndex: -1,
    isBuffering: false,
    isShuffle: getStoredBool("player_shuffle"),
    isRepeat: getStoredBool("player_repeat"),
    setIsBuffering: (value) => set({ isBuffering: value }),
    toggleShuffle: () => {
        set((state) => {
            const newVal = !state.isShuffle;
            localStorage.setItem("player_shuffle", String(newVal));
            return { isShuffle: newVal };
        });
    },

    toggleRepeat: () => {
        set((state) => {
            const newVal = !state.isRepeat;
            localStorage.setItem("player_repeat", String(newVal));
            return { isRepeat: newVal };
        });
    },

    initializeQueue: (songs: Song[]) => {
        set({
            queue: songs,
            currentSong: get().currentSong || songs[0],
            currentIndex: get().currentIndex === -1 ? 0 : get().currentIndex,
        });
    },

    playAlbum: (songs: Song[], startIndex = 0) => {
        if (songs.length === 0) {
            return;
        };

        const song = songs[startIndex];
        trackActivity(song);

        set({
            queue: songs,
            currentSong: song,
            currentIndex: startIndex,
            isPlaying: true,
        });
    },

    setCurrentSong: (song: Song | null) => {
        if (!song) {
            return;
        };

        const songIndex = get().queue.findIndex((s) => s._id === song._id);
        trackActivity(song);

        set({
            currentSong: song,
            isPlaying: true,
            currentIndex: songIndex !== -1 ? songIndex : get().currentIndex
        });
    },

    togglePlay: () => {
        const { isPlaying, currentSong } = get();
        const willStartPlaying = !isPlaying;

        trackActivity(willStartPlaying ? currentSong : null, !willStartPlaying);

        set({
            isPlaying: willStartPlaying,
        });
    },

    playNext: () => {
        const { currentIndex, queue, isShuffle, isRepeat } = get();

        if (isRepeat) {
            const currentSong = queue[currentIndex];
            trackActivity(currentSong);
            setTimeout(() => {
                const audio = document.querySelector("audio") as HTMLAudioElement;
                if (audio) {
                    audio.currentTime = 0;
                    audio.play();
                };
            }, 0);
            return;
        };

        if (isShuffle) {
            let randomIndex = Math.floor(Math.random() * queue.length);
            if (queue.length > 1) {
                while (randomIndex === currentIndex) {
                    randomIndex = Math.floor(Math.random() * queue.length);
                };
            };

            const randomSong = queue[randomIndex];
            trackActivity(randomSong);
            set({
                currentSong: randomSong,
                currentIndex: randomIndex,
                isPlaying: true,
            });
            return;
        };

        const nextIndex = currentIndex + 1;

        if (nextIndex < queue.length) {
            const nextSong = queue[nextIndex];
            trackActivity(nextSong);

            set({
                currentSong: nextSong,
                currentIndex: nextIndex,
                isPlaying: true,
            });
        } else {
            trackActivity(null, true);
            set({ isPlaying: false });
        };
    },

    playPrevious: () => {
        const { currentIndex, queue, isShuffle } = get();

        if (isShuffle) {
            let randomIndex = Math.floor(Math.random() * queue.length);

            if (queue.length > 1) {
                while (randomIndex === currentIndex) {
                    randomIndex = Math.floor(Math.random() * queue.length);
                };
            };

            const randomSong = queue[randomIndex];
            trackActivity(randomSong);
            set({
                currentSong: randomSong,
                currentIndex: randomIndex,
                isPlaying: true,
            });
            return;
        };

        const prevIndex = currentIndex - 1

        if (prevIndex >= 0) {
            const prevSong = queue[prevIndex];
            trackActivity(prevSong);

            set({
                currentSong: prevSong,
                currentIndex: prevIndex,
                isPlaying: true,
            });
        } else {
            trackActivity(null, true);
            set({ isPlaying: false });
        }
    },
}));