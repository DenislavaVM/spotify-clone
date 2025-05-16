import { Song } from "@/types";
import { useSocketStore } from "@/stores/useSocketStore";

export const trackActivity = (song: Song | null, isIdle: boolean = false) => {
    const socket = useSocketStore.getState().socket;

    const userId = (socket.auth as { userId?: string })?.userId;
    if (!userId) return;

    socket.emit("update_activity", {
        userId,
        activity: isIdle || !song
            ? "Idle"
            : `Playing ${song.title} by ${song.artist}`,
    });
};