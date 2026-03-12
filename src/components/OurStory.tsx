import { type FC } from "react";
import { motion } from "framer-motion";
import { milestones } from "@/data/content";

const OurStory: FC = () => {
  return (
    <div>
      <h2 className="font-pixel text-sm text-primary mb-6 text-center">📖 Our Story</h2>
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />

        <div className="space-y-6">
          {milestones.map((m, i) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.15 }}
              className="relative pl-14"
            >
              {/* Timeline dot */}
              <div className="absolute left-4 top-1 w-5 h-5 rounded-full bg-primary flex items-center justify-center text-xs">
                {m.emoji}
              </div>

              <div className="bg-muted rounded-lg p-4">
                <span className="text-xs text-muted-foreground font-pixel">{m.date}</span>
                <h3 className="font-body font-bold text-foreground mt-1">{m.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{m.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurStory;
