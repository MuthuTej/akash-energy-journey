import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { NarratorCaption } from "../NarratorCaption";
import { useSimulation } from "@/contexts/SimulationContext";

gsap.registerPlugin(ScrollTrigger);

export const ScrollStorage = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [fillLevel, setFillLevel] = useState(0);
  const { inputs } = useSimulation();

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animate fill level based on scroll
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 60%",
        end: "bottom 40%",
        onUpdate: (self) => {
          setFillLevel(Math.min(self.progress * 100, 85));
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Single truck weight based on feed rate
  const truckWeight = Math.round(20 + (inputs.feedRate / 1000) * 2);

  return (
    <section
      ref={sectionRef}
      id="storage"
      className="min-h-screen relative flex flex-col items-center justify-center py-20 px-4"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />

      <motion.div
        className="relative z-10 w-full max-w-5xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="section-title text-center mb-12">
          2. Storage & Weighing
        </h2>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
          {/* Storage illustration */}
          <div className="w-full max-w-md">
            <svg viewBox="0 0 400 350" className="w-full h-auto">
              {/* Weighbridge */}
              <motion.g
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
              >
                <rect x="30" y="280" width="100" height="15" fill="hsl(215 15% 35%)" rx="2" />
                <rect x="50" y="250" width="60" height="35" fill="hsl(220 18% 14%)" rx="3" />
                <text x="80" y="272" textAnchor="middle" className="fill-primary text-[10px] font-mono">
                  {truckWeight} t
                </text>
                <text x="80" y="310" textAnchor="middle" className="fill-muted-foreground text-[9px]">
                  Weighbridge
                </text>
              </motion.g>

              {/* Storage hopper */}
              <motion.g
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false }}
                transition={{ delay: 0.3 }}
              >
                {/* Hopper structure */}
                <path
                  d="M180 60 L320 60 L350 180 L360 300 L140 300 L150 180 Z"
                  fill="hsl(215 20% 28%)"
                  stroke="hsl(215 15% 40%)"
                  strokeWidth="2"
                />
                {/* Inner area */}
                <path
                  d="M190 70 L310 70 L338 175 L348 290 L152 290 L162 175 Z"
                  fill="hsl(220 20% 12%)"
                />
                {/* Biomass fill - animated */}
                <clipPath id="hopperClip">
                  <path d="M190 70 L310 70 L338 175 L348 290 L152 290 L162 175 Z" />
                </clipPath>
                <rect
                  x="150"
                  y={290 - (fillLevel * 2.2)}
                  width="200"
                  height={fillLevel * 2.2}
                  fill="hsl(30 50% 32%)"
                  clipPath="url(#hopperClip)"
                />
                {/* Wood chip texture */}
                {fillLevel > 20 && (
                  <>
                    {[170, 200, 230, 260, 290, 320].map((x, i) => (
                      <rect
                        key={i}
                        x={x}
                        y={290 - fillLevel * 2}
                        width={15}
                        height={12}
                        fill="hsl(25 45% 38%)"
                        rx="2"
                        clipPath="url(#hopperClip)"
                      />
                    ))}
                  </>
                )}
                {/* Labels */}
                <text x="250" y="45" textAnchor="middle" className="fill-foreground text-[11px] font-medium">
                  Storage Hopper
                </text>
                {/* Fill indicator */}
                <rect x="365" y="80" width="25" height="210" fill="hsl(220 18% 14%)" rx="3" />
                <rect
                  x="368"
                  y={287 - (fillLevel * 2.1)}
                  width="19"
                  height={fillLevel * 2.1}
                  fill="hsl(145 60% 40%)"
                  rx="2"
                />
                <text x="377" y="305" textAnchor="middle" className="fill-primary text-[9px] font-mono">
                  {Math.round(fillLevel)}%
                </text>
              </motion.g>

              {/* Conveyor hint */}
              <motion.path
                d="M130 300 L80 300 L80 285"
                stroke="hsl(145 60% 45%)"
                strokeWidth="3"
                fill="none"
                strokeDasharray="8 4"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: false }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
            </svg>
          </div>

          {/* Metrics panel with LIVE VALUES */}
          <div className="flex flex-col gap-4">
            <motion.div
              className="metric-card"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.2 }}
            >
              <span className="metric-label">Incoming Moisture</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="metric-value">{inputs.moistureContent}</span>
                <span className="text-xs text-muted-foreground">%</span>
              </div>
              <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-accent rounded-full"
                  animate={{ width: `${inputs.moistureContent}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>

            <motion.div
              className="metric-card"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.3 }}
            >
              <span className="metric-label">Fuel Type</span>
              <p className="text-primary font-medium mt-1">{inputs.biomassType}</p>
            </motion.div>

            <motion.div
              className="metric-card bg-accent/10 border-accent/30"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.4 }}
            >
              <span className="text-accent text-sm flex items-center gap-2">
                💡 Why moisture matters
              </span>
              <p className="text-xs text-muted-foreground mt-1">
                At {inputs.moistureContent}% moisture, energy is lost evaporating water. 
                {inputs.moistureContent > 30 ? " Consider drying!" : " Good level!"}
              </p>
            </motion.div>
          </div>
        </div>

        <div className="mt-12">
          <NarratorCaption text={`Each ${inputs.biomassType} delivery is weighed at ${truckWeight} tonnes and tested at ${inputs.moistureContent}% moisture. ${inputs.moistureContent > 25 ? "High moisture means we'll need more drying!" : "Good moisture level for efficient combustion!"}`} />
        </div>
      </motion.div>
    </section>
  );
};
