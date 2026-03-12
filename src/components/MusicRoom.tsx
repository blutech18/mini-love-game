import { type FC } from "react";
import { motion } from "framer-motion";
import { playlist } from "@/data/content";
import { useGameStore } from "@/store/useGameStore";
import { Play, Pause, SkipForward, SkipBack, Volume2, Music, Disc3 } from "lucide-react";
import DynamicIcon from "@/components/DynamicIcon";

const MusicRoom: FC = () => {
  const { currentTrackId, isPlaying, volume, playTrack, pauseTrack, resumeTrack, setVolume } =
    useGameStore();

  const currentIndex = playlist.findIndex((t) => t.id === currentTrackId);
  const currentTrack = currentIndex >= 0 ? playlist[currentIndex] : null;

  const handleSkip = (dir: 1 | -1) => {
    const idx = currentIndex < 0 ? 0 : (currentIndex + dir + playlist.length) % playlist.length;
    playTrack(playlist[idx].id);
  };

  const handlePlayPause = () => {
    if (!currentTrack) {
      playTrack(playlist[0].id);
    } else if (isPlaying) {
      pauseTrack();
    } else {
      resumeTrack();
    }
  };

  return (
    <div>
      <h2 className="font-pixel text-sm text-primary mb-6 text-center flex items-center justify-center gap-2">
        <Music size={16} /> Music Room
      </h2>

      {/* Now Playing */}
      <div className="bg-muted rounded-xl p-5 mb-5 text-center">
        <motion.div
          animate={{ rotate: isPlaying ? 360 : 0 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="text-primary mb-3 inline-block"
        >
          <Disc3 size={48} />
        </motion.div>
        <p className="font-pixel text-xs text-foreground">
          {currentTrack ? currentTrack.title : "Select a track"}
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          {currentTrack ? currentTrack.artist : "—"}
        </p>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 mb-5">
        <button
          onClick={() => handleSkip(-1)}
          className="p-2 rounded-lg bg-card hover:bg-primary hover:text-primary-foreground transition-colors pixel-border"
        >
          <SkipBack size={18} />
        </button>
        <button
          onClick={handlePlayPause}
          className="p-3 rounded-xl bg-primary text-primary-foreground hover:scale-105 active:scale-95 transition-transform pixel-border"
        >
          {isPlaying ? <Pause size={22} /> : <Play size={22} />}
        </button>
        <button
          onClick={() => handleSkip(1)}
          className="p-2 rounded-lg bg-card hover:bg-primary hover:text-primary-foreground transition-colors pixel-border"
        >
          <SkipForward size={18} />
        </button>
      </div>

      {/* Volume */}
      <div className="flex items-center gap-2 mb-5 px-4">
        <Volume2 size={14} className="text-muted-foreground" />
        <input
          type="range"
          min={0}
          max={1}
          step={0.05}
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          className="flex-1 accent-primary h-1"
        />
      </div>

      {/* Tracklist */}
      <div className="space-y-1.5 max-h-48 overflow-y-auto">
        {playlist.map((track) => (
          <motion.button
            key={track.id}
            whileTap={{ scale: 0.97 }}
            onClick={() => playTrack(track.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-left cursor-pointer
              ${track.id === currentTrackId
                ? "bg-primary/15 text-primary"
                : "hover:bg-muted text-foreground"
              }`}
          >
            <div className="text-muted-foreground">
              <DynamicIcon name={track.icon} size={18} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-body font-semibold truncate">{track.title}</p>
              <p className="text-[10px] text-muted-foreground truncate">{track.artist}</p>
            </div>
            {track.id === currentTrackId && isPlaying && (
              <div className="flex gap-0.5 items-end h-4">
                {[1, 2, 3].map((bar) => (
                  <motion.div
                    key={bar}
                    className="w-1 bg-primary rounded-full"
                    animate={{ height: [4, 12, 6, 14, 4] }}
                    transition={{ duration: 0.8, repeat: Infinity, delay: bar * 0.15 }}
                  />
                ))}
              </div>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default MusicRoom;
