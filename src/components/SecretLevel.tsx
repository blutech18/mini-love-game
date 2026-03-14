import { type FC } from "react";
import { motion } from "framer-motion";
import { secretMessage } from "@/data/content";
import { Gift, Sparkles, Star, Zap, Heart } from "lucide-react";

const celebrationIcons = [Heart, Sparkles, Star, Zap, Heart];

const SecretLevel: FC = () => {
  return (
    <div className="flex flex-col h-full text-center">
      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 flex flex-col justify-center">
        <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", damping: 10, stiffness: 100 }}
        className="text-primary mb-4 flex justify-center"
      >
        <Gift size={48} />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="font-pixel text-xs sm:text-sm text-primary mb-4"
      >
        {secretMessage.title}
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, type: "spring" }}
        className="bg-muted/70 rounded-2xl p-5 sm:p-6 glow-warm"
      >
        <p className="text-sm sm:text-base text-foreground font-body leading-relaxed">
          {secretMessage.message}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-6 flex justify-center gap-3"
      >
        {celebrationIcons.map((Icon, i) => (
          <motion.div
            key={i}
            className="text-primary"
            animate={{ y: [0, -10, 0], scale: [1, 1.15, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
          >
            <Icon size={20} />
          </motion.div>
        ))}
        </motion.div>
      </div>
    </div>
  );
};

export default SecretLevel;
