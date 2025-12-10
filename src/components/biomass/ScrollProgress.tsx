import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface ScrollProgressProps {
  sections: { id: string; label: string }[];
}

export const ScrollProgress = ({ sections }: ScrollProgressProps) => {
  const [activeSection, setActiveSection] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);

      // Determine active section based on scroll position
      const sectionHeight = docHeight / sections.length;
      const currentSection = Math.min(
        Math.floor(scrollTop / sectionHeight),
        sections.length - 1
      );
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections.length]);

  const scrollToSection = (index: number) => {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const targetScroll = (index / sections.length) * docHeight;
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  };

  return (
    <>
      {/* Top progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-muted z-50">
        <motion.div
          className="h-full bg-gradient-to-r from-primary to-primary-glow"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Side navigation dots */}
      <nav className="fixed right-4 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3">
        {sections.map((section, index) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(index)}
            className="group flex items-center gap-2"
            aria-label={`Go to ${section.label}`}
          >
            <span
              className={`text-[10px] uppercase tracking-wider transition-all duration-300 opacity-0 group-hover:opacity-100 ${
                index === activeSection ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {section.label}
            </span>
            <div
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === activeSection
                  ? "bg-primary scale-150 shadow-[0_0_10px_hsl(var(--primary))]"
                  : index < activeSection
                  ? "bg-primary/50"
                  : "bg-muted-foreground/30"
              }`}
            />
          </button>
        ))}
      </nav>

      {/* Mobile bottom indicator */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 lg:hidden">
        <div className="px-4 py-2 rounded-full bg-card/90 backdrop-blur-sm border border-border">
          <span className="text-xs text-muted-foreground">
            {sections[activeSection]?.label} • {Math.round(scrollProgress)}%
          </span>
        </div>
      </div>
    </>
  );
};
