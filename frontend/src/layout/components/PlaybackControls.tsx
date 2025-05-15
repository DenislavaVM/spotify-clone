import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { Laptop2, ListMusic, Mic2, Pause, Play, Repeat, Shuffle, SkipBack, SkipForward, Volume1, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

const PlaybackControls = () => {
    const { currentSong, isPlaying, togglePlay, playNext, playPrevious, isBuffering } = usePlayerStore();
    const [isMuted, setIsMuted] = useState(false);
    const [volume, setVolume] = useState(() => {
        const storedVolume = localStorage.getItem("player_volume");
        return storedVolume ? Number(storedVolume) : 75;
    });
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        audioRef.current = document.querySelector("audio");

        const audio = audioRef.current;
        if (!audio) return;

        const updateTime = () => setCurrentTime(audio.currentTime);
        const updateDuration = () => setDuration(audio.duration);

        audio.addEventListener("timeupdate", updateTime);
        audio.addEventListener("loadedmetadata", updateDuration);

        const handleEnded = () => {
            usePlayerStore.setState({ isPlaying: false });
        };

        audio.addEventListener("ended", handleEnded);

        return () => {
            audio.removeEventListener("timeupdate", updateTime);
            audio.removeEventListener("loadedmetadata", updateDuration);
            audio.removeEventListener("ended", handleEnded);
        };
    }, [currentSong]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume / 100;
        }
        localStorage.setItem("player_volume", String(volume));
    }, [volume]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = isMuted ? 0 : volume / 100;
        }
        localStorage.setItem("player_volume", String(volume));
    }, [volume, isMuted]);

    const handleSeek = (value: number[]) => {
        if (audioRef.current) {
            audioRef.current.currentTime = value[0];
        }
    };

    const toggleMute = () => {
        setIsMuted((prev) => !prev);
    };

    return (
        <footer className='h-20 sm:h-24 bg-zinc-900 border-t border-zinc-800 px-4'>
            <div className='flex justify-between items-center h-full max-w-[1800px] mx-auto'>
                <div className='hidden sm:flex items-center gap-4 min-w-[180px] w-[30%]'>
                    {currentSong && (
                        <>
                            <img
                                src={currentSong.imageUrl}
                                alt={currentSong.title}
                                className='w-14 h-14 object-cover rounded-md'
                            />
                            <div className='flex-1 min-w-0'>
                                <div className='font-medium truncate hover:underline cursor-pointer'>
                                    {currentSong.title}
                                </div>
                                <div className='text-sm text-zinc-400 truncate hover:underline cursor-pointer'>
                                    {currentSong.artist}
                                </div>
                            </div>
                        </>
                    )}
                </div>

                <div className='flex flex-col items-center gap-2 flex-1 max-w-full sm:max-w-[45%]'>
                    <div className='flex items-center gap-4 sm:gap-6'>
                        <Button
                            size='icon'
                            variant='ghost'
                            className='hidden sm:inline-flex hover:text-white text-zinc-400'
                        >
                            <Shuffle className='h-4 w-4' />
                        </Button>

                        <Button
                            size='icon'
                            variant='ghost'
                            className='hover:text-white text-zinc-400'
                            onClick={playPrevious}
                            disabled={!currentSong}
                        >
                            <SkipBack className='h-4 w-4' />
                        </Button>

                        <Button
                            size='icon'
                            className='bg-white hover:bg-white/80 text-black rounded-full h-8 w-8'
                            onClick={togglePlay}
                            disabled={!currentSong}
                        >
                            {isBuffering ? (
                                <Loader2 className='h-5 w-5 animate-spin' />
                            ) : isPlaying ? (
                                <Pause className='h-5 w-5' />
                            ) : (
                                <Play className='h-5 w-5' />
                            )}
                        </Button>
                        <Button
                            size='icon'
                            variant='ghost'
                            className='hover:text-white text-zinc-400'
                            onClick={playNext}
                            disabled={!currentSong}
                        >
                            <SkipForward className='h-4 w-4' />
                        </Button>
                        <Button
                            size='icon'
                            variant='ghost'
                            className='hidden sm:inline-flex hover:text-white text-zinc-400'
                        >
                            <Repeat className='h-4 w-4' />
                        </Button>
                    </div>

                    <div className='hidden sm:flex items-center gap-2 w-full'>
                        <div className='text-xs text-zinc-400'>{formatTime(currentTime)}</div>
                        <Slider
                            value={[currentTime]}
                            max={duration || 100}
                            step={1}
                            className='w-full hover:cursor-grab active:cursor-grabbing'
                            onValueChange={handleSeek}
                        />
                        <div className='text-xs text-zinc-400'>{formatTime(duration)}</div>
                    </div>
                </div>
                <div className='hidden sm:flex items-center gap-4 min-w-[180px] w-[30%] justify-end'>
                    <Button size='icon' variant='ghost' className='hover:text-white text-zinc-400'>
                        <Mic2 className='h-4 w-4' />
                    </Button>
                    <Button size='icon' variant='ghost' className='hover:text-white text-zinc-400'>
                        <ListMusic className='h-4 w-4' />
                    </Button>
                    <Button size='icon' variant='ghost' className='hover:text-white text-zinc-400'>
                        <Laptop2 className='h-4 w-4' />
                    </Button>

                    <div className="relative group flex items-center gap-2">
                        <Button size='icon' variant='ghost' className='hover:text-white text-zinc-400' onClick={toggleMute}>
                            {isMuted || volume === 0 ? (
                                <Volume1 className="h-4 w-4 text-red-400" />
                            ) : (
                                <Volume1 className="h-4 w-4" />
                            )}
                        </Button>

                        <div
                            className="w-0 overflow-hidden group-hover:w-24 transition-all duration-300 ease-in-out"
                        >
                            <Slider
                                value={[isMuted ? 0 : volume]}
                                max={100}
                                step={1}
                                className="w-full hover:cursor-grab active:cursor-grabbing"
                                onValueChange={(value) => {
                                    const newVolume = value[0];
                                    setVolume(newVolume);
                                    if (newVolume === 0) {
                                        setIsMuted(true);
                                    } else {
                                        setIsMuted(false);
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default PlaybackControls;