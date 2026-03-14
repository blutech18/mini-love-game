import { type FC } from "react";
import { motion } from "framer-motion";
import { playlist } from "@/data/content";
import { useGameStore } from "@/store/useGameStore";
import { useAudioProgress } from "@/contexts/AudioProgressContext";
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Music, Disc3 } from "lucide-react";
import DynamicIcon from "@/components/DynamicIcon";

const formatTime = (seconds: number) => {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
};

const MusicRoom: FC = () => {
  const { currentTrackId, isPlaying, volume, playTrack, pauseTrack, resumeTrack, setVolume } =
    useGameStore();
  const audioProgress = useAudioProgress();

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
    <div className="flex flex-col h-full">
      <h2 className="font-pixel text-xs sm:text-sm text-primary mb-5 sm:mb-6 text-center flex items-center justify-center gap-2 shrink-0">
        <Music size={16} /> Music Room
      </h2>

      {/* Now Playing Card */}
      <div className="bg-gradient-to-br from-muted to-muted/60 rounded-2xl py-8 sm:py-10 px-5 sm:px-6 mb-5 text-center relative overflow-hidden shrink-0 min-h-[200px] sm:min-h-[220px] flex flex-col items-center justify-center">
        {/* Decorative ring */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
          <div className="w-40 h-40 rounded-full border-[3px] border-primary" />
        </div>

        <motion.div
          animate={{ rotate: isPlaying ? 360 : 0 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="text-primary mb-4 inline-block"
        >
          <Disc3 size={44} />
        </motion.div>
        <p className="font-pixel text-[10px] sm:text-xs text-foreground">
          {currentTrack ? currentTrack.title : "Select a track"}
        </p>
        <p className="text-[10px] sm:text-xs text-muted-foreground mt-1.5 font-body">
          {currentTrack ? currentTrack.artist : "—"}
        </p>
      </div>

      {/* Progress / Seek bar */}
      {audioProgress && currentTrack && (
        <div className="mb-5 shrink-0 px-2 sm:px-4">
          <input
            type="range"
            min={0}
            max={audioProgress.duration || 100}
            step={0.1}
            value={audioProgress.currentTime}
            onChange={(e) => audioProgress.seek(Number(e.target.value))}
            className="w-full h-1.5 accent-primary cursor-pointer appearance-none bg-muted rounded-full [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-sm"
          />
          <div className="flex justify-between mt-1 text-[10px] text-muted-foreground font-body">
            <span>{formatTime(audioProgress.currentTime)}</span>
            <span>{formatTime(audioProgress.duration)}</span>
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="flex items-center justify-center gap-3 sm:gap-4 mb-5 shrink-0">
        <button
          onClick={() => handleSkip(-1)}
          className="p-2 sm:p-2.5 rounded-xl bg-card hover:bg-primary hover:text-primary-foreground
                     transition-all duration-200 active:scale-90 hover:scale-105"
        >
          <SkipBack size={16} />
        </button>
        <button
          onClick={handlePlayPause}
          className="p-3 sm:p-3.5 rounded-2xl bg-primary text-primary-foreground
                     hover:scale-108 active:scale-95 transition-all duration-200
                     shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30"
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>
        <button
          onClick={() => handleSkip(1)}
          className="p-2 sm:p-2.5 rounded-xl bg-card hover:bg-primary hover:text-primary-foreground
                     transition-all duration-200 active:scale-90 hover:scale-105"
        >
          <SkipForward size={16} />
        </button>
      </div>

      {/* Volume */}
      <div className="flex items-center gap-2.5 mb-5 px-2 sm:px-4 shrink-0">
        <button onClick={() => setVolume(volume > 0 ? 0 : 0.7)} className="text-muted-foreground hover:text-primary transition-colors">
          {volume === 0 ? <VolumeX size={14} /> : <Volume2 size={14} />}
        </button>
        <input
          type="range"
          min={0}
          max={1}
          step={0.05}
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          className="flex-1 accent-primary h-1 cursor-pointer"
        />
        <span className="text-[10px] text-muted-foreground font-body w-7 text-right">{Math.round(volume * 100)}%</span>
      </div>

      {/* Tracklist */}
      <div className="space-y-1 flex-1 min-h-0 overflow-y-auto custom-scrollbar pr-2">
        {playlist.map((track, i) => (
          <motion.button
            key={track.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => playTrack(track.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 text-left cursor-pointer
              ${track.id === currentTrackId
                ? "bg-primary/12 text-primary shadow-sm"
                : "hover:bg-muted/80 text-foreground"
              }`}
          >
            <div className={`transition-colors ${track.id === currentTrackId ? "text-primary" : "text-muted-foreground"}`}>
              <DynamicIcon name={track.icon} size={16} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-body font-semibold truncate">{track.title}</p>
              <p className="text-[10px] text-muted-foreground truncate">{track.artist}</p>
            </div>
            {track.id === currentTrackId && isPlaying && (
              <div className="flex gap-[3px] items-end h-4">
                {[1, 2, 3].map((bar) => (
                  <motion.div
                    key={bar}
                    className="w-[3px] bg-primary rounded-full"
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
