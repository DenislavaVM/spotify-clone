import { create } from "zustand";
import { User } from "@/types";

interface SelectedUserStore {
    selectedUser: User | null;
    setSelectedUser: (user: User | null) => void;
};

export const useSelectedUserStore = create<SelectedUserStore>((set) => ({
    selectedUser: null,
    setSelectedUser: (user) => set({ selectedUser: user }),
}));