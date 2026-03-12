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
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-foreground/30 backdrop-blur-sm"
        onClick={closeModal}
      />

      {/* Modal Content */}
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative z-10 w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-xl bg-card pixel-border p-6"
      >
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 p-1.5 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground hover:rotate-90 hover:scale-110 transition-all duration-300"
        >
          <X size={18} />
        </button>
        {children}
      </motion.div>
    </motion.div>
  );
};

export default ModalOverlay;
