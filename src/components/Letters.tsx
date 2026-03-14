import { type FC, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { letters, type Letter } from "@/data/content";
import { ArrowLeft, Mail } from "lucide-react";
import DynamicIcon from "@/components/DynamicIcon";

const TypewriterBody: FC<{ text: string }> = ({ text }) => {
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
    }, 20);
    return () => clearInterval(timer);
  }, [text]);

  return (
    <div className="grid">
      <p className="invisible col-start-1 row-start-1 text-sm sm:text-base leading-relaxed font-body whitespace-pre-wrap" aria-hidden="true">
        {text}
      </p>
      <p className="col-start-1 row-start-1 text-sm sm:text-base text-foreground leading-relaxed font-body whitespace-pre-wrap">
        {displayed}
        {!done && <span className="cursor-blink" />}
      </p>
    </div>
  );
};

const letterColors = [
  "bg-comfort-sad text-primary-foreground",
  "bg-comfort-sleep text-primary-foreground",
  "bg-comfort-bad text-accent-foreground",
  "bg-letter-warm text-primary-foreground",
  "bg-letter-soft text-primary-foreground",
];

const Letters: FC = () => {
  const [selectedLetter, setSelectedLetter] = useState<Letter | null>(null);

  return (
    <div className="flex flex-col min-h-0 flex-1 h-full">
      <div className="relative flex items-center justify-center mb-5 sm:mb-6 shrink-0 min-h-[2rem]">
        <AnimatePresence>
          {selectedLetter && (
            <motion.button
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              onClick={() => setSelectedLetter(null)}
              className="absolute left-0 text-xs text-muted-foreground hover:text-primary font-body font-semibold transition-all flex items-center gap-1.5
                         hover:-translate-x-0.5 duration-200 z-10"
            >
              <ArrowLeft size={14} /> <span>Back</span>
            </motion.button>
          )}
        </AnimatePresence>
        <h2 className="font-pixel text-xs sm:text-sm text-primary flex items-center gap-2">
          <Mail size={16} /> Letters
        </h2>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar pr-2">
        <AnimatePresence mode="wait">
          {!selectedLetter ? (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="space-y-2.5 sm:space-y-3"
            >
              <p className="text-sm text-muted-foreground text-center mb-4 sm:mb-5 font-body leading-relaxed">
                Pick a letter to read.
              </p>
              {letters.map((letter, i) => (
                <motion.button
                  key={letter.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.3 }}
                  whileHover={{ scale: 1.02, x: 6 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setSelectedLetter(letter)}
                  className={`group w-full p-4 rounded-xl ${letterColors[i]}
                             hover:shadow-lg transition-all duration-300
                             flex items-center gap-3 cursor-pointer active:scale-[0.98]`}
                >
                  <div className="p-2 rounded-lg bg-background/15 group-hover:scale-110 transition-transform duration-300">
                    <DynamicIcon name={letter.icon} size={22} />
                  </div>
                  <span className="font-pixel text-[10px] sm:text-xs group-hover:tracking-wider transition-all duration-300">
                    {letter.title}
                  </span>
                </motion.button>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="detail"
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
                <DynamicIcon name={selectedLetter.icon} size={44} />
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="font-pixel text-xs sm:text-sm text-primary mb-4"
              >
                {selectedLetter.title}
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-foreground font-body leading-relaxed text-sm sm:text-base text-left"
              >
                <TypewriterBody text={selectedLetter.body} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Letters;
