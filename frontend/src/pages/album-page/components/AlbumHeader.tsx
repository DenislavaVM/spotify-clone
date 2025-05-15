import { Album } from "@/types";

const AlbumHeader = ({ album }: { album: Album }) => (
    <div className="flex p-8 gap-6 pb-8">
        <img
            src={album.imageUrl}
            alt={album.title}
            className="w-[240px] h-[240px] shadow-xl rounded"
        />
        <div className="flex flex-col justify-end">
            <p className="text-sm font-medium">Album</p>
            <h1 className="text-7xl font-bold my-4">{album.title}</h1>
            <div className="flex items-center gap-2 text-sm text-zinc-100">
                <span className="font-medium text-white">{album.artist}</span>
                <span>{album.songs.length} songs</span>
                <span>{album.releaseYear}</span>
            </div>
        </div>
    </div>
);

export default AlbumHeader;