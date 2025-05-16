import { create } from "zustand";
import { Album } from "@/types";
import { apiDelete, apiGet } from "@/lib/api";
import toast from "react-hot-toast";

interface AlbumStore {
    albums: Album[];
    currentAlbum: Album | null;
    isLoading: boolean;
    error: string | null;

    fetchAlbums: () => Promise<void>;
    fetchAlbumById: (id: string) => Promise<void>;
    deleteAlbum: (id: string) => Promise<void>;
}

export const useAlbumStore = create<AlbumStore>((set) => ({
    albums: [],
    currentAlbum: null,
    isLoading: false,
    error: null,

    fetchAlbums: async () => {
        set({ isLoading: true, error: null });
        const [data, error] = await apiGet<Album[]>("/albums");
        if (data) {
            set({ albums: data });
        };

        if (error) {
            set({ error });
        };

        set({ isLoading: false });
    },

    fetchAlbumById: async (id) => {
        set({ isLoading: true, error: null, currentAlbum: null });
        const [data, error] = await apiGet<Album>(`/albums/${id}`);
        if (data) {
            set({ currentAlbum: data });
        };

        if (error) {
            set({ error });
        };

        set({ isLoading: false });
    },

    deleteAlbum: async (id) => {
        set({ isLoading: true, error: null });
        const [_, error] = await apiDelete(`/admin/albums/${id}`);
        if (!error) {
            set((state) => ({
                albums: state.albums.filter((a) => a._id !== id),
            }));
            toast.success("Album deleted");
        } else {
            toast.error("Error deleting album: " + error);
        }
        set({ isLoading: false });
    },
}));