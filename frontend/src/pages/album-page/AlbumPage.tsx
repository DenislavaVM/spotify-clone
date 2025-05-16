import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useAlbumStore } from "@/stores/useAlbumStore";
import { usePlayerStore } from "@/stores/usePlayerStore";

import AlbumHeader from "./components/AlbumHeader";
import AlbumPlayButton from "./components/AlbumPlayButton";
import TrackList from "./components/TrackList";

const AlbumPage = () => {
    const { albumId } = useParams();
    const { fetchAlbumById, currentAlbum, isLoading } = useAlbumStore();
    const { currentSong, isPlaying, playAlbum, togglePlay } = usePlayerStore();

    useEffect(() => {
        if (albumId) fetchAlbumById(albumId);
    }, [albumId]);

    if (isLoading || !currentAlbum) return null;

    const handlePlayAlbum = () => {
        const isCurrentAlbum = currentAlbum.songs.some((s) => s._id === currentSong?._id);
        if (isCurrentAlbum) togglePlay();
        else playAlbum(currentAlbum.songs, 0);
    };

    const handlePlaySong = (index: number) => playAlbum(currentAlbum.songs, index);

    return (
        <div className="h-full">
            <ScrollArea className="h-full rounded-md">
                <div className="relative min-h-full">
                    <div
                        className="absolute inset-0 bg-gradient-to-b from-[#5038a0]/80 via-zinc-900/80 to-zinc-900 pointer-events-none"
                        aria-hidden="true"
                    />
                    <div className="relative z-10">
                        <AlbumHeader album={currentAlbum} />
                        <AlbumPlayButton
                            isPlaying={isPlaying}
                            currentSongId={currentSong?._id ?? null}
                            songs={currentAlbum.songs}
                            onPlay={handlePlayAlbum}
                            onToggle={togglePlay}
                        />
                        <TrackList
                            songs={currentAlbum.songs}
                            currentSongId={currentSong?._id ?? null}
                            isPlaying={isPlaying}
                            onPlaySong={handlePlaySong}
                        />
                    </div>
                </div>
            </ScrollArea>
        </div>
    );
};

export default AlbumPage;