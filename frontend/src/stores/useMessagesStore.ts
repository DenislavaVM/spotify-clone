import { create } from "zustand";
import { apiGet } from "@/lib/api";
import { Message } from "@/types";
import { useSocketStore } from "./useSocketStore";

interface MessagesStore {
    messages: Message[];
    isLoading: boolean;
    error: string | null;
    fetchMessages: (userId: string) => Promise<void>;
    sendMessage: (receiverId: string, senderId: string, content: string) => void;
    addMessage: (message: Message) => void;
}

export const useMessagesStore = create<MessagesStore>((set, get) => ({
    messages: [],
    isLoading: false,
    error: null,

    fetchMessages: async (userId: string) => {
        set({ isLoading: true, error: null });
        const [data, error] = await apiGet<Message[]>(`/users/messages/${userId}`);
        if (data) {
            set({ messages: data });
        };

        if (error) {
            set({ error });
        };

        set({ isLoading: false });
    },

    sendMessage: (receiverId, senderId, content) => {
        const socket = useSocketStore.getState().socket;
        if (!socket) {
            return;
        };

        socket.emit("send_message", { receiverId, senderId, content });
    },

    addMessage: (message) => {
        set((state) => ({ messages: [...state.messages, message] }));
    },
}));