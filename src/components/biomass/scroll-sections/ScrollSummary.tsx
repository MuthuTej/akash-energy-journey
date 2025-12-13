import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { NarratorCaption } from "../NarratorCaption";
import { useSimulation, BIOMASS_TYPES } from "@/contexts/SimulationContext";
import { CircularGauge } from "../OutputDisplay";

gsap.registerPlugin(ScrollTrigger);

export const ScrollSummary = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { inputs, outputs } = useSimulation();

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray(".summary-metric").forEach((el, i) => {
        gsap.fromTo(
          el as Element,
          { opacity: 0, y: 30, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            delay: i * 0.1,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const powerMW = outputs.electricalPowerOutput / 1000;
  const thermalMW = outputs.fuelEnergyInput / 1000;
  const homesSupplied = Math.round(powerMW * 2000);

  return (
    <section
      ref={sectionRef}
      id="summary"
      className="min-h-screen relative flex flex-col items-center justify-center py-20 px-4 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-card/50 via-background to-primary/5" />

      {/* Eco glow */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-[120px]"
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      <motion.div
        className="relative z-10 w-full max-w-5xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="section-title text-center mb-4">
          Your Plant Configuration
        </h2>
        <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
          Live metrics based on your input parameters
        </p>

        {/* Full plant schematic with live values */}
        <div className="w-full max-w-4xl mx-auto mb-12">
          <svg viewBox="0 0 900 180" className="w-full h-auto">
            {/* Process blocks with live data */}
            {[
              { x: 20, label: "Feedstock", icon: "🌲", value: inputs.biomassType.split(" ")[0] },
              { x: 110, label: "Storage", icon: "📦", value: `${inputs.moistureContent}%` },
              { x: 200, label: "Processing", icon: "⚙️", value: `${(outputs.effectiveLHV / 1000).toFixed(1)} MJ/kg` },
              { x: 290, label: "Feeding", icon: "➡️", value: `${(inputs.feedRate / 1000).toFixed(1)} t/hr` },
              { x: 380, label: "Boiler", icon: "🔥", value: `${inputs.combustionTemp}°C` },
              { x: 470, label: "Steam", icon: "💨", value: `${outputs.boilerSteamPressure.toFixed(0)} bar` },
              { x: 560, label: "Turbine", icon: "🔄", value: `${outputs.turbineSpeed} rpm` },
              { x: 650, label: "Generator", icon: "⚡", value: `${powerMW.toFixed(1)} MW` },
              { x: 740, label: "Grid", icon: "🏠", value: "11 kV" },
            ].map((item, i) => (
              <motion.g
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: i * 0.08 }}
              >
                <rect
                  x={item.x}
                  y={50}
                  width={70}
                  height={70}
                  rx={8}
                  fill={i === 7 ? "hsl(35 80% 40%)" : i === 8 ? "hsl(145 60% 40%)" : "hsl(215 20% 25%)"}
                  stroke={i === 4 ? "hsl(25 90% 50%)" : i === 7 ? "hsl(35 90% 55%)" : i === 8 ? "hsl(145 70% 50%)" : "hsl(215 15% 35%)"}
                  strokeWidth={2}
                />
                <text x={item.x + 35} y={82} textAnchor="middle" className="text-[16px]">
                  {item.icon}
                </text>
                <text x={item.x + 35} y={105} textAnchor="middle" className="fill-primary text-[8px] font-mono">
                  {item.value}
                </text>
                <text
                  x={item.x + 35}
                  y={145}
                  textAnchor="middle"
                  className="fill-muted-foreground text-[9px]"
                >
                  {item.label}
                </text>
                
                {/* Connector arrows */}
                {i < 8 && (
                  <motion.path
                    d={`M${item.x + 75} 85 L${item.x + 105} 85`}
                    stroke="hsl(145 60% 45%)"
                    strokeWidth={2}
                    fill="none"
                    markerEnd="url(#summaryArrow)"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: false }}
                    transition={{ delay: 0.5 + i * 0.08, duration: 0.2 }}
                  />
                )}
              </motion.g>
            ))}

            {/* Emissions branch */}
            <motion.g
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              transition={{ delay: 1 }}
            >
              <path d="M415 50 L415 20 L520 20" stroke="hsl(200 60% 50%)" strokeWidth={2} strokeDasharray="4 2" />
              <rect x="520" y="5" width="60" height="30" rx={5} fill="hsl(215 20% 25%)" />
              <text x="550" y="25" textAnchor="middle" className="fill-steam text-[8px]">
                Clean Air
              </text>
            </motion.g>

            {/* Condenser loop */}
            <motion.g
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              transition={{ delay: 1.2 }}
            >
              <path
                d="M595 125 L595 160 L470 160 L470 125"
                stroke="hsl(200 60% 50%)"
                strokeWidth={2}
                fill="none"
              />
              <text x="530" y="175" textAnchor="middle" className="fill-primary text-[8px]">
                Water Loop
              </text>
            </motion.g>

            <defs>
              <marker id="summaryArrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                <polygon points="0 0, 8 3, 0 6" fill="hsl(145 60% 45%)" />
              </marker>
            </defs>
          </svg>
        </div>

        {/* Live metrics dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <motion.div className="summary-metric metric-card text-center">
            <span className="metric-label">Fuel Input</span>
            <p className="text-primary font-medium mt-1">{inputs.biomassType}</p>
            <p className="text-[10px] text-muted-foreground">
              {inputs.feedRate.toLocaleString()} kg/hr @ {inputs.moistureContent}% moisture
            </p>
          </motion.div>

          <motion.div className="summary-metric metric-card text-center">
            <span className="metric-label">Thermal Input</span>
            <div className="flex items-baseline justify-center gap-1 mt-1">
              <span className="metric-value">{thermalMW.toFixed(1)}</span>
              <span className="text-xs text-muted-foreground">MW</span>
            </div>
            <p className="text-[10px] text-muted-foreground">
              LHV: {(outputs.effectiveLHV / 1000).toFixed(2)} MJ/kg
            </p>
          </motion.div>

          <motion.div className="summary-metric metric-card text-center">
            <span className="metric-label">Plant Efficiency</span>
            <div className="flex items-baseline justify-center gap-1 mt-1">
              <span className="metric-value text-primary">{outputs.plantEfficiency.toFixed(1)}</span>
              <span className="text-xs text-muted-foreground">%</span>
            </div>
          </motion.div>

          <motion.div className="summary-metric metric-card text-center bg-accent/10 border-accent/30">
            <span className="metric-label text-accent">Power Output</span>
            <div className="flex items-baseline justify-center gap-1 mt-1">
              <span className="metric-value text-accent">{powerMW.toFixed(1)}</span>
              <span className="text-xs text-accent/70">MW</span>
            </div>
            <p className="text-[10px] text-muted-foreground">
              ≈ {homesSupplied.toLocaleString()} homes
            </p>
          </motion.div>
        </div>

        {/* Efficiency gauges */}
        <div className="flex flex-wrap justify-center gap-6 mb-10">
          <CircularGauge
            value={outputs.plantEfficiency}
            max={50}
            label="Plant Efficiency"
            unit="%"
            size="lg"
            tooltip="Thermal-to-electric conversion"
          />
          <CircularGauge
            value={100 - inputs.moistureContent}
            max={100}
            label="Fuel Quality"
            unit="% dry"
            color="hsl(145 60% 45%)"
            size="lg"
            tooltip="Drier fuel = more energy"
          />
          <CircularGauge
            value={powerMW}
            max={30}
            label="Power Output"
            unit="MW"
            color="hsl(var(--accent))"
            size="lg"
            tooltip="Electrical power generated"
          />
        </div>

        {/* Renewable badge */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          transition={{ delay: 0.5 }}
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary/15 border border-primary/40">
            <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
            <span className="text-foreground font-medium">
              Renewable energy from sustainably managed sources
            </span>
            <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
          </div>
        </motion.div>

        <NarratorCaption text={`Your ${inputs.biomassType} plant converts ${thermalMW.toFixed(1)} MW thermal to ${powerMW.toFixed(1)} MW electric at ${outputs.plantEfficiency.toFixed(1)}% efficiency — powering about ${homesSupplied.toLocaleString()} homes! Adjust the controls to explore different configurations.`} />

        {/* End CTA */}
        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-muted-foreground mb-4">Thanks for exploring with Asha!</p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
          >
            ↑ Back to Top
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
};
