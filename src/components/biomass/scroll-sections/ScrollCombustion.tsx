import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { NarratorCaption } from "../NarratorCaption";
import { FlameEffect, SteamParticles } from "../ParticleEffects";
import { useSimulation } from "@/contexts/SimulationContext";
import { CircularGauge, VerticalMeter, NumericCounter } from "../OutputDisplay";

gsap.registerPlugin(ScrollTrigger);

export const ScrollCombustion = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { inputs, outputs } = useSimulation();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=100%",
        pin: true,
        pinSpacing: true,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Visual intensity based on combustion temp
  const flameIntensity = (inputs.combustionTemp - 700) / 400;
  const glowOpacity = 0.2 + flameIntensity * 0.3;

  return (
    <section
      ref={sectionRef}
      id="combustion"
      className="min-h-screen relative flex flex-col items-center justify-center py-12 px-4 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-card/50 via-background to-card/30" />

      {/* Ambient glow effect - intensity based on combustion temp */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent rounded-full blur-[100px]"
        animate={{ opacity: [glowOpacity * 0.6, glowOpacity, glowOpacity * 0.6] }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      <motion.div
        className="relative z-10 w-full max-w-6xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="section-title text-center mb-8">
          5. Combustion & Boiler
        </h2>

        <div className="flex flex-col xl:flex-row items-center justify-center gap-8">
          {/* Boiler cross-section */}
          <div className="relative w-full max-w-md">
            <svg viewBox="0 0 400 380" className="w-full h-auto">
              <defs>
                <linearGradient id="steelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="hsl(215 15% 45%)" />
                  <stop offset="50%" stopColor="hsl(215 20% 35%)" />
                  <stop offset="100%" stopColor="hsl(215 20% 25%)" />
                </linearGradient>
              </defs>

              {/* Boiler shell */}
              <motion.rect
                x="50"
                y="40"
                width="300"
                height="300"
                rx="10"
                fill="url(#steelGrad)"
                stroke="hsl(215 15% 55%)"
                strokeWidth="3"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false }}
              />

              {/* Inner chamber */}
              <rect x="70" y="60" width="260" height="260" rx="5" fill="hsl(220 20% 12%)" />

              {/* Steam tubes - activity based on feed rate */}
              {[90, 130, 170, 210, 250, 290].map((x, i) => (
                <motion.g key={i}>
                  <rect
                    x={x}
                    y="70"
                    width="12"
                    height="140"
                    rx="6"
                    fill="hsl(215 12% 40%)"
                  />
                  {/* Steam flow dots - speed based on steam production */}
                  <motion.circle
                    cx={x + 6}
                    cy="90"
                    r="3"
                    fill="hsl(200 80% 70%)"
                    animate={{ y: [0, -40, -80], opacity: [0.8, 0.5, 0] }}
                    transition={{
                      delay: i * 0.15,
                      duration: Math.max(0.5, 2 - (outputs.fuelEnergyInput / 20000)),
                      repeat: Infinity,
                    }}
                  />
                </motion.g>
              ))}

              {/* Grate */}
              <rect x="80" y="250" width="240" height="12" fill="hsl(215 20% 35%)" />
              {[100, 140, 180, 220, 260, 300].map((x, i) => (
                <rect key={i} x={x} y="252" width="25" height="8" fill="hsl(220 20% 12%)" />
              ))}

              {/* Air flow indicators */}
              {[120, 200, 280].map((x, i) => (
                <motion.g key={`p-${i}`}>
                  <motion.path
                    d={`M${x} 350 L${x} 280`}
                    stroke="hsl(200 80% 60%)"
                    strokeWidth="3"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: false }}
                    transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                  />
                </motion.g>
              ))}
              <text x="200" y="370" textAnchor="middle" className="fill-muted-foreground text-[9px]">
                PRIMARY AIR
              </text>

              {/* Secondary air */}
              {[100, 150].map((y, i) => (
                <motion.path
                  key={`s-${i}`}
                  d={`M30 ${y} L65 ${y}`}
                  stroke="hsl(160 70% 50%)"
                  strokeWidth="3"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: false }}
                  transition={{ delay: 0.7 + i * 0.1, duration: 0.4 }}
                />
              ))}
              <text x="15" y="130" className="fill-muted-foreground text-[8px]" style={{ writingMode: "vertical-rl" }}>
                2° AIR
              </text>

              {/* Labels */}
              <text x="200" y="235" textAnchor="middle" className="fill-accent text-[10px] font-medium">
                COMBUSTION ZONE
              </text>
              <text x="200" y="30" textAnchor="middle" className="fill-primary text-[10px] font-medium">
                STEAM OUTLET →
              </text>
            </svg>

            {/* Flame effect - intensity based on combustion temp */}
            <div 
              className="absolute bottom-[22%] left-1/2 -translate-x-1/2"
              style={{ 
                transform: `translateX(-50%) scale(${0.8 + flameIntensity * 0.4})`,
                filter: `brightness(${0.8 + flameIntensity * 0.4})`,
              }}
            >
              <FlameEffect width={100} height={120} />
            </div>

            {/* Steam particles */}
            <SteamParticles count={8} originX={50} originY={15} spread={30} />
          </div>

          {/* Metrics panel with live simulation values */}
          <div className="flex flex-col gap-4 w-full max-w-xs">
            <NumericCounter
              value={inputs.combustionTemp}
              label="Bed Temperature"
              unit="°C"
              color="hsl(var(--accent))"
              tooltip="Temperature in the combustion zone"
            />

            <div className="metric-card">
              <span className="metric-label">Effective LHV</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="metric-value text-primary">{(outputs.effectiveLHV / 1000).toFixed(2)}</span>
                <span className="text-xs text-muted-foreground">MJ/kg</span>
              </div>
              <p className="text-[10px] text-muted-foreground mt-1">
                Adjusted for {inputs.moistureContent}% moisture
              </p>
            </div>

            <NumericCounter
              value={outputs.fuelEnergyInput}
              label="Fuel Energy Input"
              unit="kW"
              decimals={0}
              tooltip="Total thermal energy from fuel combustion"
            />

            <motion.div
              className="metric-card"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.3 }}
            >
              <span className="metric-label">Combustion Type</span>
              <p className="text-primary font-medium mt-1">Grate-Fired</p>
              <p className="text-xs text-muted-foreground mt-1">
                Staged combustion for efficiency
              </p>
            </motion.div>
          </div>
        </div>

        <div className="mt-8">
          <NarratorCaption text={`Feeding ${inputs.feedRate.toLocaleString()} kg/hr of ${inputs.biomassType} at ${inputs.moistureContent}% moisture. At ${inputs.combustionTemp}°C, we're generating ${(outputs.fuelEnergyInput / 1000).toFixed(1)} MW of thermal energy!`} />
        </div>
      </motion.div>
    </section>
  );
};
