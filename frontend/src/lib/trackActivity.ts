import { Song } from "@/types";
import { useChatStore } from "@/stores/useChatStore";

export const trackActivity = (song: Song | null, isIdle: boolean = false) => {
    const socket = useChatStore.getState().socket;

    if (!socket?.auth?.userId) return;

    socket.emit("update_activity", {
        userId: socket.auth.userId,
        activity: isIdle || !song
            ? "Idle"
            : `Playing ${song.title} by ${song.artist}`,
    });
};