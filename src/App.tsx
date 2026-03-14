import { useEffect, useRef, useState, useCallback, type FC, type ReactNode } from "react";
import { AnimatePresence } from "framer-motion";
import { useGameStore } from "@/store/useGameStore";
import { playlist } from "@/data/content";
import HomeHub from "@/components/HomeHub";
import ModalOverlay from "@/components/ModalOverlay";
import OurStory from "@/components/OurStory";
import Letters from "@/components/Letters";
import ComfortZone from "@/components/ComfortZone";
import MusicRoom from "@/components/MusicRoom";
import SecretLevel from "@/components/SecretLevel";
import { AudioProgressProvider } from "@/contexts/AudioProgressContext";

const App: FC = () => {
  const { activeModal, currentTrackId, isPlaying, volume, nightMode, loop, shuffle, playTrack } = useGameStore();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [progress, setProgress] = useState({ currentTime: 0, duration: 0 });

  const seek = useCallback((time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setProgress((p) => ({ ...p, currentTime: time }));
    }
  }, []);

  // Set audio src when track changes
  useEffect(() => {
    if (!audioRef.current) return;
    const track = currentTrackId ? playlist.find((t) => t.id === currentTrackId) : null;
    audioRef.current.src = track?.src ?? "";
    setProgress({ currentTime: 0, duration: 0 });
  }, [currentTrackId]);

  // Sync progress from audio (timeupdate, loadedmetadata)
  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    const update = () => setProgress({ currentTime: el.currentTime, duration: el.duration });
    const onLoaded = () => setProgress({ currentTime: 0, duration: el.duration });
    el.addEventListener("timeupdate", update);
    el.addEventListener("loadedmetadata", onLoaded);
    el.addEventListener("durationchange", onLoaded);
    return () => {
      el.removeEventListener("timeupdate", update);
      el.removeEventListener("loadedmetadata", onLoaded);
      el.removeEventListener("durationchange", onLoaded);
    };
  }, [currentTrackId]);

  // Sync audio element with store
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying && audioRef.current.src) {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentTrackId]);

  // When track ends: repeat (loop), random next (shuffle), or sequential next
  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    const onEnded = () => {
      if (loop) {
        el.currentTime = 0;
        el.play().catch(() => {});
        return;
      }
      const idx = currentTrackId ? playlist.findIndex((t) => t.id === currentTrackId) : -1;
      let nextIdx: number;
      if (shuffle) {
        if (playlist.length <= 1) nextIdx = 0;
        else {
          let r = Math.floor(Math.random() * playlist.length);
          while (r === idx && playlist.length > 1) r = Math.floor(Math.random() * playlist.length);
          nextIdx = r;
        }
      } else {
        nextIdx = idx < 0 ? 0 : (idx + 1) % playlist.length;
      }
      playTrack(playlist[nextIdx].id);
    };
    el.addEventListener("ended", onEnded);
    return () => el.removeEventListener("ended", onEnded);
  }, [currentTrackId, loop, shuffle, playTrack]);

  const audioProgressValue = { ...progress, seek };

  const modalContent: Record<string, ReactNode> = {
    OUR_STORY: <OurStory />,
    LETTERS: <Letters />,
    COMFORT_ZONE: <ComfortZone />,
    MUSIC_ROOM: <MusicRoom />,
    SECRET: <SecretLevel />,
  };

  return (
    <AudioProgressProvider value={audioProgressValue}>
      <div className={`min-h-screen transition-colors duration-700 ${nightMode ? "night-mode" : ""}`}>
        {/* Global audio element */}
        <audio ref={audioRef} />

        <HomeHub />

        <AnimatePresence>
          {activeModal && (
            <ModalOverlay key={activeModal}>
              {modalContent[activeModal]}
            </ModalOverlay>
          )}
        </AnimatePresence>
      </div>
    </AudioProgressProvider>
  );
};

export default App;
