import { motion } from "framer-motion";

interface TimelineProps {
  sections: { id: string; label: string; time: string }[];
  currentSection: number;
  progress: number;
  onSectionClick: (index: number) => void;
}

export const Timeline = ({
  sections,
  currentSection,
  progress,
  onSectionClick,
}: TimelineProps) => {
  return (
    <div className="w-full px-4">
      {/* Progress bar */}
      <div className="timeline-track mb-4">
        <motion.div
          className="timeline-progress"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Section markers */}
      <div className="flex justify-between items-start">
        {sections.map((section, index) => (
          <button
            key={section.id}
            onClick={() => onSectionClick(index)}
            className="flex flex-col items-center gap-1 group"
          >
            <div
              className={`progress-marker ${
                index <= currentSection ? "active" : ""
              }`}
            />
            <span
              className={`text-[10px] transition-colors ${
                index === currentSection
                  ? "text-primary font-medium"
                  : "text-muted-foreground group-hover:text-foreground"
              }`}
            >
              {section.label}
            </span>
            <span className="text-[8px] text-muted-foreground">
              {section.time}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
