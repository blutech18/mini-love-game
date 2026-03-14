import { type FC, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { comfortScenarios, type ComfortScenario } from "@/data/content";
import { useGameStore } from "@/store/useGameStore";
import { HeartHandshake, ArrowLeft } from "lucide-react";
import DynamicIcon from "@/components/DynamicIcon";

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
    <div className="flex flex-col h-full">
      <div className="relative flex items-center justify-center mb-5 sm:mb-6 shrink-0 min-h-[2rem]">
        <AnimatePresence>
          {activeScenario && (
            <motion.button
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              onClick={() => {
                setActiveScenario(null);
                setNightMode(false);
              }}
              className="absolute left-0 text-xs text-muted-foreground hover:text-primary font-body font-semibold transition-all flex items-center gap-1.5
                         hover:-translate-x-0.5 duration-200 z-10"
            >
              <ArrowLeft size={14} /> <span>Back</span>
            </motion.button>
          )}
        </AnimatePresence>
        <h2 className="font-pixel text-xs sm:text-sm text-primary flex items-center gap-2">
          <HeartHandshake size={16} /> Comfort Zone
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
        <AnimatePresence mode="wait">
          {activeScenario ? (
            <motion.div
              key="message"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.15, type: "spring" }}
                className="text-primary mb-4 flex justify-center"
              >
                <DynamicIcon name={activeScenario.icon} size={44} />
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-foreground font-body leading-relaxed mb-4 text-sm sm:text-base"
              >
                {activeScenario.message}
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-xs sm:text-sm text-muted-foreground font-body italic"
              >
                {activeScenario.submessage}
              </motion.p>
            </motion.div>
          ) : (
            <motion.div
              key="buttons"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="space-y-2.5 sm:space-y-3"
            >
              <p className="text-sm text-muted-foreground text-center mb-4 sm:mb-5 font-body leading-relaxed">
                Hey, I'm here for you. What do you need right now?
              </p>
              {comfortScenarios.map((s, i) => (
                <motion.button
                  key={s.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.3 }}
                  whileHover={{ scale: 1.02, x: 6 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleScenario(s)}
                  className={`group w-full p-4 rounded-xl ${colorMap[s.id]}
                             hover:shadow-lg transition-all duration-300
                             flex items-center gap-3 cursor-pointer active:scale-[0.98]`}
                >
                  <div className="p-2 rounded-lg bg-background/15 group-hover:scale-110 transition-transform duration-300">
                    <DynamicIcon name={s.icon} size={22} />
                  </div>
                  <span className="font-pixel text-[10px] sm:text-xs group-hover:tracking-wider transition-all duration-300">
                    {s.title}
                  </span>
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ComfortZone;
