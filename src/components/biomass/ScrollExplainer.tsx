import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollHero } from "./scroll-sections/ScrollHero";
import { ScrollCollection } from "./scroll-sections/ScrollCollection";
import { ScrollStorage } from "./scroll-sections/ScrollStorage";
import { ScrollPreprocessing } from "./scroll-sections/ScrollPreprocessing";
import { ScrollFeeding } from "./scroll-sections/ScrollFeeding";
import { ScrollCombustion } from "./scroll-sections/ScrollCombustion";
import { ScrollSteam } from "./scroll-sections/ScrollSteam";
import { ScrollTurbine } from "./scroll-sections/ScrollTurbine";
import { ScrollGenerator } from "./scroll-sections/ScrollGenerator";
import { ScrollCondenser } from "./scroll-sections/ScrollCondenser";
import { ScrollEmissions } from "./scroll-sections/ScrollEmissions";
import { ScrollSummary } from "./scroll-sections/ScrollSummary";
import { ScrollProgress } from "./ScrollProgress";

gsap.registerPlugin(ScrollTrigger);

const SECTIONS = [
  { id: "hero", label: "Start" },
  { id: "collection", label: "Collection" },
  { id: "storage", label: "Storage" },
  { id: "preprocessing", label: "Processing" },
  { id: "feeding", label: "Feeding" },
  { id: "combustion", label: "Combustion" },
  { id: "steam", label: "Steam" },
  { id: "turbine", label: "Turbine" },
  { id: "generator", label: "Generator" },
  { id: "condenser", label: "Condenser" },
  { id: "emissions", label: "Emissions" },
  { id: "summary", label: "Summary" },
];

export const ScrollExplainer = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Refresh ScrollTrigger on mount
    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="bg-background">
      {/* Fixed progress indicator */}
      <ScrollProgress sections={SECTIONS} />

      {/* Scroll sections */}
      <ScrollHero />
      <ScrollCollection />
      <ScrollStorage />
      <ScrollPreprocessing />
      <ScrollFeeding />
      <ScrollCombustion />
      <ScrollSteam />
      <ScrollTurbine />
      <ScrollGenerator />
      <ScrollCondenser />
      <ScrollEmissions />
      <ScrollSummary />
    </div>
  );
};
