import { usePlayerStore } from "@/stores/usePlayerStore";
import { useEffect, useRef } from "react";

const AudioPlayer = () => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const prevSongRef = useRef<string | null>(null);

    const { currentSong, isPlaying, playNext, setIsBuffering } = usePlayerStore();

    useEffect(() => {
        if (isPlaying) {
            audioRef.current?.play();
        } else {
            audioRef.current?.pause();
        }

    }, [isPlaying]);

    useEffect(() => {
        const audio = audioRef.current;

        const handleEnded = () => {
            playNext();
        };

        audio?.addEventListener("ended", handleEnded);
        return () => audio?.removeEventListener("ended", handleEnded);
    }, [playNext]);

    useEffect(() => {
        if (!audioRef.current || !currentSong) {
            return;
        };

        const audio = audioRef.current;
        const isSongChange = prevSongRef.current !== currentSong?.audioUrl;

        if (isSongChange) {
            audio.src = currentSong?.audioUrl;
            audio.currentTime = 0;
            prevSongRef.current = currentSong?.audioUrl;
        };

        if (isPlaying) {
            audio.play();
        };

    }, [currentSong, isPlaying]);

    useEffect(() => {
        const audio = audioRef.current;

        const handleWaiting = () => setIsBuffering(true);
        const handlePlaying = () => setIsBuffering(false);

        audio?.addEventListener("waiting", handleWaiting);
        audio?.addEventListener("playing", handlePlaying);

        return () => {
            audio?.removeEventListener("waiting", handleWaiting);
            audio?.removeEventListener("playing", handlePlaying);
        };
    }, [setIsBuffering]);

    return (
        <audio ref={audioRef} />
    );
};

export default AudioPlayer;