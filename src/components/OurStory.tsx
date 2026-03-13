import { type FC } from "react";
import { motion } from "framer-motion";
import { milestones } from "@/data/content";
import { BookOpen } from "lucide-react";
import DynamicIcon from "@/components/DynamicIcon";

const OurStory: FC = () => {
  return (
    <div>
      <h2 className="font-pixel text-xs sm:text-sm text-primary mb-5 sm:mb-6 text-center flex items-center justify-center gap-2">
        <BookOpen size={16} /> Our Story
      </h2>
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-5 sm:left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary/30 via-primary/15 to-transparent" />

        <div className="space-y-4 sm:space-y-5">
          {milestones.map((m, i) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.12, duration: 0.35, ease: "easeOut" }}
              whileHover={{ x: 4 }}
              className="relative pl-12 sm:pl-14 group cursor-default"
            >
              {/* Timeline dot */}
              <div className="absolute left-2.5 sm:left-3 top-1 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-primary/10 text-primary
                              flex items-center justify-center
                              group-hover:scale-125 group-hover:bg-primary group-hover:text-primary-foreground
                              group-hover:shadow-md group-hover:shadow-primary/25
                              transition-all duration-300">
                <DynamicIcon name={m.icon} size={12} />
              </div>

              {/* Content card */}
              <div className="bg-muted/60 rounded-xl p-3 sm:p-4
                              group-hover:bg-card group-hover:shadow-md group-hover:shadow-foreground/5
                              transition-all duration-300">
                <span className="text-[10px] sm:text-xs text-muted-foreground font-pixel">{m.date}</span>
                <h3 className="font-body font-bold text-sm sm:text-base text-foreground mt-1 group-hover:text-primary transition-colors duration-300">
                  {m.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1 leading-relaxed">{m.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurStory;
