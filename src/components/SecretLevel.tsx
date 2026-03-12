import { type FC } from "react";
import { motion } from "framer-motion";
import { secretMessage } from "@/data/content";

const SecretLevel: FC = () => {
  return (
    <div className="text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", damping: 10 }}
        className="text-6xl mb-4"
      >
        🎉
      </motion.div>

      <h2 className="font-pixel text-sm text-primary mb-4">{secretMessage.title}</h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-muted rounded-xl p-6 glow-warm"
      >
        <p className="text-sm text-foreground font-body leading-relaxed">
          {secretMessage.message}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-6 flex justify-center gap-2"
      >
        {["💖", "✨", "🌟", "💫", "🦋"].map((emoji, i) => (
          <motion.span
            key={i}
            className="text-2xl"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
          >
            {emoji}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
};

export default SecretLevel;
