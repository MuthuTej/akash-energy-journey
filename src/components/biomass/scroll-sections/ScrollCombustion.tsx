import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { NarratorCaption } from "../NarratorCaption";
import { FlameEffect, SteamParticles } from "../ParticleEffects";

gsap.registerPlugin(ScrollTrigger);

export const ScrollCombustion = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [o2Level, setO2Level] = useState(21);
  const [coLevel, setCoLevel] = useState(0.05);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Pin this section for detailed viewing
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=100%",
        pin: true,
        pinSpacing: true,
        onUpdate: (self) => {
          // Simulate combustion optimization
          setO2Level(21 - self.progress * 3);
          setCoLevel(Math.max(0.01, 0.05 - self.progress * 0.03));
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="combustion"
      className="min-h-screen relative flex flex-col items-center justify-center py-12 px-4 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-card/50 via-background to-card/30" />

      {/* Ambient glow effect */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent/20 rounded-full blur-[100px]"
        animate={{ opacity: [0.3, 0.5, 0.3] }}
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

              {/* Steam tubes */}
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
                  {/* Steam flow dots */}
                  <motion.circle
                    cx={x + 6}
                    cy="90"
                    r="3"
                    fill="hsl(200 80% 70%)"
                    animate={{ y: [0, -40, -80], opacity: [0.8, 0.5, 0] }}
                    transition={{
                      delay: i * 0.15,
                      duration: 2,
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
              {/* Primary air */}
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

            {/* Flame effect */}
            <div className="absolute bottom-[22%] left-1/2 -translate-x-1/2">
              <FlameEffect width={100} height={120} />
            </div>

            {/* Steam particles */}
            <SteamParticles count={8} originX={50} originY={15} spread={30} />
          </div>

          {/* Metrics panel */}
          <div className="flex flex-col gap-4 w-full max-w-xs">
            {/* O2 Gauge */}
            <motion.div
              className="metric-card"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
            >
              <span className="metric-label">O₂ Level</span>
              <div className="flex items-center gap-4 mt-2">
                <div className="relative w-20 h-20">
                  <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="hsl(var(--primary))"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={251}
                      strokeDashoffset={251 - (o2Level / 25) * 251}
                      className="transition-all duration-300"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="metric-value text-sm">{o2Level.toFixed(1)}%</span>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">
                  Optimal: 18-21%
                </div>
              </div>
            </motion.div>

            {/* CO Gauge */}
            <motion.div
              className="metric-card"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.1 }}
            >
              <span className="metric-label">CO Level</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="metric-value">{(coLevel * 100).toFixed(1)}</span>
                <span className="text-xs text-muted-foreground">ppm</span>
              </div>
              <div className="mt-2 h-2 bg-muted rounded-full">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-300"
                  style={{ width: `${coLevel * 100}%` }}
                />
              </div>
            </motion.div>

            {/* Temperature */}
            <motion.div
              className="metric-card"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.2 }}
            >
              <span className="metric-label">Bed Temperature</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="metric-value text-accent">850</span>
                <span className="text-xs text-muted-foreground">°C</span>
              </div>
            </motion.div>

            {/* Combustion type */}
            <motion.div
              className="metric-card"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.3 }}
            >
              <span className="metric-label">Type</span>
              <p className="text-primary font-medium mt-1">Grate-Fired</p>
              <p className="text-xs text-muted-foreground mt-1">
                Staged combustion for efficiency
              </p>
            </motion.div>
          </div>
        </div>

        <div className="mt-8">
          <NarratorCaption text="We feed dry chips into the boiler — hotter, drier fuel means more energy! Staged combustion with primary and secondary air keeps O₂ levels optimal and CO emissions low." />
        </div>
      </motion.div>
    </section>
  );
};
