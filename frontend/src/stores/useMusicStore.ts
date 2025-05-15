import { axiosInstance } from "@/lib/axios";
import { Album, Song, Stats } from "@/types";
import { apiGet, apiDelete } from "@/lib/api";
import toast from "react-hot-toast";
import { create } from "zustand";

interface MusicStore {
  songs: Song[],
  albums: Album[],
  isLoading: boolean,
  error: string | null,
  currentAlbum: Album | null,
  featuredSongs: Song[],
  madeForYouSongs: Song[],
  trendingSongs: Song[],
  stats: Stats;

  fetchAlbums: () => Promise<void>;
  fetchAlbumById: (id: string) => Promise<void>;
  fetchFeaturedSongs: () => Promise<void>;
  fetchMadeForYouSongs: () => Promise<void>;
  fetchTrendingSongs: () => Promise<void>;
  fetchStats: () => Promise<void>;
  fetchSongs: () => Promise<void>;
  deleteSong: (id: string) => Promise<void>;
  deleteAlbum: (id: string) => Promise<void>;
}

export const useMusicStore = create<MusicStore>((set) => ({
  albums: [],
  songs: [],
  isLoading: false,
  error: null,
  currentAlbum: null,
  madeForYouSongs: [],
  featuredSongs: [],
  trendingSongs: [],
  stats: {
    totalSongs: 0,
    totalAlbums: 0,
    totalUsers: 0,
    totalArtists: 0,
  },

  deleteSong: async (id) => {
    set({ isLoading: true, error: null });
    const [_, error] = await apiDelete(`/admin/songs/${id}`);

    if (!error) {
      set((state) => ({
        songs: state.songs.filter((song) => song._id !== id),
      }));
      toast.success("Song deleted successfully");
    } else {
      toast.error("Error deleting song: " + error);
    }
    set({ isLoading: false });
  },

  deleteAlbum: async (id) => {
    set({ isLoading: true, error: null });

    const [_, error] = await apiDelete(`/admin/albums/${id}`);

    if (!error) {
      set((state) => ({
        albums: state.albums.filter((album) => album._id !== id),
        songs: state.songs.map((song) =>
          song.albumId === id ? { ...song, album: null } : song
        ),
      }));
      toast.success("Album deleted successfully");
    } else {
      toast.error("Failed to delete album: " + error);
    }

    set({ isLoading: false });
  },

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

  fetchStats: async () => {
    set({ isLoading: true, error: null });
    const [data, error] = await apiGet<Stats>("/stats");

    if (data) {
      set({ stats: data });
    };

    if (error) {
      set({ error });
    };

    set({ isLoading: false });
  },

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

  fetchFeaturedSongs: async () => {
    set({ isLoading: true, error: null });
    const [data, error] = await apiGet<Song[]>("/songs/featured");

    if (data) {
      set({ featuredSongs: data });
    };

    if (error) {
      set({ error });
    };

    set({ isLoading: false });
  },

  fetchMadeForYouSongs: async () => {
    set({ isLoading: true, error: null });
    const [data, error] = await apiGet<Song[]>("/songs/made-for-you");

    if (data) {
      set({ madeForYouSongs: data });
    };

    if (error) {
      set({ error });
    };

    set({ isLoading: false });
  },

  fetchTrendingSongs: async () => {
    set({ isLoading: true, error: null });
    const [data, error] = await apiGet<Song[]>("/songs/trending");

    if (data) {
      set({ trendingSongs: data });
    }
    if (error) {
      set({ error });
    };

    set({ isLoading: false });
  },
}));