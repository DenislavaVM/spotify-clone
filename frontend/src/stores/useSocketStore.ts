import { create } from "zustand";
import { io } from "socket.io-client";
import { Message } from "@/types";
import { useChatUsersStore } from "./useChatUsersStore";
import { useMessagesStore } from "./useMessagesStore";

const socket = io(import.meta.env.VITE_BACKEND_URL, {
    autoConnect: false,
    withCredentials: true,
});

interface SocketStore {
    socket: typeof socket;
    isConnected: boolean;
    initSocket: (userId: string) => void;
    disconnectSocket: () => void;
}

export const useSocketStore = create<SocketStore>((set, get) => ({
    socket,
    isConnected: false,

    initSocket: (userId: string) => {
        if (get().isConnected) return;

        socket.auth = { userId };
        socket.connect();

        socket.on("connect", () => {
            socket.emit("user_connected", userId);
        });

        const { setOnlineUsers, setUserActivities, updateUserActivity } = useChatUsersStore.getState();
        const { addMessage } = useMessagesStore.getState();

        socket.on("users_online", (users: string[]) => {
            setOnlineUsers(users);
        });

        socket.on("activities", (activities: [string, string][]) => {
            setUserActivities(activities);
        });

        socket.on("user_connected", (id: string) => {
            setOnlineUsers(Array.from(useChatUsersStore.getState().onlineUsers).concat(id));
        });

        socket.on("user_disconnected", (id: string) => {
            const newOnlineUsers = new Set(useChatUsersStore.getState().onlineUsers);
            newOnlineUsers.delete(id);
            useChatUsersStore.setState({ onlineUsers: newOnlineUsers });
        });

        socket.on("receive_message", (message: Message) => addMessage(message));
        socket.on("message_sent", (message: Message) => addMessage(message));
        socket.on("activity_updated", ({ userId, activity }) => {
            updateUserActivity(userId, activity);
        });

        set({ isConnected: true });
    },

    disconnectSocket: () => {
        socket.disconnect();
        set({ isConnected: false });
    },
}));