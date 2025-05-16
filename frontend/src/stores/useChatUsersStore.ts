import { create } from "zustand";
import { apiGet } from "@/lib/api";
import { User } from "@/types";

interface ChatUsersStore {
    users: User[];
    isLoading: boolean;
    error: string | null;
    onlineUsers: Set<string>;
    userActivities: Map<string, string>;
    fetchUsers: () => Promise<void>;
    setOnlineUsers: (users: string[]) => void;
    setUserActivities: (activities: [string, string][]) => void;
    updateUserActivity: (userId: string, activity: string) => void;
}

export const useChatUsersStore = create<ChatUsersStore>((set) => ({
    users: [],
    isLoading: false,
    error: null,
    onlineUsers: new Set(),
    userActivities: new Map(),

    fetchUsers: async () => {
        set({ isLoading: true, error: null });
        const [data, error] = await apiGet<User[]>("/users");
        if (data) {
            set({ users: data });
        };

        if (error) {
            set({ error });
        };

        set({ isLoading: false });
    },

    setOnlineUsers: (users) => set({ onlineUsers: new Set(users) }),
    setUserActivities: (activities) =>
        set({ userActivities: new Map(activities) }),

    updateUserActivity: (userId, activity) =>
        set((state) => {
            const newActivities = new Map(state.userActivities);
            newActivities.set(userId, activity);
            return { userActivities: newActivities };
        }),
}));