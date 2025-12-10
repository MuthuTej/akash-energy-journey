import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { NarratorCaption } from "../NarratorCaption";

gsap.registerPlugin(ScrollTrigger);

export const ScrollGenerator = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [power, setPower] = useState(0);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    if (!sectionRef.current) return;

    let animationFrame: number;
    let startTime = Date.now();

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 60%",
        end: "bottom 40%",
        onUpdate: (self) => {
          setPower(Math.min(25, self.progress * 30));
        },
      });
    }, sectionRef);

    const animate = () => {
      const elapsed = Date.now() - startTime;
      setRotation((elapsed / 1000) * 120);
      animationFrame = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      ctx.revert();
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="generator"
      className="min-h-screen relative flex flex-col items-center justify-center py-20 px-4 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-card/30 via-background to-card/30" />

      {/* Electric glow effect */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-accent/20 rounded-full blur-[100px]"
        animate={{ opacity: [0.2, 0.4, 0.2], scale: [0.9, 1.1, 0.9] }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      <motion.div
        className="relative z-10 w-full max-w-5xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="section-title text-center mb-12">
          8. Generator
        </h2>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
          {/* Generator illustration */}
          <div className="relative w-full max-w-md">
            <svg viewBox="0 0 400 350" className="w-full h-auto">
              {/* Turbine connection */}
              <motion.g
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
              >
                <rect x="20" y="140" width="80" height="70" fill="hsl(215 20% 28%)" rx="5" />
                <text x="60" y="130" textAnchor="middle" className="fill-muted-foreground text-[9px]">
                  TURBINE
                </text>
                
                {/* Rotating indicator */}
                <g style={{ transform: `rotate(${rotation}deg)`, transformOrigin: "60px 175px" }}>
                  <circle cx="60" cy="175" r="20" fill="hsl(215 20% 35%)" />
                  <line x1="60" y1="155" x2="60" y2="175" stroke="hsl(145 60% 50%)" strokeWidth="3" />
                </g>
              </motion.g>

              {/* Shaft */}
              <motion.rect
                x="100"
                y="165"
                width="80"
                height="20"
                fill="hsl(215 12% 45%)"
                rx="5"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: false }}
                transition={{ delay: 0.3, duration: 0.5 }}
                style={{ transformOrigin: "left" }}
              />

              {/* Generator body */}
              <motion.g
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false }}
                transition={{ delay: 0.5 }}
              >
                <rect x="180" y="100" width="150" height="150" fill="hsl(35 80% 45%)" rx="10" />
                <rect x="190" y="110" width="130" height="130" fill="hsl(35 70% 35%)" rx="8" />
                
                {/* Rotor */}
                <g style={{ transform: `rotate(${rotation}deg)`, transformOrigin: "255px 175px" }}>
                  <circle cx="255" cy="175" r="40" fill="hsl(35 60% 30%)" />
                  {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                    <rect
                      key={i}
                      x="250"
                      y="140"
                      width="10"
                      height="70"
                      fill="hsl(200 60% 50%)"
                      style={{
                        transformOrigin: "255px 175px",
                        transform: `rotate(${angle}deg)`,
                      }}
                    />
                  ))}
                </g>

                {/* Stator windings hint */}
                <circle cx="255" cy="175" r="55" fill="none" stroke="hsl(200 50% 40%)" strokeWidth="8" strokeDasharray="15 8" />

                <text x="255" y="270" textAnchor="middle" className="fill-foreground text-[11px] font-medium">
                  GENERATOR
                </text>
              </motion.g>

              {/* Power output lines */}
              <motion.g
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: false }}
                transition={{ delay: 0.8 }}
              >
                {[0, 1, 2].map((i) => (
                  <motion.path
                    key={i}
                    d={`M330 ${155 + i * 20} L380 ${155 + i * 20}`}
                    stroke={i === 0 ? "hsl(0 70% 50%)" : i === 1 ? "hsl(45 80% 50%)" : "hsl(200 70% 50%)"}
                    strokeWidth="4"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: false }}
                    transition={{ delay: 1 + i * 0.1, duration: 0.3 }}
                  />
                ))}
                <text x="380" y="185" className="fill-accent text-[9px] font-medium">
                  → GRID
                </text>
              </motion.g>

              {/* Electric sparks */}
              {power > 10 && [0, 1, 2, 3].map((i) => (
                <motion.circle
                  key={`spark-${i}`}
                  cx={340 + Math.random() * 30}
                  cy={150 + i * 15}
                  r={2}
                  fill="hsl(45 100% 70%)"
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0.5, 1.5, 0.5],
                  }}
                  transition={{
                    delay: i * 0.2,
                    duration: 0.5,
                    repeat: Infinity,
                  }}
                />
              ))}

              {/* Power meter */}
              <motion.g
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: 1.2 }}
              >
                <rect x="150" y="290" width="120" height="45" fill="hsl(220 18% 14%)" rx="5" />
                <text x="210" y="310" textAnchor="middle" className="fill-muted-foreground text-[9px]">
                  POWER OUTPUT
                </text>
                <text x="210" y="328" textAnchor="middle" className="fill-accent text-[16px] font-mono font-bold">
                  {power.toFixed(1)} MW
                </text>
              </motion.g>
            </svg>
          </div>

          {/* Metrics panel */}
          <div className="flex flex-col gap-4 w-full max-w-xs">
            <motion.div
              className="metric-card"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
            >
              <span className="metric-label">Power Output</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="metric-value text-accent text-2xl">{power.toFixed(1)}</span>
                <span className="text-sm text-muted-foreground">MW</span>
              </div>
              <div className="mt-3 h-3 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    width: `${(power / 30) * 100}%`,
                    background: "linear-gradient(90deg, hsl(35 80% 45%), hsl(45 90% 55%))",
                  }}
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
              <span className="metric-label">Voltage Output</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="metric-value">11</span>
                <span className="text-xs text-muted-foreground">kV (3-phase)</span>
              </div>
            </motion.div>

            <motion.div
              className="metric-card"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.2 }}
            >
              <span className="metric-label">Frequency</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="metric-value">50</span>
                <span className="text-xs text-muted-foreground">Hz</span>
              </div>
            </motion.div>

            <motion.div
              className="metric-card bg-accent/10 border-accent/30"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.3 }}
            >
              <span className="text-accent text-sm flex items-center gap-2">
                ⚡ Electromagnetic Induction
              </span>
              <p className="text-xs text-muted-foreground mt-1">
                Spinning magnets create electric current in copper windings
              </p>
            </motion.div>
          </div>
        </div>

        <div className="mt-12">
          <NarratorCaption text="The generator turns rotation into electricity through electromagnetic induction. Spinning magnets inside copper coils create 25 megawatts of clean power — enough for 50,000 homes!" />
        </div>
      </motion.div>
    </section>
  );
};
