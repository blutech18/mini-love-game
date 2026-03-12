import { type FC, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { comfortScenarios, type ComfortScenario } from "@/data/content";
import { useGameStore } from "@/store/useGameStore";

const ComfortZone: FC = () => {
  const [activeScenario, setActiveScenario] = useState<ComfortScenario | null>(null);
  const { playTrack, setNightMode } = useGameStore();

  const handleScenario = (scenario: ComfortScenario) => {
    setActiveScenario(scenario);
    if (scenario.trackId) playTrack(scenario.trackId);
    if (scenario.id === "sleep") setNightMode(true);
  };

  const colorMap: Record<string, string> = {
    sad: "bg-comfort-sad text-primary-foreground",
    sleep: "bg-comfort-sleep text-primary-foreground",
    "bad-day": "bg-comfort-bad text-accent-foreground",
  };

  return (
    <div>
      <h2 className="font-pixel text-sm text-primary mb-6 text-center">🫂 Comfort Zone</h2>

      <AnimatePresence mode="wait">
        {!activeScenario ? (
          <motion.div
            key="buttons"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-3"
          >
            <p className="text-sm text-muted-foreground text-center mb-4 font-body">
              Hey, I'm here for you. What do you need right now?
            </p>
            {comfortScenarios.map((s, i) => (
              <motion.button
                key={s.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => handleScenario(s)}
                className={`w-full p-4 rounded-xl ${colorMap[s.id]} pixel-border
                           hover:scale-[1.02] active:pixel-border-active transition-all
                           flex items-center gap-3 cursor-pointer`}
              >
                <span className="text-2xl">{s.emoji}</span>
                <span className="font-pixel text-xs">{s.title}</span>
              </motion.button>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="message"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-center"
          >
            <button
              onClick={() => {
                setActiveScenario(null);
                setNightMode(false);
              }}
              className="mb-4 text-xs text-muted-foreground hover:text-primary font-pixel transition-colors"
            >
              ← Back
            </button>
            <div className="text-5xl mb-4">{activeScenario.emoji}</div>
            <p className="text-foreground font-body leading-relaxed mb-4">
              {activeScenario.message}
            </p>
            <p className="text-sm text-muted-foreground font-body italic">
              {activeScenario.submessage}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ComfortZone;
