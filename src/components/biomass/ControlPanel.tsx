import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, ChevronLeft, ChevronRight, HelpCircle } from "lucide-react";
import { useSimulation, BIOMASS_TYPES, BiomassType } from "@/contexts/SimulationContext";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const TOOLTIPS = {
  biomassType: "Different biomass fuels have different energy content (LHV). Wood chips are energy-dense, while rice husk has lower heating value.",
  feedRate: "The rate at which biomass fuel is fed into the boiler. Higher rates mean more energy input and power output.",
  moistureContent: "Water content in the fuel. Wet fuel requires energy to evaporate water, reducing effective heating value.",
  combustionTemp: "Higher combustion temperatures improve efficiency but require better materials and control.",
};

export const ControlPanel = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { inputs, outputs, updateInput } = useSimulation();
  
  return (
    <TooltipProvider delayDuration={300}>
      <motion.div
        className="fixed left-0 top-1/2 -translate-y-1/2 z-50 flex items-center"
        initial={{ x: 0 }}
        animate={{ x: isOpen ? 0 : -280 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
      >
        {/* Main panel */}
        <div className="w-[280px] bg-card/95 backdrop-blur-md border border-border rounded-r-xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-primary/10 border-b border-border px-4 py-3 flex items-center gap-2">
            <Settings className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Input Parameters</span>
          </div>
          
          {/* Controls */}
          <div className="p-4 space-y-5">
            {/* Biomass Type */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <label className="text-xs font-medium text-muted-foreground">Biomass Type</label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="w-3 h-3 text-muted-foreground/60 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent side="right" className="max-w-[200px]">
                    <p className="text-xs">{TOOLTIPS.biomassType}</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <select
                value={inputs.biomassType}
                onChange={(e) => updateInput("biomassType", e.target.value as BiomassType)}
                className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                {Object.keys(BIOMASS_TYPES).map((type) => (
                  <option key={type} value={type}>
                    {type} ({BIOMASS_TYPES[type as BiomassType].lhv.toLocaleString()} kJ/kg)
                  </option>
                ))}
              </select>
            </div>
            
            {/* Feed Rate */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <label className="text-xs font-medium text-muted-foreground">Feed Rate</label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="w-3 h-3 text-muted-foreground/60 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent side="right" className="max-w-[200px]">
                      <p className="text-xs">{TOOLTIPS.feedRate}</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <span className="text-xs font-mono text-primary">{inputs.feedRate.toLocaleString()} kg/hr</span>
              </div>
              <input
                type="range"
                min={1000}
                max={15000}
                step={100}
                value={inputs.feedRate}
                onChange={(e) => updateInput("feedRate", Number(e.target.value))}
                className="w-full h-2 bg-muted rounded-full appearance-none cursor-pointer slider-primary"
              />
              <div className="flex justify-between text-[10px] text-muted-foreground">
                <span>1,000</span>
                <span>15,000</span>
              </div>
            </div>
            
            {/* Moisture Content */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <label className="text-xs font-medium text-muted-foreground">Moisture Content</label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="w-3 h-3 text-muted-foreground/60 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent side="right" className="max-w-[200px]">
                      <p className="text-xs">{TOOLTIPS.moistureContent}</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <span className="text-xs font-mono text-primary">{inputs.moistureContent}%</span>
              </div>
              <input
                type="range"
                min={5}
                max={55}
                step={1}
                value={inputs.moistureContent}
                onChange={(e) => updateInput("moistureContent", Number(e.target.value))}
                className="w-full h-2 bg-muted rounded-full appearance-none cursor-pointer slider-primary"
              />
              <div className="flex justify-between text-[10px] text-muted-foreground">
                <span>5% (dry)</span>
                <span>55% (wet)</span>
              </div>
            </div>
            
            {/* Combustion Temperature */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <label className="text-xs font-medium text-muted-foreground">Combustion Temp</label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="w-3 h-3 text-muted-foreground/60 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent side="right" className="max-w-[200px]">
                      <p className="text-xs">{TOOLTIPS.combustionTemp}</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <span className="text-xs font-mono text-accent">{inputs.combustionTemp}°C</span>
              </div>
              <input
                type="range"
                min={700}
                max={1100}
                step={10}
                value={inputs.combustionTemp}
                onChange={(e) => updateInput("combustionTemp", Number(e.target.value))}
                className="w-full h-2 bg-muted rounded-full appearance-none cursor-pointer slider-accent"
              />
              <div className="flex justify-between text-[10px] text-muted-foreground">
                <span>700°C</span>
                <span>1100°C</span>
              </div>
            </div>
          </div>
          
          {/* Quick output preview */}
          <div className="border-t border-border bg-muted/30 px-4 py-3">
            <div className="text-[10px] text-muted-foreground mb-2">Quick Preview</div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">LHV:</span>
                <span className="font-mono text-primary">{(outputs.effectiveLHV / 1000).toFixed(1)} MJ/kg</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Power:</span>
                <span className="font-mono text-accent">{(outputs.electricalPowerOutput / 1000).toFixed(1)} MW</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Toggle button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-card/95 backdrop-blur-md border border-l-0 border-border rounded-r-lg px-2 py-4 hover:bg-muted transition-colors"
          aria-label={isOpen ? "Close panel" : "Open panel"}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={isOpen ? "open" : "closed"}
              initial={{ rotate: 0 }}
              animate={{ rotate: 0 }}
              exit={{ rotate: 180 }}
            >
              {isOpen ? (
                <ChevronLeft className="w-4 h-4 text-muted-foreground" />
              ) : (
                <ChevronRight className="w-4 h-4 text-primary" />
              )}
            </motion.div>
          </AnimatePresence>
        </button>
      </motion.div>
    </TooltipProvider>
  );
};
