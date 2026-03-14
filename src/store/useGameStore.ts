import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ModalType } from "@/data/content";

interface AudioState {
  currentTrackId: number | null;
  isPlaying: boolean;
  volume: number;
  loop: boolean;
  shuffle: boolean;
}

interface GameState extends AudioState {
  activeModal: ModalType;
  previousModal: ModalType;
  isSecretUnlocked: boolean;
  secretClickSequence: string[];
  nightMode: boolean;
  isModalTransitioning: boolean;

  // Audio actions
  playTrack: (trackId: number) => void;
  pauseTrack: () => void;
  resumeTrack: () => void;
  togglePlayPause: () => void;
  setVolume: (volume: number) => void;
  setLoop: (loop: boolean) => void;
  setShuffle: (shuffle: boolean) => void;
  stopAudio: () => void;

  // UI actions
  openModal: (modal: ModalType) => void;
  closeModal: () => void;
  goBack: () => void;

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
      loop: false,
      shuffle: false,

      // UI
      activeModal: null,
      previousModal: null,
      isSecretUnlocked: false,
      secretClickSequence: [],
      nightMode: false,
      isModalTransitioning: false,

      playTrack: (trackId) => {
        const { currentTrackId } = get();
        if (currentTrackId === trackId) {
          set({ isPlaying: true });
        } else {
          set({ currentTrackId: trackId, isPlaying: true });
        }
      },

      pauseTrack: () => set({ isPlaying: false }),

      resumeTrack: () => set({ isPlaying: true }),

      togglePlayPause: () => {
        const { isPlaying, currentTrackId } = get();
        if (!currentTrackId) return;
        set({ isPlaying: !isPlaying });
      },

      setVolume: (volume) => set({ volume: Math.max(0, Math.min(1, volume)) }),

      setLoop: (loop) => set({ loop }),

      setShuffle: (shuffle) => set({ shuffle }),

      stopAudio: () => set({ currentTrackId: null, isPlaying: false }),

      openModal: (modal) => {
        const { activeModal } = get();
        set({
          previousModal: activeModal,
          activeModal: modal,
          isModalTransitioning: true,
        });
        // Clear transition flag after animation
        setTimeout(() => set({ isModalTransitioning: false }), 350);
      },

      closeModal: () => {
        set({ isModalTransitioning: true });
        setTimeout(() => {
          set({
            activeModal: null,
            previousModal: null,
            nightMode: false,
            isModalTransitioning: false,
          });
        }, 50);
      },

      goBack: () => {
        const { previousModal } = get();
        if (previousModal) {
          set({ activeModal: previousModal, previousModal: null });
        } else {
          get().closeModal();
        }
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
