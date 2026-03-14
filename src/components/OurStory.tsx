import { type FC } from "react";
import { motion } from "framer-motion";
import { milestones } from "@/data/content";
import { BookOpen } from "lucide-react";
import DynamicIcon from "@/components/DynamicIcon";

const OurStory: FC = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-none mb-6 sm:mb-10 lg:mb-12">
        <h2 className="font-pixel text-sm sm:text-base lg:text-lg text-primary text-center flex items-center justify-center gap-3">
          <BookOpen strokeWidth={2.5} size={18} className="sm:w-5 sm:h-5" /> Our Story
        </h2>
        <p className="text-xs sm:text-sm lg:text-base tracking-wide text-muted-foreground font-body text-center mt-2.5 sm:mt-3">
          The Start of Us
        </p>
      </div>

      {/* Wrapping the timeline in a flex container that can constrain max height if needed, though scroll usually handles it. */}
      {/* We apply pl-2 to give a very slight visual breathing room if it bumps into margins */}
      <div className="flex-1 relative pl-1 sm:pl-2 overflow-y-auto custom-scrollbar pr-2">
        {/* Timeline Items */}
        <div className="flex flex-col gap-6 sm:gap-8 lg:gap-10 pb-4">
          {milestones.map((m, i) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.12, duration: 0.4, ease: "easeOut" }}
              className="flex gap-4 sm:gap-6 lg:gap-8 group"
            >
              {/* Left Column: Icon + Timeline String */}
              <div className="relative flex flex-col items-center flex-none w-8 sm:w-10">
                {/* Timeline Line (starts below the icon) */}
                {i < milestones.length - 1 && (
                  <div className="absolute top-[34px] sm:top-[42px] bottom-[-24px] sm:bottom-[-32px] lg:bottom-[-40px] w-px bg-gradient-to-b from-primary/30 to-primary/10 transition-colors duration-500 group-hover:from-primary/50 group-hover:to-primary/20" />
                )}

                {/* Timeline Dot/Icon */}
                <div className="relative z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-background border-2 border-primary/20 text-primary
                                flex items-center justify-center shrink-0
                                group-hover:border-primary group-hover:bg-primary/10 group-hover:text-primary
                                group-hover:shadow-[0_0_15px_rgba(var(--primary),0.3)]
                                transition-all duration-300 ease-out">
                  <DynamicIcon name={m.icon} size={14} className="sm:w-4 sm:h-4 lg:w-5 lg:h-5 transition-transform duration-300 group-hover:scale-110" />
                </div>
              </div>

              {/* Right Column: Content Card */}
              <div className="flex-1 bg-card/60 backdrop-blur-sm rounded-2xl p-5 sm:p-6 lg:p-7
                              border border-border/40 shadow-sm
                              group-hover:bg-card group-hover:border-primary/30 group-hover:shadow-md group-hover:shadow-primary/5
                              transition-all duration-300 ease-out pt-1.5 sm:pt-2">
                <div className="flex flex-col gap-1.5 sm:gap-2">
                  {/* Date (Premium tiny label) */}
                  <span className="text-[10px] sm:text-[11px] lg:text-xs font-pixel uppercase tracking-widest text-primary/80">
                    {m.date}
                  </span>
                </div>

                {/* Image (if exists) */}
                {m.imageUrl && (
                  <div className="mt-4 sm:mt-5 rounded-xl overflow-hidden border border-border/50 shadow-sm group-hover:shadow-md transition-shadow duration-300">
                    <img
                      src={m.imageUrl}
                      alt={m.title}
                      className="w-full h-auto max-h-[200px] sm:max-h-[280px] object-cover bg-muted/30 transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  </div>
                )}

                {/* Description */}
                <p className="text-sm sm:text-base lg:text-[17px] text-muted-foreground mt-3 sm:mt-4 leading-relaxed lg:leading-loose">
                  {m.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurStory;
