import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { NarratorCaption } from "../NarratorCaption";

gsap.registerPlugin(ScrollTrigger);

export const ScrollEmissions = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [particulateBefore] = useState(500);
  const [particulateAfter, setParticulateAfter] = useState(500);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 50%",
        end: "bottom 50%",
        onUpdate: (self) => {
          setParticulateAfter(Math.max(10, 500 - self.progress * 490));
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const removalEfficiency = ((particulateBefore - particulateAfter) / particulateBefore * 100).toFixed(0);

  return (
    <section
      ref={sectionRef}
      id="emissions"
      className="min-h-screen relative flex flex-col items-center justify-center py-20 px-4"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-card/30 via-background to-card/50" />

      <motion.div
        className="relative z-10 w-full max-w-5xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="section-title text-center mb-12">
          10. Emission Control & Ash Handling
        </h2>

        <div className="w-full max-w-4xl mx-auto mb-12">
          <svg viewBox="0 0 700 280" className="w-full h-auto">
            {/* Boiler exhaust */}
            <motion.g
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
            >
              <rect x="30" y="100" width="70" height="100" fill="hsl(215 20% 28%)" rx="3" />
              <text x="65" y="90" textAnchor="middle" className="fill-muted-foreground text-[9px]">
                EXHAUST
              </text>
              <path d="M100 150 L140 150" stroke="hsl(200 20% 60%)" strokeWidth="6" />
              
              {/* Dirty particles */}
              {[0, 1, 2].map((i) => (
                <motion.circle
                  key={`dirty-${i}`}
                  cx={110}
                  cy={140 + i * 10}
                  r={4}
                  fill="hsl(30 30% 45%)"
                  animate={{ x: [0, 30], opacity: [0.8, 0.8, 0] }}
                  transition={{
                    delay: i * 0.2,
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                />
              ))}
            </motion.g>

            {/* ESP / Baghouse */}
            <motion.g
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.3 }}
            >
              <rect x="140" y="70" width="130" height="160" fill="hsl(215 20% 25%)" rx="5" />
              <rect x="150" y="80" width="110" height="140" fill="hsl(220 20% 12%)" rx="3" />
              
              {/* Filter bags */}
              {[170, 200, 230].map((x, i) => (
                <motion.rect
                  key={i}
                  x={x}
                  y="90"
                  width="18"
                  height="110"
                  fill="hsl(215 15% 35%)"
                  rx="4"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
                />
              ))}

              <text x="205" y="250" textAnchor="middle" className="fill-muted-foreground text-[9px]">
                ESP / BAGHOUSE
              </text>
            </motion.g>

            {/* Arrow to scrubber */}
            <motion.path
              d="M280 150 L320 150"
              stroke="hsl(145 60% 45%)"
              strokeWidth="4"
              markerEnd="url(#emArrow)"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: false }}
              transition={{ delay: 0.6, duration: 0.4 }}
            />

            {/* Scrubber */}
            <motion.g
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.5 }}
            >
              <rect x="320" y="80" width="100" height="140" fill="hsl(215 20% 28%)" rx="5" />
              <rect x="330" y="90" width="80" height="120" fill="hsl(220 20% 12%)" rx="3" />
              
              {/* Water spray */}
              {[0, 1, 2].map((i) => (
                <motion.circle
                  key={`spray-${i}`}
                  cx="370"
                  cy={110 + i * 35}
                  r={4}
                  fill="hsl(200 70% 60%)"
                  animate={{
                    scale: [0, 1.5, 0],
                    opacity: [0, 0.8, 0],
                    y: [0, 20],
                  }}
                  transition={{
                    delay: i * 0.4,
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                />
              ))}

              <text x="370" y="245" textAnchor="middle" className="fill-muted-foreground text-[9px]">
                WET SCRUBBER
              </text>
            </motion.g>

            {/* Arrow to stack */}
            <motion.path
              d="M430 150 L480 150"
              stroke="hsl(145 60% 45%)"
              strokeWidth="4"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: false }}
              transition={{ delay: 0.9, duration: 0.3 }}
            />

            {/* Stack */}
            <motion.g
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              transition={{ delay: 1 }}
            >
              <rect x="480" y="40" width="50" height="190" fill="hsl(215 20% 30%)" rx="3" />
              <rect x="475" y="35" width="60" height="12" fill="hsl(215 20% 35%)" rx="2" />
              
              {/* Clean exhaust */}
              {[0, 1, 2].map((i) => (
                <motion.ellipse
                  key={`clean-${i}`}
                  cx="505"
                  cy={30}
                  rx={12 + i * 6}
                  ry={6 + i * 3}
                  fill="hsl(200 20% 85%)"
                  opacity={0.25}
                  animate={{ y: [-10 * i, -40 - 10 * i], opacity: [0.25, 0], scale: [1, 1.3] }}
                  transition={{
                    delay: i * 0.4,
                    duration: 2.5,
                    repeat: Infinity,
                  }}
                />
              ))}

              <text x="505" y="250" textAnchor="middle" className="fill-muted-foreground text-[9px]">
                STACK
              </text>
            </motion.g>

            {/* Ash collection */}
            <motion.g
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              transition={{ delay: 0.8 }}
            >
              <rect x="580" y="120" width="90" height="60" fill="hsl(30 40% 28%)" rx="5" />
              <text x="625" y="155" textAnchor="middle" className="fill-muted-foreground text-[9px]">
                FLY ASH
              </text>
              <text x="625" y="170" textAnchor="middle" className="fill-primary text-[8px]">
                → Construction
              </text>
              
              {/* Ash falling */}
              <motion.rect
                x="185"
                y="230"
                width="12"
                height="8"
                fill="hsl(30 30% 45%)"
                rx="2"
                animate={{ y: [230, 250], opacity: [1, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
              <path d="M195 260 L195 280 L580 160" stroke="hsl(30 40% 40%)" strokeWidth="2" strokeDasharray="5 3" />
            </motion.g>

            <defs>
              <marker id="emArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="hsl(145 60% 45%)" />
              </marker>
            </defs>
          </svg>
        </div>

        {/* Metrics */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {/* Before/After comparison */}
          <motion.div
            className="metric-card min-w-[200px]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
          >
            <span className="metric-label">Particulate Removal</span>
            <div className="flex items-center gap-4 mt-3">
              <div className="text-center">
                <span className="text-sm text-destructive font-mono">{particulateBefore}</span>
                <span className="text-[9px] text-muted-foreground block">mg/Nm³</span>
                <span className="text-[8px] text-muted-foreground">Before</span>
              </div>
              <div className="flex-1 h-2 bg-muted rounded overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-destructive via-gauge-warning to-primary rounded transition-all duration-500"
                  style={{ width: `${100 - (particulateAfter / particulateBefore * 100)}%` }}
                />
              </div>
              <div className="text-center">
                <span className="text-sm text-primary font-mono">{particulateAfter.toFixed(0)}</span>
                <span className="text-[9px] text-muted-foreground block">mg/Nm³</span>
                <span className="text-[8px] text-muted-foreground">After</span>
              </div>
            </div>
            <p className="text-xs text-primary mt-2 text-center">{removalEfficiency}% removal</p>
          </motion.div>

          <motion.div
            className="metric-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.1 }}
          >
            <span className="metric-label">NOx Emissions</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="metric-value">0.15</span>
              <span className="text-xs text-muted-foreground">g/MJ</span>
            </div>
          </motion.div>

          <motion.div
            className="metric-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.2 }}
          >
            <span className="metric-label">Ash Recovery</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="metric-value">95</span>
              <span className="text-xs text-muted-foreground">%</span>
            </div>
          </motion.div>
        </div>

        <NarratorCaption text="Filters and scrubbers make sure the exhaust leaves the air clean. We capture 98% of particulates, and fly ash gets a second life in construction materials — nothing goes to waste!" />
      </motion.div>
    </section>
  );
};
