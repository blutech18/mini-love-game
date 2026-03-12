import { type FC, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { letters, type Letter } from "@/data/content";

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
    }, 25);
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
      <h2 className="font-pixel text-sm text-primary mb-6 text-center">💌 Letters</h2>

      <AnimatePresence mode="wait">
        {!selectedLetter ? (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-3 gap-3"
          >
            {letters.map((letter, i) => (
              <motion.button
                key={letter.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setSelectedLetter(letter)}
                className="flex flex-col items-center gap-2 p-4 rounded-lg bg-envelope hover:bg-envelope-flap
                           transition-colors cursor-pointer pixel-border hover:scale-105 active:pixel-border-active"
              >
                <span className="text-3xl">{letter.emoji}</span>
                <span className="font-pixel text-[8px] text-foreground leading-tight text-center">{letter.title}</span>
                <span className="text-[10px] text-muted-foreground">{letter.date}</span>
              </motion.button>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="detail"
            initial={{ opacity: 0, rotateY: 90 }}
            animate={{ opacity: 1, rotateY: 0 }}
            exit={{ opacity: 0, rotateY: -90 }}
            transition={{ duration: 0.4 }}
          >
            <button
              onClick={() => setSelectedLetter(null)}
              className="mb-4 text-xs text-muted-foreground hover:text-primary font-pixel transition-colors"
            >
              ← Back to letters
            </button>
            <div className="bg-muted rounded-lg p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">{selectedLetter.emoji}</span>
                <div>
                  <h3 className="font-pixel text-xs text-primary">{selectedLetter.title}</h3>
                  <span className="text-xs text-muted-foreground">{selectedLetter.date}</span>
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
