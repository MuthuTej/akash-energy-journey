import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { NarratorCaption } from "../NarratorCaption";
import { SteamParticles } from "../ParticleEffects";

gsap.registerPlugin(ScrollTrigger);

export const ScrollSteam = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [pressure, setPressure] = useState(0);
  const [temp, setTemp] = useState(200);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 60%",
        end: "bottom 40%",
        onUpdate: (self) => {
          setPressure(Math.min(85, self.progress * 100));
          setTemp(Math.min(540, 200 + self.progress * 400));
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="steam"
      className="min-h-screen relative flex flex-col items-center justify-center py-20 px-4 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-card/30 via-background to-card/30" />

      {/* Steam ambient effect */}
      <motion.div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-steam/10 rounded-full blur-[80px]"
        animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.1, 1] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      <motion.div
        className="relative z-10 w-full max-w-5xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="section-title text-center mb-12">
          6. Steam Generation
        </h2>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
          {/* Steam system illustration */}
          <div className="relative w-full max-w-lg">
            <svg viewBox="0 0 500 300" className="w-full h-auto">
              {/* Boiler water tubes */}
              <motion.g
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: false }}
              >
                <rect x="30" y="80" width="120" height="180" fill="hsl(215 20% 28%)" rx="5" />
                <text x="90" y="70" textAnchor="middle" className="fill-muted-foreground text-[10px]">
                  WATER TUBES
                </text>
                
                {/* Tubes */}
                {[50, 80, 110, 140].map((x, i) => (
                  <g key={i}>
                    <rect x={x} y="95" width="8" height="150" fill="hsl(215 12% 45%)" rx="4" />
                    {/* Water/steam flow */}
                    <motion.circle
                      cx={x + 4}
                      cy="200"
                      r="3"
                      fill="hsl(200 80% 60%)"
                      animate={{ y: [-80, -140] }}
                      transition={{
                        delay: i * 0.2,
                        duration: 2,
                        repeat: Infinity,
                      }}
                    />
                  </g>
                ))}

                {/* Heat source */}
                <motion.rect
                  x="40"
                  y="260"
                  width="100"
                  height="15"
                  fill="hsl(25 90% 50%)"
                  rx="2"
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </motion.g>

              {/* Arrow to superheater */}
              <motion.path
                d="M160 150 L200 150"
                stroke="hsl(200 80% 60%)"
                strokeWidth="4"
                strokeDasharray="8 4"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: false }}
                transition={{ delay: 0.3, duration: 0.5 }}
              />

              {/* Superheater */}
              <motion.g
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ delay: 0.4 }}
              >
                <rect x="200" y="80" width="100" height="140" fill="hsl(215 20% 28%)" rx="5" />
                <text x="250" y="70" textAnchor="middle" className="fill-muted-foreground text-[10px]">
                  SUPERHEATER
                </text>
                
                {/* Coils */}
                <path
                  d="M215 100 Q230 100 230 115 Q230 130 245 130 Q260 130 260 145 Q260 160 275 160 Q290 160 290 175 Q290 190 275 190"
                  fill="none"
                  stroke="hsl(25 80% 50%)"
                  strokeWidth="6"
                />
                
                {/* Glow effect */}
                <motion.rect
                  x="210"
                  y="90"
                  width="80"
                  height="120"
                  fill="hsl(25 90% 50%)"
                  opacity={0.2}
                  rx="3"
                  animate={{ opacity: [0.1, 0.3, 0.1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </motion.g>

              {/* Arrow to drum */}
              <motion.path
                d="M310 150 L350 150"
                stroke="hsl(200 80% 70%)"
                strokeWidth="4"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: false }}
                transition={{ delay: 0.6, duration: 0.5 }}
              />

              {/* Steam drum */}
              <motion.g
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ delay: 0.7 }}
              >
                <ellipse cx="420" cy="150" rx="60" ry="80" fill="hsl(215 20% 30%)" stroke="hsl(215 15% 45%)" strokeWidth="2" />
                <text x="420" y="250" textAnchor="middle" className="fill-muted-foreground text-[10px]">
                  STEAM DRUM
                </text>
                
                {/* Pressure gauge */}
                <circle cx="420" cy="130" r="25" fill="hsl(220 18% 14%)" />
                <text x="420" y="135" textAnchor="middle" className="fill-primary text-[10px] font-mono">
                  {pressure.toFixed(0)} bar
                </text>
                
                {/* Temperature */}
                <rect x="395" y="160" width="50" height="20" fill="hsl(220 18% 14%)" rx="3" />
                <text x="420" y="175" textAnchor="middle" className="fill-accent text-[9px] font-mono">
                  {temp.toFixed(0)}°C
                </text>

                {/* Steam output */}
                <motion.path
                  d="M420 70 L420 40"
                  stroke="hsl(200 80% 70%)"
                  strokeWidth="6"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: false }}
                  transition={{ delay: 1, duration: 0.4 }}
                />
                <text x="420" y="30" textAnchor="middle" className="fill-primary text-[9px] font-medium">
                  → TO TURBINE
                </text>
              </motion.g>
            </svg>

            {/* Steam particles */}
            <SteamParticles count={6} originX={84} originY={12} spread={10} />
          </div>

          {/* Metrics */}
          <div className="flex flex-col gap-4 w-full max-w-xs">
            <motion.div
              className="metric-card"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
            >
              <span className="metric-label">Steam Pressure</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="metric-value">{pressure.toFixed(0)}</span>
                <span className="text-xs text-muted-foreground">bar</span>
              </div>
              <div className="mt-2 h-2 bg-muted rounded-full">
                <motion.div
                  className="h-full bg-primary rounded-full"
                  style={{ width: `${(pressure / 100) * 100}%` }}
                />
              </div>
            </motion.div>

            <motion.div
              className="metric-card"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.1 }}
            >
              <span className="metric-label">Steam Temperature</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="metric-value text-accent">{temp.toFixed(0)}</span>
                <span className="text-xs text-muted-foreground">°C</span>
              </div>
            </motion.div>

            <motion.div
              className="metric-card"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.2 }}
            >
              <span className="metric-label">Steam Flow</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="metric-value">95</span>
                <span className="text-xs text-muted-foreground">t/hr</span>
              </div>
            </motion.div>

            <motion.div
              className="metric-card bg-primary/10 border-primary/30"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.3 }}
            >
              <span className="text-primary text-sm">✨ Superheated Steam</span>
              <p className="text-xs text-muted-foreground mt-1">
                Steam is heated beyond boiling point for maximum turbine efficiency
              </p>
            </motion.div>
          </div>
        </div>

        <div className="mt-12">
          <NarratorCaption text="Heat from combustion transforms water into high-pressure steam. The superheater pushes temperatures even higher — hotter steam means more power from our turbine!" />
        </div>
      </motion.div>
    </section>
  );
};
