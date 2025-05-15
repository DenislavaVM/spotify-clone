import { Clock } from "lucide-react";
import { Song } from "@/types";
import TrackRow from "./TrackRow";

interface Props {
    songs: Song[];
    currentSongId: string | null;
    isPlaying: boolean;
    onPlaySong: (index: number) => void;
}

const TrackList = ({ songs, currentSongId, isPlaying, onPlaySong }: Props) => (
    <>
        <div className="bg-black/20 backdrop-blur-sm">
            <div className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-10 py-2 text-sm text-zinc-400 border-b border-white/5">
                <div>#</div>
                <div>Title</div>
                <div>Released Date:</div>
                <div>
                    <Clock className="h-4 w-4" />
                </div>
            </div>
        </div>

        <div className="px-6 space-y-2 py-4">
            {songs.map((song, index) => (
                <TrackRow
                    key={song._id}
                    song={song}
                    index={index}
                    isCurrent={song._id === currentSongId}
                    isPlaying={isPlaying}
                    onClick={() => onPlaySong(index)}
                />
            ))}
        </div>
    </>
);

export default TrackList;