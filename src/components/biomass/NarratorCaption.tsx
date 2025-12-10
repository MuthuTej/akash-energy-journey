import { motion } from "framer-motion";

interface NarratorCaptionProps {
  text: string;
  speaker?: string;
}

export const NarratorCaption = ({ text, speaker = "Asha" }: NarratorCaptionProps) => {
  return (
    <motion.div
      className="max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.8 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <div className="metric-card backdrop-blur-md">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 border border-primary/30">
            <span className="text-primary font-semibold text-sm">A</span>
          </div>
          <div>
            <span className="text-xs text-primary font-medium block mb-1">
              {speaker}
            </span>
            <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
              {text}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
