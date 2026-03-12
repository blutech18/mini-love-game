import { useEffect, useRef, useState, type FC, type ReactNode } from "react";
import { AnimatePresence } from "framer-motion";
import { useGameStore } from "@/store/useGameStore";
import HomeHub from "@/components/HomeHub";
import ModalOverlay from "@/components/ModalOverlay";
import OurStory from "@/components/OurStory";
import Letters from "@/components/Letters";
import ComfortZone from "@/components/ComfortZone";
import MusicRoom from "@/components/MusicRoom";
import SecretLevel from "@/components/SecretLevel";

const App: FC = () => {
  const { activeModal, currentTrackId, isPlaying, volume, nightMode } = useGameStore();
  const audioRef = useRef<HTMLAudioElement>(null);

  // Sync audio element with store
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentTrackId]);

  const modalContent: Record<string, ReactNode> = {
    OUR_STORY: <OurStory />,
    LETTERS: <Letters />,
    COMFORT_ZONE: <ComfortZone />,
    MUSIC_ROOM: <MusicRoom />,
    SECRET: <SecretLevel />,
  };

  return (
    <div className={`min-h-screen transition-colors duration-700 ${nightMode ? "night-mode" : ""}`}>
      {/* Global audio element */}
      <audio ref={audioRef} loop />

      <HomeHub />

      <AnimatePresence>
        {activeModal && (
          <ModalOverlay key={activeModal}>
            {modalContent[activeModal]}
          </ModalOverlay>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
