import { Button } from "@/components/ui/button";
import { Pause, Play } from "lucide-react";
import { Song } from "@/types";

interface Props {
  isPlaying: boolean;
  currentSongId: string | null;
  songs: Song[];
  onPlay: () => void;
  onToggle: () => void;
}

const AlbumPlayButton = ({ isPlaying, currentSongId, songs, onPlay, onToggle }: Props) => {
  const isCurrentAlbum = songs.some((s) => s._id === currentSongId);

  return (
    <div className="px-6 pb-4 flex items-center gap-6">
      <Button
        onClick={isCurrentAlbum ? onToggle : onPlay}
        size="icon"
        className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-400 hover:scale-105 transition-all"
      >
        {isCurrentAlbum && isPlaying ? (
          <Pause className="h-7 w-7 text-black" />
        ) : (
          <Play className="h-7 w-7 text-black" />
        )}
      </Button>
    </div>
  );
};

export default AlbumPlayButton;