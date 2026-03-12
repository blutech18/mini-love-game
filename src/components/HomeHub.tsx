import { type FC, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useGameStore } from "@/store/useGameStore";
import { menuItems, RECIPIENT_NAME, type ModalType } from "@/data/content";

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
    <span>
      {displayed}
      {!done && <span className="cursor-blink" />}
    </span>
  );
};

const GameButton: FC<{
  item: (typeof menuItems)[number];
  index: number;
  onClick: () => void;
}> = ({ item, index, onClick }) => (
  <motion.button
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1.2 + index * 0.15, type: "spring", stiffness: 200 }}
    onClick={onClick}
    className="group flex flex-col items-center gap-3 p-6 rounded-xl bg-card pixel-border
               hover:scale-105 active:pixel-border-active active:scale-100
               transition-all duration-150 cursor-pointer"
  >
    <span className="text-4xl group-hover:animate-float">{item.emoji}</span>
    <span className="font-pixel text-xs text-foreground leading-relaxed">{item.label}</span>
    <span className="text-xs text-muted-foreground font-body">{item.description}</span>
  </motion.button>
);

const HomeHub: FC = () => {
  const { openModal, addSecretClick, isSecretUnlocked } = useGameStore();

  const handleButtonClick = (id: string) => {
    addSecretClick(id);
    openModal(id as ModalType);
  };

  const welcomeText = `Hi ${RECIPIENT_NAME}, Welcome to your personalized hub... 💖`;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl opacity-20"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
            style={{
              left: `${15 + i * 15}%`,
              top: `${10 + (i % 3) * 30}%`,
            }}
          >
            {["✨", "💫", "🌸", "💖", "⭐", "🦋"][i]}
          </motion.div>
        ))}
      </div>

      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12 max-w-md"
      >
        <h1 className="font-pixel text-lg sm:text-xl text-primary mb-6 leading-relaxed">
          <TypewriterText text={welcomeText} speed={50} />
        </h1>
        <p className="text-muted-foreground font-body text-sm">
          Choose a room to explore ↓
        </p>
      </motion.div>

      {/* Navigation Grid */}
      <div className="grid grid-cols-2 gap-4 sm:gap-6 w-full max-w-md">
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
    </div>
  );
};

const AnimatedSecretButton: FC = () => {
  const { isSecretUnlocked, openModal } = useGameStore();

  if (!isSecretUnlocked) {
    // Hidden pixel - barely visible
    return (
      <button
        onClick={() => useGameStore.getState().unlockSecret()}
        className="mt-8 w-2 h-2 rounded-full bg-muted-foreground/10 hover:bg-primary/50 transition-colors cursor-default"
        title=""
      />
    );
  }

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", damping: 15 }}
      onClick={() => openModal("SECRET")}
      className="mt-8 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-pixel text-xs
                 pixel-border glow-warm hover:scale-105 active:pixel-border-active
                 transition-all duration-150 animate-float"
    >
      🔮 Secret Level
    </motion.button>
  );
};

export default HomeHub;
