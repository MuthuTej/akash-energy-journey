import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { NarratorCaption } from "../NarratorCaption";

gsap.registerPlugin(ScrollTrigger);

export const ScrollFeeding = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const conveyorRef = useRef<SVGGElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".feed-particle",
        { x: 0 },
        {
          x: 200,
          ease: "none",
          stagger: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 50%",
            end: "bottom 50%",
            scrub: 1,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="feeding"
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
          4. Feeding System
        </h2>

        <div className="w-full max-w-3xl mx-auto mb-12">
          <svg viewBox="0 0 600 300" className="w-full h-auto">
            {/* Hopper */}
            <motion.g
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
            >
              <path
                d="M50 50 L150 50 L170 120 L30 120 Z"
                fill="hsl(215 20% 28%)"
                stroke="hsl(215 15% 40%)"
                strokeWidth="2"
              />
              <path d="M55 55 L145 55 L163 115 L37 115 Z" fill="hsl(30 50% 32%)" />
              <text x="100" y="40" textAnchor="middle" className="fill-muted-foreground text-[9px]">
                FUEL HOPPER
              </text>
            </motion.g>

            {/* Conveyor belt */}
            <g ref={conveyorRef}>
              <rect x="80" y="120" width="350" height="25" fill="hsl(215 20% 25%)" rx="3" />
              <rect x="85" y="125" width="340" height="15" fill="hsl(215 15% 18%)" rx="2" />
              
              {/* Belt texture lines */}
              {[100, 150, 200, 250, 300, 350, 400].map((x, i) => (
                <line
                  key={i}
                  x1={x}
                  y1="125"
                  x2={x}
                  y2="140"
                  stroke="hsl(215 15% 25%)"
                  strokeWidth="2"
                />
              ))}

              {/* Biomass particles on belt */}
              {[0, 1, 2, 3, 4].map((i) => (
                <rect
                  key={i}
                  className="feed-particle"
                  x={100 + i * 40}
                  y={122}
                  width={20}
                  height={12}
                  fill="hsl(30 50% 38%)"
                  rx="3"
                />
              ))}
            </g>

            {/* Drive motor */}
            <motion.g
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              transition={{ delay: 0.3 }}
            >
              <circle cx="430" cy="132" r="20" fill="hsl(145 50% 35%)" />
              <motion.g
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: "430px 132px" }}
              >
                <line x1="420" y1="132" x2="440" y2="132" stroke="hsl(145 70% 50%)" strokeWidth="3" />
                <line x1="430" y1="122" x2="430" y2="142" stroke="hsl(145 70% 50%)" strokeWidth="3" />
              </motion.g>
            </motion.g>

            {/* Feed chute to boiler */}
            <motion.g
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.4 }}
            >
              <path
                d="M430 125 L500 100 L520 100 L520 200 L480 200 L480 140 L430 140 Z"
                fill="hsl(215 20% 28%)"
                stroke="hsl(215 15% 40%)"
                strokeWidth="2"
              />
              
              {/* Falling particles */}
              {[0, 1, 2].map((i) => (
                <motion.rect
                  key={i}
                  x={495}
                  y={110 + i * 25}
                  width={15}
                  height={10}
                  fill="hsl(30 50% 38%)"
                  rx="2"
                  animate={{ y: [110 + i * 25, 190] }}
                  transition={{
                    delay: i * 0.3,
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                />
              ))}
            </motion.g>

            {/* Boiler inlet indicator */}
            <motion.g
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              transition={{ delay: 0.5 }}
            >
              <rect x="470" y="200" width="100" height="80" fill="hsl(215 20% 22%)" rx="5" />
              <rect x="475" y="205" width="90" height="70" fill="hsl(220 20% 12%)" rx="3" />
              
              {/* Flame hint */}
              <motion.ellipse
                cx="520"
                cy="250"
                rx="20"
                ry="15"
                fill="hsl(25 90% 50%)"
                animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
              
              <text x="520" y="295" textAnchor="middle" className="fill-accent text-[10px] font-medium">
                → TO BOILER
              </text>
            </motion.g>

            {/* Speed indicator */}
            <motion.g
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              transition={{ delay: 0.6 }}
            >
              <rect x="200" y="160" width="80" height="35" fill="hsl(220 18% 14%)" rx="4" />
              <text x="240" y="175" textAnchor="middle" className="fill-muted-foreground text-[8px]">
                FEED RATE
              </text>
              <text x="240" y="190" textAnchor="middle" className="fill-primary text-[12px] font-mono font-medium">
                18.5 t/hr
              </text>
            </motion.g>
          </svg>
        </div>

        {/* Metrics */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <motion.div
            className="metric-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
          >
            <span className="metric-label">Belt Speed</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="metric-value">0.5</span>
              <span className="text-xs text-muted-foreground">m/s</span>
            </div>
          </motion.div>

          <motion.div
            className="metric-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.1 }}
          >
            <span className="metric-label">Feed Rate</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="metric-value">18.5</span>
              <span className="text-xs text-muted-foreground">t/hr</span>
            </div>
          </motion.div>

          <motion.div
            className="metric-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.2 }}
          >
            <span className="metric-label">Control</span>
            <p className="text-primary font-medium mt-1 text-sm">Auto-regulated</p>
          </motion.div>
        </div>

        <NarratorCaption text="The conveyor belt delivers a precisely controlled flow of dried biomass into the boiler. Feed rate is automatically adjusted to match power demand." />
      </motion.div>
    </section>
  );
};
