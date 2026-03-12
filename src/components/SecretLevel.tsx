import { type FC } from "react";
import { motion } from "framer-motion";
import { secretMessage } from "@/data/content";
import { Gift, Sparkles, Star, Zap, Heart } from "lucide-react";

const celebrationIcons = [Heart, Sparkles, Star, Zap, Heart];

const SecretLevel: FC = () => {
  return (
    <div className="text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", damping: 10 }}
        className="text-primary mb-4 flex justify-center"
      >
        <Gift size={56} />
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
        className="mt-6 flex justify-center gap-3"
      >
        {celebrationIcons.map((Icon, i) => (
          <motion.div
            key={i}
            className="text-primary"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
          >
            <Icon size={22} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default SecretLevel;
