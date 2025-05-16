import { create } from "zustand";
import { Stats } from "@/types";
import { apiGet } from "@/lib/api";

interface StatsStore {
    stats: Stats;
    isLoading: boolean;
    error: string | null;
    fetchStats: () => Promise<void>;
}

export const useStatsStore = create<StatsStore>((set) => ({
    stats: {
        totalSongs: 0,
        totalAlbums: 0,
        totalArtists: 0,
        totalUsers: 0,
    },
    isLoading: false,
    error: null,

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
}));