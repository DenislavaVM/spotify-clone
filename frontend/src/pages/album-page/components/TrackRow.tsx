import { Play } from "lucide-react";
import { Song } from "@/types";

interface Props {
    song: Song;
    index: number;
    isCurrent: boolean;
    isPlaying: boolean;
    onClick: () => void;
}

const formatDuration = (seconds: number) =>
    `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;

const TrackRow = ({ song, index, isCurrent, isPlaying, onClick }: Props) => (
    <div
        onClick={onClick}
        className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-4 py-2 text-sm text-zinc-400 hover:bg-white/5 rounded-md group cursor-pointer"
    >
        <div className="flex items-center justify-center">
            {isCurrent && isPlaying ? (
                <div className="size-4 text-green-500">♫</div>
            ) : (
                <>
                    <span className="group-hover:hidden">{index + 1}</span>
                    {!isCurrent && <Play className="h-4 w-4 hidden group-hover:block" />}
                </>
            )}
        </div>

        <div className="flex items-center gap-3">
            <img src={song.imageUrl} alt={song.title} className="size-10" />
            <div>
                <div className="font-medium text-white">{song.title}</div>
                <div>{song.artist}</div>
            </div>
        </div>
        <div className="flex items-center">{song.createdAt.split("T")[0]}</div>
        <div className="flex items-center">{formatDuration(song.duration)}</div>
    </div>
);

export default TrackRow;