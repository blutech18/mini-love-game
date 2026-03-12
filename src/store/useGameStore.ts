import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ModalType } from "@/data/content";

interface AudioState {
  currentTrackId: number | null;
  isPlaying: boolean;
  volume: number;
}

interface GameState extends AudioState {
  activeModal: ModalType;
  isSecretUnlocked: boolean;
  secretClickSequence: string[];
  nightMode: boolean;

  // Audio actions
  playTrack: (trackId: number) => void;
  pauseTrack: () => void;
  resumeTrack: () => void;
  setVolume: (volume: number) => void;
  stopAudio: () => void;

  // UI actions
  openModal: (modal: ModalType) => void;
  closeModal: () => void;

  // Secret actions
  addSecretClick: (buttonId: string) => void;
  unlockSecret: () => void;

  // Comfort zone
  setNightMode: (on: boolean) => void;
}

const SECRET_SEQUENCE = ["OUR_STORY", "LETTERS", "MUSIC_ROOM", "LETTERS"];

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      // Audio
      currentTrackId: null,
      isPlaying: false,
      volume: 0.7,

      // UI
      activeModal: null,
      isSecretUnlocked: false,
      secretClickSequence: [],
      nightMode: false,

      playTrack: (trackId) =>
        set({ currentTrackId: trackId, isPlaying: true }),

      pauseTrack: () => set({ isPlaying: false }),

      resumeTrack: () => set({ isPlaying: true }),

      setVolume: (volume) => set({ volume }),

      stopAudio: () =>
        set({ currentTrackId: null, isPlaying: false }),

      openModal: (modal) => set({ activeModal: modal }),

      closeModal: () => {
        const { nightMode } = get();
        set({ activeModal: null, nightMode: false });
      },

      addSecretClick: (buttonId) => {
        const { secretClickSequence, isSecretUnlocked } = get();
        if (isSecretUnlocked) return;

        const newSeq = [...secretClickSequence, buttonId].slice(-SECRET_SEQUENCE.length);
        const unlocked =
          newSeq.length === SECRET_SEQUENCE.length &&
          newSeq.every((v, i) => v === SECRET_SEQUENCE[i]);

        set({
          secretClickSequence: newSeq,
          isSecretUnlocked: unlocked || isSecretUnlocked,
        });
      },

      unlockSecret: () => set({ isSecretUnlocked: true }),

      setNightMode: (on) => set({ nightMode: on }),
    }),
    {
      name: "cozy-hub-store",
      partialize: (state) => ({
        isSecretUnlocked: state.isSecretUnlocked,
        volume: state.volume,
      }),
    }
  )
);
