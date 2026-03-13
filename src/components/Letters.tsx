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
    <p className="text-sm text-foreground leading-relaxed font-body whitespace-pre-wrap">
      {displayed}
      {!done && <span className="cursor-blink" />}
    </p>
  );
};

const Letters: FC = () => {
  const [selectedLetter, setSelectedLetter] = useState<Letter | null>(null);

  return (
    <div>
      <h2 className="font-pixel text-xs sm:text-sm text-primary mb-5 sm:mb-6 text-center flex items-center justify-center gap-2">
        <Mail size={16} /> Letters
      </h2>

      <AnimatePresence mode="wait">
        {!selectedLetter ? (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3"
          >
            {letters.map((letter, i) => (
              <motion.button
                key={letter.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.3 }}
                whileHover={{ scale: 1.06, y: -3 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setSelectedLetter(letter)}
                className="group flex flex-col items-center gap-1.5 sm:gap-2 p-3 sm:p-4 rounded-xl bg-envelope hover:bg-envelope-flap
                           transition-all duration-300 cursor-pointer hover-lift"
              >
                <div className="text-muted-foreground group-hover:text-primary group-hover:scale-110 transition-all duration-300">
                  <DynamicIcon name={letter.icon} size={26} />
                </div>
                <span className="font-pixel text-[7px] sm:text-[8px] text-foreground leading-tight text-center group-hover:text-primary transition-colors duration-300">
                  {letter.title}
                </span>
                <span className="text-[9px] sm:text-[10px] text-muted-foreground">{letter.date}</span>
              </motion.button>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="detail"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <button
              onClick={() => setSelectedLetter(null)}
              className="mb-4 text-xs text-muted-foreground hover:text-primary font-body font-semibold transition-colors flex items-center gap-1.5
                         hover:-translate-x-1 transition-transform duration-200"
            >
              <ArrowLeft size={14} /> Back to letters
            </button>
            <div className="bg-muted/70 rounded-xl p-4 sm:p-5">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <DynamicIcon name={selectedLetter.icon} size={20} />
                </div>
                <div>
                  <h3 className="font-pixel text-[10px] sm:text-xs text-primary">{selectedLetter.title}</h3>
                  <span className="text-[10px] sm:text-xs text-muted-foreground">{selectedLetter.date}</span>
                </div>
              </div>
              <TypewriterBody text={selectedLetter.body} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Letters;
