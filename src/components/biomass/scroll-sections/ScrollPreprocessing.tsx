import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { NarratorCaption } from "../NarratorCaption";

gsap.registerPlugin(ScrollTrigger);

export const ScrollPreprocessing = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [bladeRotation, setBladeRotation] = useState(0);
  const [moisture, setMoisture] = useState(35);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 50%",
        end: "bottom 50%",
        onUpdate: (self) => {
          setBladeRotation(self.progress * 720);
          setMoisture(Math.max(15, 35 - self.progress * 20));
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="preprocessing"
      className="min-h-screen relative flex flex-col items-center justify-center py-20 px-4"
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
          3. Pre-Processing
        </h2>

        <div className="w-full max-w-4xl mx-auto mb-12">
          <svg viewBox="0 0 700 280" className="w-full h-auto">
            {/* Chipper */}
            <g>
              <rect x="50" y="100" width="140" height="120" fill="hsl(215 20% 28%)" rx="5" />
              <rect x="60" y="110" width="120" height="100" fill="hsl(220 20% 12%)" rx="3" />
              
              {/* Rotating blade */}
              <g style={{ transform: `rotate(${bladeRotation}deg)`, transformOrigin: "120px 160px" }}>
                {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                  <rect
                    key={i}
                    x="115"
                    y="130"
                    width="10"
                    height="60"
                    fill="hsl(215 12% 55%)"
                    style={{
                      transformOrigin: "120px 160px",
                      transform: `rotate(${angle}deg)`,
                    }}
                  />
                ))}
              </g>

              {/* Input */}
              <path d="M20 80 L60 100 L60 140 L20 120 Z" fill="hsl(215 20% 32%)" />
              
              {/* Particles entering */}
              <motion.g
                initial={{ x: 0 }}
                animate={{ x: [0, 30, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <rect x="25" y="95" width="12" height="8" fill="hsl(30 50% 38%)" rx="2" />
                <rect x="30" y="108" width="10" height="6" fill="hsl(25 45% 42%)" rx="1" />
              </motion.g>

              <text x="120" y="240" textAnchor="middle" className="fill-muted-foreground text-[10px]">
                CHIPPER
              </text>
            </g>

            {/* Arrow */}
            <motion.path
              d="M200 160 L260 160"
              stroke="hsl(145 60% 45%)"
              strokeWidth="4"
              fill="none"
              markerEnd="url(#scrollArrow)"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: false }}
              transition={{ delay: 0.3, duration: 0.5 }}
            />

            {/* Rotary Dryer */}
            <g>
              <ellipse cx="290" cy="160" rx="20" ry="50" fill="hsl(215 20% 32%)" />
              <rect x="290" y="110" width="200" height="100" fill="hsl(215 20% 28%)" />
              <ellipse cx="490" cy="160" rx="20" ry="50" fill="hsl(215 20% 35%)" />
              
              {/* Inner */}
              <rect x="295" y="115" width="190" height="90" fill="hsl(220 20% 12%)" />
              
              {/* Rotating flights */}
              <g style={{ transform: `rotate(${-bladeRotation * 0.5}deg)`, transformOrigin: "390px 160px" }}>
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                  <line
                    key={i}
                    x1="310"
                    y1="160"
                    x2="470"
                    y2="160"
                    stroke="hsl(215 15% 35%)"
                    strokeWidth="2"
                    style={{
                      transformOrigin: "390px 160px",
                      transform: `rotate(${angle}deg)`,
                    }}
                  />
                ))}
              </g>

              {/* Heat indicator */}
              <motion.rect
                x="300"
                y="215"
                width="180"
                height="12"
                fill="hsl(25 90% 50%)"
                rx="2"
                animate={{ opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <text x="390" y="224" textAnchor="middle" className="fill-background text-[8px] font-medium">
                HOT AIR FLOW
              </text>

              {/* Steam escaping */}
              {[320, 370, 420, 470].map((x, i) => (
                <motion.ellipse
                  key={i}
                  cx={x}
                  cy={105}
                  rx={8}
                  ry={5}
                  fill="hsl(200 20% 80%)"
                  initial={{ y: 0, opacity: 0.5 }}
                  animate={{ y: -20, opacity: 0 }}
                  transition={{
                    delay: i * 0.3,
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
              ))}

              <text x="390" y="255" textAnchor="middle" className="fill-muted-foreground text-[10px]">
                ROTARY DRYER
              </text>
            </g>

            {/* Output */}
            <g>
              <path d="M510 145 L560 125 L560 195 L510 175 Z" fill="hsl(215 20% 32%)" />
              
              {/* Dried particles */}
              {[0, 1, 2].map((i) => (
                <motion.rect
                  key={i}
                  x={530}
                  y={145 + i * 15}
                  width={8}
                  height={6}
                  fill="hsl(35 50% 45%)"
                  rx="1"
                  initial={{ x: 510 }}
                  animate={{ x: 580 }}
                  transition={{
                    delay: i * 0.3,
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                />
              ))}
            </g>

            {/* Arrow marker */}
            <defs>
              <marker id="scrollArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="hsl(145 60% 45%)" />
              </marker>
            </defs>
          </svg>
        </div>

        {/* Live metrics */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <motion.div
            className="metric-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
          >
            <span className="metric-label">Particle Size</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="metric-value">&lt; 50</span>
              <span className="text-xs text-muted-foreground">mm</span>
            </div>
          </motion.div>

          <motion.div
            className="metric-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.1 }}
          >
            <span className="metric-label">Output Moisture</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="metric-value">{moisture.toFixed(0)}</span>
              <span className="text-xs text-muted-foreground">%</span>
            </div>
            <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-300"
                style={{ width: `${moisture}%` }}
              />
            </div>
          </motion.div>

          <motion.div
            className="metric-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.2 }}
          >
            <span className="metric-label">LHV Increase</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="metric-value text-primary">+25%</span>
            </div>
          </motion.div>
        </div>

        <NarratorCaption text="The chipper reduces particle size while the rotary dryer removes moisture. Watch the energy value climb as water content drops — drier fuel means more power!" />
      </motion.div>
    </section>
  );
};
