import { type FC, type ReactNode } from "react";
import { motion } from "framer-motion";
import { useGameStore } from "@/store/useGameStore";
import { X } from "lucide-react";

interface Props {
  children: ReactNode;
}

const ModalOverlay: FC<Props> = ({ children }) => {
  const closeModal = useGameStore((s) => s.closeModal);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-foreground/40 backdrop-blur-md"
        onClick={closeModal}
      />

      {/* Modal Content */}
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.97 }}
        transition={{ type: "spring", damping: 30, stiffness: 350 }}
        className="relative z-10 w-full sm:max-w-md md:max-w-lg max-h-[92vh] sm:max-h-[85vh] overflow-y-auto
                   rounded-t-2xl sm:rounded-2xl bg-card/95 backdrop-blur-sm
                   shadow-xl shadow-foreground/5
                   p-5 sm:p-6 md:p-7
                   custom-scrollbar"
      >
        {/* Drag indicator on mobile */}
        <div className="sm:hidden flex justify-center mb-3">
          <div className="w-10 h-1 rounded-full bg-muted-foreground/30" />
        </div>

        <button
          onClick={closeModal}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-50 p-2 rounded-full bg-muted/80 hover:bg-primary hover:text-primary-foreground
                     transition-all duration-300 hover:rotate-90 hover:scale-110 active:scale-95"
          aria-label="Close"
        >
          <X size={16} />
        </button>
        <div className="animate-fade-in">
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ModalOverlay;
