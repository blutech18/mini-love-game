import { createContext, useContext, type FC, type ReactNode } from "react";

export interface AudioProgressValue {
  currentTime: number;
  duration: number;
  seek: (time: number) => void;
}

const AudioProgressContext = createContext<AudioProgressValue | null>(null);

export const useAudioProgress = (): AudioProgressValue | null =>
  useContext(AudioProgressContext);

export const AudioProgressProvider: FC<{
  value: AudioProgressValue;
  children: ReactNode;
}> = ({ value, children }) => (
  <AudioProgressContext.Provider value={value}>
    {children}
  </AudioProgressContext.Provider>
);
