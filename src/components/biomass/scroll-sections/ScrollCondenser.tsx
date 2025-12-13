import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { NarratorCaption } from "../NarratorCaption";
import { useSimulation } from "@/contexts/SimulationContext";

gsap.registerPlugin(ScrollTrigger);

export const ScrollCondenser = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { inputs, outputs } = useSimulation();

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 60%",
        end: "bottom 40%",
        toggleClass: "active",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Cooling water flow scales with power output
  const coolingFlow = Math.round(8000 + (outputs.electricalPowerOutput / 1000) * 400);
  // Pump speed based on steam production
  const pumpDuration = Math.max(0.8, 3 - (outputs.fuelEnergyInput / 30000) * 2);

  return (
    <section
      ref={sectionRef}
      id="condenser"
      className="min-h-screen relative flex flex-col items-center justify-center py-20 px-4 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-card/30 via-background to-card/30" />

      <motion.div
        className="relative z-10 w-full max-w-5xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="section-title text-center mb-12">
          9. Condenser & Feedwater Loop
        </h2>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
          {/* Condenser illustration */}
          <div className="w-full max-w-lg">
            <svg viewBox="0 0 550 320" className="w-full h-auto">
              {/* Condenser shell */}
              <motion.g
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
              >
                <rect x="50" y="80" width="180" height="140" rx="10" fill="hsl(215 20% 28%)" stroke="hsl(215 15% 40%)" strokeWidth="2" />
                
                {/* Cooling tubes - flow speed based on cooling demand */}
                {[100, 130, 160, 190].map((y, i) => (
                  <g key={i}>
                    <line x1="60" y1={y} x2="220" y2={y} stroke="hsl(200 60% 50%)" strokeWidth="5" />
                    {/* Water flow - speed based on power output */}
                    <motion.circle
                      cx="60"
                      cy={y}
                      r="4"
                      fill="hsl(200 80% 70%)"
                      animate={{ x: [0, 160, 0] }}
                      transition={{
                        delay: i * 0.2,
                        duration: pumpDuration,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  </g>
                ))}

                {/* Steam inlet */}
                <path d="M140 50 L140 80" stroke="hsl(200 80% 70%)" strokeWidth="8" />
                <text x="140" y="40" textAnchor="middle" className="fill-steam text-[9px]">
                  EXHAUST STEAM
                </text>
                
                {/* Steam condensing - amount based on steam production */}
                {[0, 1, 2].map((i) => (
                  <motion.circle
                    key={i}
                    cx={120 + i * 20}
                    cy={70}
                    r={4 + (outputs.fuelEnergyInput / 20000)}
                    fill="hsl(200 80% 80%)"
                    animate={{
                      y: [0, 30],
                      opacity: [0.7, 0],
                      scale: [1, 0.3],
                    }}
                    transition={{
                      delay: i * 0.3,
                      duration: 1.5,
                      repeat: Infinity,
                    }}
                  />
                ))}

                {/* Condensate outlet */}
                <path d="M140 220 L140 260" stroke="hsl(200 60% 50%)" strokeWidth="6" />
                <text x="140" y="280" textAnchor="middle" className="fill-primary text-[9px]">
                  CONDENSATE
                </text>

                <text x="140" y="235" textAnchor="middle" className="fill-muted-foreground text-[10px]">
                  CONDENSER
                </text>
              </motion.g>

              {/* Pipe to pump */}
              <motion.path
                d="M140 260 L140 290 Q140 300 150 300 L280 300 Q290 300 290 290 L290 250"
                fill="none"
                stroke="hsl(200 60% 50%)"
                strokeWidth="5"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: false }}
                transition={{ delay: 0.3, duration: 0.8 }}
              />

              {/* Feedwater pump - speed based on steam production */}
              <motion.g
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false }}
                transition={{ delay: 0.5 }}
              >
                <circle cx="320" cy="220" r="35" fill="hsl(215 20% 28%)" stroke="hsl(145 60% 45%)" strokeWidth="2" />
                <motion.g
                  animate={{ rotate: 360 }}
                  transition={{ duration: pumpDuration, repeat: Infinity, ease: "linear" }}
                  style={{ transformOrigin: "320px 220px" }}
                >
                  <line x1="300" y1="220" x2="340" y2="220" stroke="hsl(145 60% 50%)" strokeWidth="4" />
                  <line x1="320" y1="200" x2="320" y2="240" stroke="hsl(145 60% 50%)" strokeWidth="4" />
                </motion.g>
                <text x="320" y="275" textAnchor="middle" className="fill-muted-foreground text-[9px]">
                  FEEDWATER PUMP
                </text>
              </motion.g>

              {/* Pipe back to boiler */}
              <motion.path
                d="M355 220 L420 220 L420 130 L500 130"
                fill="none"
                stroke="hsl(200 60% 50%)"
                strokeWidth="5"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: false }}
                transition={{ delay: 0.8, duration: 0.6 }}
              />

              {/* Return indicator */}
              <motion.g
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: false }}
                transition={{ delay: 1.2 }}
              >
                <rect x="460" y="100" width="80" height="60" fill="hsl(215 20% 22%)" rx="5" />
                <text x="500" y="125" textAnchor="middle" className="fill-accent text-[10px] font-medium">
                  → BOILER
                </text>
                <text x="500" y="145" textAnchor="middle" className="fill-muted-foreground text-[8px]">
                  Feedwater Return
                </text>
              </motion.g>

              {/* Closed loop indicator */}
              <motion.g
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false }}
                transition={{ delay: 1.4 }}
              >
                <rect x="280" y="60" width="100" height="35" rx="5" fill="hsl(145 60% 40%)" />
                <text x="330" y="82" textAnchor="middle" className="fill-background text-[11px] font-medium">
                  CLOSED LOOP
                </text>
              </motion.g>
            </svg>
          </div>

          {/* Metrics panel with LIVE VALUES */}
          <div className="flex flex-col gap-4 w-full max-w-xs">
            <motion.div
              className="metric-card"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
            >
              <span className="metric-label">Condenser Pressure</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="metric-value">0.05</span>
                <span className="text-xs text-muted-foreground">bar (vacuum)</span>
              </div>
            </motion.div>

            <motion.div
              className="metric-card"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.1 }}
            >
              <span className="metric-label">Cooling Water Flow</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="metric-value">{coolingFlow.toLocaleString()}</span>
                <span className="text-xs text-muted-foreground">m³/hr</span>
              </div>
              <p className="text-[10px] text-muted-foreground mt-1">
                Scaled to {(outputs.electricalPowerOutput / 1000).toFixed(1)} MW output
              </p>
            </motion.div>

            <motion.div
              className="metric-card"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.2 }}
            >
              <span className="metric-label">Plant Efficiency</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="metric-value">{outputs.plantEfficiency.toFixed(1)}</span>
                <span className="text-xs text-muted-foreground">%</span>
              </div>
              <div className="mt-2 h-3 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  animate={{ width: `${(outputs.plantEfficiency / 50) * 100}%` }}
                  transition={{ duration: 0.3 }}
                  style={{
                    background: "linear-gradient(90deg, hsl(145 60% 40%), hsl(145 70% 55%))",
                  }}
                />
              </div>
            </motion.div>

            <motion.div
              className="metric-card bg-primary/10 border-primary/30"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.3 }}
            >
              <span className="text-primary text-sm">🔄 Zero Water Waste</span>
              <p className="text-xs text-muted-foreground mt-1">
                All water recycled in closed loop — {coolingFlow.toLocaleString()} m³/hr flow
              </p>
            </motion.div>
          </div>
        </div>

        <div className="mt-12">
          <NarratorCaption text={`Exhaust steam condenses back to water. The pump returns it to the boiler at ${coolingFlow.toLocaleString()} m³/hr — achieving ${outputs.plantEfficiency.toFixed(1)}% overall efficiency!`} />
        </div>
      </motion.div>
    </section>
  );
};
