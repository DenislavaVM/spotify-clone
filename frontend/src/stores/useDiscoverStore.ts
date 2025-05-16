import { create } from "zustand";
import { Song } from "@/types";
import { apiGet } from "@/lib/api";

interface DiscoverStore {
  featuredSongs: Song[];
  madeForYouSongs: Song[];
  trendingSongs: Song[];
  isLoading: boolean;
  error: string | null;

  fetchFeaturedSongs: () => Promise<void>;
  fetchMadeForYouSongs: () => Promise<void>;
  fetchTrendingSongs: () => Promise<void>;
}

export const useDiscoverStore = create<DiscoverStore>((set) => ({
  featuredSongs: [],
  madeForYouSongs: [],
  trendingSongs: [],
  isLoading: false,
  error: null,

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
    };

    if (error) {
      set({ error });
    };

    set({ isLoading: false });
  },
}));