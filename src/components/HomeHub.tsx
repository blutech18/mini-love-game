import { type FC, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useGameStore } from "@/store/useGameStore";
import { menuItems, type ModalType } from "@/data/content";
import DynamicIcon from "@/components/DynamicIcon";
import { Sparkles, Star, Flower2, Heart, Zap, Feather, Gem } from "lucide-react";

const floatingIcons = [Sparkles, Star, Flower2, Heart, Zap, Feather];

const TypewriterText: FC<{ text: string; speed?: number }> = ({ text, speed = 60 }) => {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed("");
    setDone(false);
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(timer);
        setDone(true);
      }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);

  return (
    <span className="grid">
      <span className="invisible col-start-1 row-start-1" aria-hidden="true">
        {text}
      </span>
      <span className="col-start-1 row-start-1">
        {displayed}
        {!done && <span className="cursor-blink" />}
      </span>
    </span>
  );
};

const iconColors = [
  "text-primary/30",
  "text-secondary/30",
  "text-accent/30",
  "text-primary/20",
  "text-secondary/20",
  "text-accent/20",
];

const GameButton: FC<{
  item: (typeof menuItems)[number];
  index: number;
  onClick: () => void;
}> = ({ item, index, onClick }) => (
  <motion.button
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1.2 + index * 0.12, type: "spring", stiffness: 180, damping: 18 }}
    whileHover={{ scale: 1.05, y: -6 }}
    whileTap={{ scale: 0.96 }}
    onClick={onClick}
    className="group relative flex flex-col items-center gap-2 sm:gap-3 p-4 sm:p-5 md:p-6 rounded-2xl bg-card
               pixel-border hover-lift
               cursor-pointer overflow-hidden"
  >
    {/* Hover gradient overlay */}
    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/0 via-transparent to-accent/0
                    group-hover:from-primary/8 group-hover:to-accent/8
                    transition-all duration-500" />

    {/* Icon */}
    <div className="relative z-10 p-2.5 sm:p-3 rounded-xl bg-muted/60 group-hover:bg-primary/15
                    transition-all duration-300 group-hover:scale-110">
      <div className="text-muted-foreground group-hover:text-primary transition-colors duration-300">
        <DynamicIcon name={item.icon} size={28} />
      </div>
    </div>

    {/* Label */}
    <span className="font-pixel text-[10px] sm:text-xs text-foreground leading-relaxed relative z-10
                     group-hover:text-primary transition-colors duration-300">
      {item.label}
    </span>

    {/* Description */}
    <span className="text-[10px] sm:text-xs text-muted-foreground font-body relative z-10 leading-tight text-center">
      {item.description}
    </span>
  </motion.button>
);

const HomeHub: FC = () => {
  const { openModal, addSecretClick } = useGameStore();

  const handleButtonClick = (id: string) => {
    addSecretClick(id);
    openModal(id as ModalType);
  };

  const welcomeText = "Hi babi, welcome to our little space on the internet…";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-8 sm:py-12 relative overflow-hidden">
      {/* Background floating icons */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {floatingIcons.map((Icon, i) => (
          <motion.div
            key={i}
            className={`absolute ${iconColors[i]}`}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.15, 0.35, 0.15],
              y: [0, -25, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 4 + i * 0.8,
              repeat: Infinity,
              delay: i * 0.7,
              ease: "easeInOut",
            }}
            style={{
              left: `${12 + i * 14}%`,
              top: `${8 + (i % 3) * 30}%`,
            }}
          >
            <Icon size={18 + (i % 3) * 4} />
          </motion.div>
        ))}
      </div>

      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="text-center mb-8 sm:mb-12 max-w-xs sm:max-w-sm md:max-w-md"
      >
        <h1 className="font-pixel text-xs sm:text-sm md:text-base text-primary mb-4 sm:mb-6 leading-[2] sm:leading-[2.2]">
          <TypewriterText text={welcomeText} speed={50} />
        </h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 0.8 }}
          className="text-muted-foreground font-body text-sm sm:text-base"
        >
          Choose a room to explore
        </motion.p>
      </motion.div>

      {/* Navigation Grid */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-5 w-full max-w-[280px] sm:max-w-sm md:max-w-md">
        {menuItems.map((item, i) => (
          <GameButton
            key={item.id}
            item={item}
            index={i}
            onClick={() => handleButtonClick(item.id)}
          />
        ))}
      </div>

      {/* Secret Level Button */}
      <AnimatedSecretButton />

      {/* Now playing indicator */}
      <NowPlayingIndicator />
    </div>
  );
};

const NowPlayingIndicator: FC = () => {
  const { isPlaying, currentTrackId } = useGameStore();

  if (!isPlaying || !currentTrackId) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 px-4 py-2 rounded-full glass
                 flex items-center gap-2 text-xs text-muted-foreground font-body
                 shadow-lg shadow-foreground/5"
    >
      <div className="flex gap-0.5 items-end h-3">
        {[1, 2, 3].map((bar) => (
          <motion.div
            key={bar}
            className="w-0.5 bg-primary rounded-full"
            animate={{ height: [3, 10, 5, 12, 3] }}
            transition={{ duration: 0.8, repeat: Infinity, delay: bar * 0.12 }}
          />
        ))}
      </div>
      <span>Now playing</span>
    </motion.div>
  );
};

const AnimatedSecretButton: FC = () => {
  const { isSecretUnlocked, openModal } = useGameStore();

  if (!isSecretUnlocked) {
    return (
      <button
        onClick={() => useGameStore.getState().unlockSecret()}
        className="mt-8 w-2 h-2 rounded-full bg-muted-foreground/10 hover:bg-primary/50 transition-colors duration-500 cursor-default"
        title=""
      />
    );
  }

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", damping: 12 }}
      onClick={() => openModal("SECRET")}
      className="mt-8 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-primary text-primary-foreground font-pixel text-[10px] sm:text-xs
                 glow-primary hover:scale-105 active:scale-95
                 transition-all duration-200 animate-float flex items-center gap-2"
    >
      <Gem size={14} /> Secret Level
    </motion.button>
  );
};

export default HomeHub;
