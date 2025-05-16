import { create } from "zustand";
import { Song } from "@/types";
import { apiDelete, apiGet } from "@/lib/api";
import toast from "react-hot-toast";

interface SongStore {
    songs: Song[];
    isLoading: boolean;
    error: string | null;

    fetchSongs: () => Promise<void>;
    deleteSong: (id: string) => Promise<void>;
}

export const useSongStore = create<SongStore>((set) => ({
    songs: [],
    isLoading: false,
    error: null,

    fetchSongs: async () => {
        set({ isLoading: true, error: null });
        const [data, error] = await apiGet<Song[]>("/songs");
        if (data) {
            set({ songs: data });
        };

        if (error) {
            set({ error });
        };

        set({ isLoading: false });
    },

    deleteSong: async (id) => {
        set({ isLoading: true });
        const [_, error] = await apiDelete(`/admin/songs/${id}`);
        if (!error) {
            set((state) => ({ songs: state.songs.filter((s) => s._id !== id) }));
            toast.success("Song deleted");
        } else {
            toast.error("Error deleting song: " + error);
        }
        set({ isLoading: false });
    },
}));