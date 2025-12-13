import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { NarratorCaption } from "../NarratorCaption";
import { SteamParticles } from "../ParticleEffects";
import { useSimulation } from "@/contexts/SimulationContext";
import { CircularGauge, NumericCounter } from "../OutputDisplay";

gsap.registerPlugin(ScrollTrigger);

export const ScrollTurbine = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { outputs } = useSimulation();
  const [bladeRotation, setBladeRotation] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (!sectionRef.current) return;

    let animationFrame: number;
    let startTime = Date.now();

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=150%",
        pin: true,
        pinSpacing: true,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        },
      });
    }, sectionRef);

    // Continuous blade rotation based on turbine speed
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const speedFactor = outputs.turbineSpeed / 3000;
      setBladeRotation((elapsed / 1000) * 180 * speedFactor);
      animationFrame = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      ctx.revert();
      cancelAnimationFrame(animationFrame);
    };
  }, [outputs.turbineSpeed]);

  // Visual effects based on simulation
  const speedIntensity = (outputs.turbineSpeed - 2400) / 600;
  const showSparks = outputs.turbineSpeed > 2700;

  return (
    <section
      ref={sectionRef}
      id="turbine"
      className="min-h-screen relative flex flex-col items-center justify-center py-12 px-4 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-card/50 via-background to-card/30" />

      <motion.div
        className="relative z-10 w-full max-w-6xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="section-title text-center mb-8">
          7. Steam Turbine
        </h2>

        {/* Turbine cross-section */}
        <div className="relative w-full max-w-2xl mx-auto mb-8">
          <svg viewBox="0 0 600 280" className="w-full h-auto">
            <defs>
              <linearGradient id="turbineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(215 20% 35%)" />
                <stop offset="50%" stopColor="hsl(215 15% 45%)" />
                <stop offset="100%" stopColor="hsl(215 20% 35%)" />
              </linearGradient>
            </defs>

            {/* Casing */}
            <motion.path
              d="M50 140 Q50 70 100 50 L500 50 Q550 70 550 140 Q550 210 500 230 L100 230 Q50 210 50 140"
              fill="url(#turbineGrad)"
              stroke="hsl(215 15% 55%)"
              strokeWidth="2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
            />

            {/* Inner chamber */}
            <path
              d="M70 140 Q70 90 110 75 L490 75 Q530 90 530 140 Q530 190 490 205 L110 205 Q70 190 70 140"
              fill="hsl(220 20% 10%)"
            />

            {/* Shaft */}
            <rect x="80" y="130" width="440" height="20" rx="10" fill="hsl(215 12% 45%)" />

            {/* HP Stage */}
            <g style={{ transform: `rotate(${bladeRotation}deg)`, transformOrigin: "140px 140px" }}>
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                <rect
                  key={`hp-${i}`}
                  x="135"
                  y="105"
                  width="10"
                  height="70"
                  rx="2"
                  fill="hsl(145 60% 40%)"
                  style={{
                    transformOrigin: "140px 140px",
                    transform: `rotate(${angle}deg)`,
                  }}
                />
              ))}
            </g>
            <text x="140" y="195" textAnchor="middle" className="fill-primary text-[10px] font-medium">
              HP
            </text>

            {/* MP Stage */}
            <g style={{ transform: `rotate(${bladeRotation}deg)`, transformOrigin: "300px 140px" }}>
              {[0, 40, 80, 120, 160, 200, 240, 280, 320].map((angle, i) => (
                <rect
                  key={`mp-${i}`}
                  x="293"
                  y="95"
                  width="14"
                  height="90"
                  rx="2"
                  fill="hsl(145 55% 45%)"
                  style={{
                    transformOrigin: "300px 140px",
                    transform: `rotate(${angle}deg)`,
                  }}
                />
              ))}
            </g>
            <text x="300" y="200" textAnchor="middle" className="fill-primary text-[10px] font-medium">
              MP
            </text>

            {/* LP Stage */}
            <g style={{ transform: `rotate(${bladeRotation}deg)`, transformOrigin: "460px 140px" }}>
              {[0, 36, 72, 108, 144, 180, 216, 252, 288, 324].map((angle, i) => (
                <rect
                  key={`lp-${i}`}
                  x="450"
                  y="85"
                  width="18"
                  height="110"
                  rx="3"
                  fill="hsl(145 50% 50%)"
                  style={{
                    transformOrigin: "460px 140px",
                    transform: `rotate(${angle}deg)`,
                  }}
                />
              ))}
            </g>
            <text x="460" y="210" textAnchor="middle" className="fill-primary text-[10px] font-medium">
              LP
            </text>

            {/* Steam inlet */}
            <motion.g
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
            >
              <rect x="20" y="120" width="35" height="40" fill="hsl(200 80% 60%)" rx="3" opacity={0.6} />
              <text x="37" y="105" textAnchor="middle" className="fill-steam text-[9px]">
                STEAM IN
              </text>
            </motion.g>

            {/* Velocity lines - animated based on speed */}
            {[0, 1, 2].map((i) => (
              <motion.path
                key={i}
                d={`M${100 + i * 160} 140 Q${180 + i * 160} ${135 - i * 5} ${260 + i * 160} 140`}
                fill="none"
                stroke="hsl(200 80% 70%)"
                strokeWidth="2"
                strokeDasharray="6 4"
                animate={{
                  strokeDashoffset: [0, -20],
                }}
                transition={{
                  duration: Math.max(0.3, 1 - speedIntensity * 0.5),
                  repeat: Infinity,
                  ease: "linear",
                }}
                opacity={0.5}
              />
            ))}

            {/* RPM indicator */}
            <rect x="250" y="240" width="100" height="30" rx="5" fill="hsl(220 18% 14%)" />
            <text x="300" y="260" textAnchor="middle" className="fill-primary text-[12px] font-mono font-medium">
              {outputs.turbineSpeed} rpm
            </text>

            {/* Sparkle effects near blades */}
            {showSparks && [0, 1, 2].map((i) => (
              <motion.circle
                key={`spark-${i}`}
                cx={140 + i * 160}
                cy={100}
                r={2}
                fill="hsl(200 100% 80%)"
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0.5, 1.5, 0.5],
                  y: [0, -20, 0],
                }}
                transition={{
                  delay: i * 0.3,
                  duration: 1,
                  repeat: Infinity,
                }}
              />
            ))}
          </svg>

          <SteamParticles count={4} originX={8} originY={45} spread={5} />
        </div>

        {/* Metrics row */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <motion.div
            className="metric-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
          >
            <span className="metric-label">Steam Inlet</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="metric-value">{outputs.boilerSteamPressure.toFixed(0)}</span>
              <span className="text-xs text-muted-foreground">bar / {outputs.boilerSteamTemp}°C</span>
            </div>
          </motion.div>

          <motion.div
            className="metric-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.1 }}
          >
            <span className="metric-label">Turbine Speed</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="metric-value">{outputs.turbineSpeed}</span>
              <span className="text-xs text-muted-foreground">rpm</span>
            </div>
          </motion.div>

          <motion.div
            className="metric-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.2 }}
          >
            <span className="metric-label">Stages</span>
            <p className="text-primary font-medium mt-1">HP → MP → LP</p>
          </motion.div>

          <motion.div
            className="metric-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.3 }}
          >
            <span className="metric-label">Efficiency</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="metric-value">{(85 + speedIntensity * 7).toFixed(0)}</span>
              <span className="text-xs text-muted-foreground">%</span>
            </div>
          </motion.div>
        </div>

        <NarratorCaption text={`Steam at ${outputs.boilerSteamPressure.toFixed(0)} bar expands through HP, MP, and LP stages, spinning the shaft at ${outputs.turbineSpeed} RPM. This mechanical energy will power the generator!`} />
      </motion.div>
    </section>
  );
};
