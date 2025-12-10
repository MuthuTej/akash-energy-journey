import { motion, AnimatePresence } from "framer-motion";

interface NarratorBoxProps {
  text: string;
  isVisible: boolean;
}

export const NarratorBox = ({ text, isVisible }: NarratorBoxProps) => {
  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          className="metric-card max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
              <span className="text-primary font-semibold text-sm">A</span>
            </div>
            <div>
              <span className="text-xs text-primary font-medium block mb-1">
                Akash Guru
              </span>
              <p className="narrator-text">{text}</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
