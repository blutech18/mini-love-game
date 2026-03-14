import { type FC } from "react";
import { motion } from "framer-motion";
import { playlist } from "@/data/content";
import { useGameStore } from "@/store/useGameStore";
import { useAudioProgress } from "@/contexts/AudioProgressContext";
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Music, Disc3, Repeat, Shuffle } from "lucide-react";
import DynamicIcon from "@/components/DynamicIcon";

const formatTime = (seconds: number) => {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
};

const MusicRoom: FC = () => {
  const { currentTrackId, isPlaying, volume, loop, shuffle, playTrack, pauseTrack, resumeTrack, setVolume, setLoop, setShuffle } =
    useGameStore();
  const audioProgress = useAudioProgress();

  const currentIndex = playlist.findIndex((t) => t.id === currentTrackId);
  const currentTrack = currentIndex >= 0 ? playlist[currentIndex] : null;

  const progressPercent =
    audioProgress && audioProgress.duration && audioProgress.duration > 0
      ? Math.min((audioProgress.currentTime / audioProgress.duration) * 100, 100)
      : 0;

  const handleSkip = (dir: 1 | -1) => {
    if (playlist.length === 0) return;
    const idx = currentIndex < 0 ? 0 : currentIndex;

    let nextIdx: number;
    if (shuffle) {
      if (playlist.length === 1) {
        nextIdx = 0;
      } else {
        let r = Math.floor(Math.random() * playlist.length);
        while (r === idx) r = Math.floor(Math.random() * playlist.length);
        nextIdx = r;
      }
    } else {
      nextIdx = (idx + dir + playlist.length) % playlist.length;
    }

    playTrack(playlist[nextIdx].id);
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

  const cyclePlayMode = () => {
    // Order: no loop/shuffle -> loop -> shuffle -> back to none
    if (!loop && !shuffle) {
      setLoop(true);
      setShuffle(false);
    } else if (loop && !shuffle) {
      setLoop(false);
      setShuffle(true);
    } else {
      setLoop(false);
      setShuffle(false);
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
      {audioProgress && (
        <div className="mb-5 shrink-0 px-2 sm:px-4">
          <input
            type="range"
            min={0}
            max={audioProgress.duration && audioProgress.duration > 0 ? audioProgress.duration : 1}
            step={0.1}
            value={
              Math.min(
                audioProgress.currentTime,
                audioProgress.duration && audioProgress.duration > 0 ? audioProgress.duration : 1
              )
            }
            onChange={(e) => audioProgress.seek(Number(e.target.value))}
            disabled={!currentTrack}
            className={`w-full h-1.5 accent-primary cursor-pointer appearance-none rounded-full
                       [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3
                       [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:cursor-pointer
                       [&::-webkit-slider-thumb]:shadow-sm ${currentTrack ? "" : "opacity-50 cursor-default"}`}
            style={{
              background: `linear-gradient(to right, hsl(var(--primary)) ${progressPercent}%, hsl(var(--muted)) ${progressPercent}%)`,
            }}
          />
          <div className="flex justify-between mt-1 text-[10px] text-muted-foreground font-body">
            <span>{formatTime(audioProgress.currentTime)}</span>
            <span>{formatTime(audioProgress.duration)}</span>
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="relative flex items-center justify-center mb-5 shrink-0">
        <div className="flex items-center justify-center gap-2 sm:gap-3">
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
        <button
          onClick={cyclePlayMode}
          className="absolute right-0 sm:right-2 p-1.5 sm:p-2 transition-transform duration-200 active:scale-90 hover:scale-105 text-muted-foreground hover:text-primary"
          title={
            loop ? "Loop current track" : shuffle ? "Shuffle (random next track)" : "No loop / sequential"
          }
        >
          {shuffle ? (
            <Shuffle size={16} />
          ) : (
            <>
              <Repeat size={16} />
              {!loop && (
                <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <span className="block w-3.5 sm:w-4 h-px bg-muted-foreground/80 rotate-45" />
                </span>
              )}
            </>
          )}
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
