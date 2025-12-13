import { createContext, useContext, useState, useMemo, ReactNode } from "react";

// Biomass type definitions with LHV values (kJ/kg)
export const BIOMASS_TYPES = {
  "Wood chips": { lhv: 18500, color: "hsl(30 60% 45%)" },
  "Bagasse": { lhv: 17200, color: "hsl(45 50% 50%)" },
  "Rice husk": { lhv: 14800, color: "hsl(40 40% 55%)" },
} as const;

export type BiomassType = keyof typeof BIOMASS_TYPES;

interface SimulationInputs {
  biomassType: BiomassType;
  feedRate: number; // kg/hr
  moistureContent: number; // %
  combustionTemp: number; // °C
}

interface SimulationOutputs {
  effectiveLHV: number; // kJ/kg (adjusted for moisture)
  fuelEnergyInput: number; // kW
  boilerSteamPressure: number; // bar
  boilerSteamTemp: number; // °C
  waterLevel: number; // %
  plantEfficiency: number; // %
  turbineSpeed: number; // RPM
  electricalPowerOutput: number; // kW
}

interface SimulationContextType {
  inputs: SimulationInputs;
  outputs: SimulationOutputs;
  setInputs: React.Dispatch<React.SetStateAction<SimulationInputs>>;
  updateInput: <K extends keyof SimulationInputs>(key: K, value: SimulationInputs[K]) => void;
}

const SimulationContext = createContext<SimulationContextType | null>(null);

const DEFAULT_INPUTS: SimulationInputs = {
  biomassType: "Wood chips",
  feedRate: 5000, // kg/hr
  moistureContent: 20, // %
  combustionTemp: 850, // °C
};

// Simplified engineering calculations
function calculateOutputs(inputs: SimulationInputs): SimulationOutputs {
  const baseLHV = BIOMASS_TYPES[inputs.biomassType].lhv;
  
  // Moisture reduces effective heating value
  // Formula: LHV_eff = LHV * (1 - moisture/100) - 2.44 * moisture (latent heat of vaporization)
  const moistureFactor = 1 - (inputs.moistureContent / 100);
  const latentHeatLoss = 24.4 * inputs.moistureContent; // Simplified: ~24.4 kJ/kg per % moisture
  const effectiveLHV = Math.max(baseLHV * moistureFactor - latentHeatLoss, 0);
  
  // Fuel energy input (kW) = feed rate (kg/hr) × LHV (kJ/kg) / 3600
  const fuelEnergyInput = (inputs.feedRate * effectiveLHV) / 3600;
  
  // Combustion efficiency improves with temperature (realistic range 80-92%)
  const tempFactor = Math.min(1, (inputs.combustionTemp - 700) / 400); // Normalized 700-1100°C
  const boilerEfficiency = 0.80 + tempFactor * 0.12;
  
  // Steam parameters scale with heat input
  const thermalPower = fuelEnergyInput * boilerEfficiency;
  
  // Steam pressure (bar) - proportional to thermal power, max ~120 bar
  const basePressure = 40; // Minimum operating pressure
  const pressureScale = Math.min((thermalPower / 20000) * 80, 80);
  const boilerSteamPressure = basePressure + pressureScale;
  
  // Steam temperature scales with combustion temp (typically 400-565°C)
  const steamTempBase = 400;
  const steamTempScale = (inputs.combustionTemp - 700) / (1100 - 700) * 165;
  const boilerSteamTemp = Math.min(steamTempBase + steamTempScale, 565);
  
  // Water level decreases as steam production increases (95-70%)
  const steamProduction = thermalPower / 2700; // Approximate: 2700 kJ/kg to produce steam
  const waterLevel = Math.max(70, 95 - (steamProduction / 100));
  
  // Overall plant efficiency (30-45%) depends on moisture and combustion temp
  const moisturePenalty = (inputs.moistureContent / 100) * 10; // Up to 10% penalty
  const tempBonus = tempFactor * 8; // Up to 8% bonus for high temp
  const plantEfficiency = Math.min(30 + tempBonus - moisturePenalty, 45);
  
  // Turbine speed proportional to steam energy (typically 3000 RPM at 50Hz grid)
  const speedFactor = Math.min(thermalPower / 25000, 1);
  const turbineSpeed = 2400 + speedFactor * 600; // Range: 2400-3000 RPM
  
  // Electrical power output = thermal power × turbine efficiency × generator efficiency
  const turbineEfficiency = 0.85 + tempFactor * 0.07; // 85-92%
  const generatorEfficiency = 0.96;
  const electricalPowerOutput = thermalPower * turbineEfficiency * generatorEfficiency;
  
  return {
    effectiveLHV: Math.round(effectiveLHV),
    fuelEnergyInput: Math.round(fuelEnergyInput),
    boilerSteamPressure: Math.round(boilerSteamPressure * 10) / 10,
    boilerSteamTemp: Math.round(boilerSteamTemp),
    waterLevel: Math.round(waterLevel * 10) / 10,
    plantEfficiency: Math.round(plantEfficiency * 10) / 10,
    turbineSpeed: Math.round(turbineSpeed),
    electricalPowerOutput: Math.round(electricalPowerOutput),
  };
}

export function SimulationProvider({ children }: { children: ReactNode }) {
  const [inputs, setInputs] = useState<SimulationInputs>(DEFAULT_INPUTS);
  
  const outputs = useMemo(() => calculateOutputs(inputs), [inputs]);
  
  const updateInput = <K extends keyof SimulationInputs>(key: K, value: SimulationInputs[K]) => {
    setInputs(prev => ({ ...prev, [key]: value }));
  };
  
  return (
    <SimulationContext.Provider value={{ inputs, outputs, setInputs, updateInput }}>
      {children}
    </SimulationContext.Provider>
  );
}

export function useSimulation() {
  const context = useContext(SimulationContext);
  if (!context) {
    throw new Error("useSimulation must be used within SimulationProvider");
  }
  return context;
}
