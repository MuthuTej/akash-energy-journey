import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Timeline } from "./Timeline";
import { PlaybackControls } from "./PlaybackControls";
import { NarratorBox } from "./NarratorBox";
import { SceneIntro } from "./scenes/SceneIntro";
import { SceneFeedstock } from "./scenes/SceneFeedstock";
import { ScenePreprocessing } from "./scenes/ScenePreprocessing";
import { SceneCombustion } from "./scenes/SceneCombustion";
import { SceneTurbine } from "./scenes/SceneTurbine";
import { SceneCondenser } from "./scenes/SceneCondenser";
import { SceneEmissions } from "./scenes/SceneEmissions";
import { SceneSummary } from "./scenes/SceneSummary";

const SECTIONS = [
  { id: "intro", label: "Intro", time: "0:00", duration: 8, narration: "Hi, I'm Asha — let's explore how biomass becomes clean electricity, together." },
  { id: "feedstock", label: "Feedstock", time: "0:08", duration: 17, narration: "We start with biomass — wood chips, agricultural residues, or energy crops. They're weighed, tested for moisture, and stored in hoppers. Drier fuel means more energy!" },
  { id: "preprocessing", label: "Processing", time: "0:25", duration: 15, narration: "The chipper reduces particle size while the rotary dryer removes moisture. Watch the energy value climb as water content drops." },
  { id: "combustion", label: "Combustion", time: "0:40", duration: 30, narration: "We feed dry chips into the boiler — hotter, drier fuel means more energy! Staged combustion with primary and secondary air keeps oxygen levels optimal and CO emissions low." },
  { id: "turbine", label: "Turbine", time: "1:10", duration: 35, narration: "The turbine converts steam's push into rotation — then the generator turns it into electricity. Steam expands through high, medium, and low pressure stages for maximum efficiency." },
  { id: "condenser", label: "Condenser", time: "1:45", duration: 20, narration: "After the turbine, steam condenses back to water in a closed loop. Pumps return it to the boiler, recovering heat along the way." },
  { id: "emissions", label: "Emissions", time: "2:05", duration: 20, narration: "Filters and scrubbers make sure the exhaust leaves the air clean. We capture 98% of particulates and recover fly ash for construction materials." },
  { id: "summary", label: "Summary", time: "2:25", duration: 25, narration: "And there you have it — from biomass to electricity. When sourced responsibly, biomass is a renewable way to generate reliable, clean power." },
];

const SCENE_COMPONENTS = [
  SceneIntro,
  SceneFeedstock,
  ScenePreprocessing,
  SceneCombustion,
  SceneTurbine,
  SceneCondenser,
  SceneEmissions,
  SceneSummary,
];

export const BiomassExplainer = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [sectionProgress, setSectionProgress] = useState(0);

  const totalDuration = SECTIONS.reduce((sum, s) => sum + s.duration, 0);
  const currentSectionData = SECTIONS[currentSection];

  // Calculate overall progress
  const getOverallProgress = useCallback(() => {
    const completedTime = SECTIONS.slice(0, currentSection).reduce((sum, s) => sum + s.duration, 0);
    const currentSectionTime = (sectionProgress / 100) * currentSectionData.duration;
    return ((completedTime + currentSectionTime) / totalDuration) * 100;
  }, [currentSection, sectionProgress, currentSectionData.duration, totalDuration]);

  // Auto-advance sections when playing
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setSectionProgress((prev) => {
        const newProgress = prev + (100 / currentSectionData.duration);
        if (newProgress >= 100) {
          // Move to next section
          if (currentSection < SECTIONS.length - 1) {
            setCurrentSection((s) => s + 1);
            return 0;
          } else {
            // End of presentation
            setIsPlaying(false);
            return 100;
          }
        }
        return newProgress;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, currentSection, currentSectionData.duration]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleRestart = () => {
    setCurrentSection(0);
    setSectionProgress(0);
    setIsPlaying(false);
  };

  const handleSectionClick = (index: number) => {
    setCurrentSection(index);
    setSectionProgress(0);
  };

  const handleToggleMute = () => {
    setIsMuted(!isMuted);
  };

  const CurrentScene = SCENE_COMPONENTS[currentSection];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-primary" fill="currentColor">
                <path d="M12 2L4 7v10l8 5 8-5V7l-8-5z" />
              </svg>
            </div>
            <span className="font-semibold text-foreground">Biomass Energy</span>
          </div>
          <span className="text-sm text-muted-foreground">
            {SECTIONS[currentSection].time} / 2:50
          </span>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 pt-20 pb-52">
        <div className="container mx-auto px-4">
          {/* Scene container */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSection}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="rounded-2xl overflow-hidden border border-border bg-card"
            >
              <CurrentScene />
            </motion.div>
          </AnimatePresence>

          {/* Narrator box */}
          <div className="mt-6">
            <NarratorBox
              text={currentSectionData.narration}
              isVisible={true}
            />
          </div>
        </div>
      </main>

      {/* Controls footer */}
      <footer className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t border-border py-5 px-4">
        <div className="container mx-auto">
          {/* Timeline */}
          <div className="mb-5">
            <Timeline
              sections={SECTIONS}
              currentSection={currentSection}
              progress={getOverallProgress()}
              onSectionClick={handleSectionClick}
            />
          </div>

          {/* Playback controls */}
          <div className="flex justify-center pb-2">
            <PlaybackControls
              isPlaying={isPlaying}
              isMuted={isMuted}
              onPlayPause={handlePlayPause}
              onRestart={handleRestart}
              onToggleMute={handleToggleMute}
            />
          </div>
        </div>
      </footer>
    </div>
  );
};
