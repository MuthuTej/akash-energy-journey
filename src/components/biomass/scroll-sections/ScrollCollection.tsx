import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { NarratorCaption } from "../NarratorCaption";
import { useSimulation } from "@/contexts/SimulationContext";

gsap.registerPlugin(ScrollTrigger);

export const ScrollCollection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const truckRef = useRef<SVGGElement>(null);
  const treesRef = useRef<SVGGElement>(null);
  const { inputs } = useSimulation();

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Truck drives in
      gsap.fromTo(
        truckRef.current,
        { x: -300 },
        {
          x: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "top 20%",
            scrub: 1,
          },
        }
      );

      // Trees appear
      gsap.fromTo(
        treesRef.current,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "top 40%",
            scrub: 1,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Daily intake based on feed rate (24 hours)
  const dailyIntake = Math.round((inputs.feedRate * 24) / 1000);

  return (
    <section
      ref={sectionRef}
      id="collection"
      className="min-h-screen relative flex flex-col items-center justify-center py-20 px-4"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-card via-background to-card opacity-50" />

      <motion.div
        className="relative z-10 w-full max-w-5xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="section-title text-center mb-12">
          1. Biomass Collection
        </h2>

        {/* SVG Illustration */}
        <div className="w-full max-w-3xl mx-auto mb-12">
          <svg viewBox="0 0 600 300" className="w-full h-auto">
            {/* Forest background */}
            <g ref={treesRef}>
              {[50, 120, 200, 500, 550].map((x, i) => (
                <g key={i}>
                  <rect
                    x={x}
                    y={180 - i * 10}
                    width={15}
                    height={60 + i * 10}
                    fill="hsl(25 40% 30%)"
                  />
                  <polygon
                    points={`${x - 15},${180 - i * 10} ${x + 7.5},${100 - i * 15} ${x + 30},${180 - i * 10}`}
                    fill="hsl(145 50% 30%)"
                  />
                  <polygon
                    points={`${x - 10},${150 - i * 10} ${x + 7.5},${80 - i * 15} ${x + 25},${150 - i * 10}`}
                    fill="hsl(145 55% 35%)"
                  />
                </g>
              ))}
            </g>

            {/* Ground */}
            <rect x="0" y="240" width="600" height="60" fill="hsl(30 30% 25%)" />

            {/* Truck with biomass */}
            <g ref={truckRef}>
              <rect x="280" y="180" width="120" height="55" fill="hsl(145 50% 35%)" rx="3" />
              <rect x="400" y="200" width="50" height="35" fill="hsl(145 55% 40%)" rx="3" />
              <rect x="285" y="170" width="110" height="20" fill="hsl(30 50% 35%)" rx="2" />
              {/* Wood chips texture */}
              {[290, 310, 330, 350, 370].map((x, i) => (
                <rect
                  key={i}
                  x={x}
                  y={173}
                  width={12}
                  height={12}
                  fill="hsl(25 45% 40%)"
                  rx="2"
                />
              ))}
              {/* Wheels */}
              <circle cx="310" cy="245" r="18" fill="hsl(215 20% 20%)" />
              <circle cx="310" cy="245" r="10" fill="hsl(215 15% 35%)" />
              <circle cx="380" cy="245" r="18" fill="hsl(215 20% 20%)" />
              <circle cx="380" cy="245" r="10" fill="hsl(215 15% 35%)" />
              <circle cx="425" cy="245" r="18" fill="hsl(215 20% 20%)" />
              <circle cx="425" cy="245" r="10" fill="hsl(215 15% 35%)" />
            </g>

            {/* Chainsaw worker hint */}
            <motion.g
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              transition={{ delay: 0.5 }}
            >
              <circle cx="100" cy="210" r="12" fill="hsl(35 80% 50%)" />
              <rect x="95" y="222" width="10" height="25" fill="hsl(35 80% 50%)" />
            </motion.g>

            {/* Labels */}
            <text x="350" y="270" textAnchor="middle" className="fill-foreground text-[11px] font-medium">
              Biomass Transport
            </text>
          </svg>
        </div>

        {/* Metrics with LIVE VALUES */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <motion.div
            className="metric-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.2 }}
          >
            <span className="metric-label">Fuel Type</span>
            <p className="text-primary font-medium mt-1">{inputs.biomassType}</p>
          </motion.div>
          <motion.div
            className="metric-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.3 }}
          >
            <span className="metric-label">Daily Intake</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="metric-value">{dailyIntake}</span>
              <span className="text-xs text-muted-foreground">tonnes</span>
            </div>
            <p className="text-[10px] text-muted-foreground mt-1">
              @ {(inputs.feedRate / 1000).toFixed(1)} t/hr
            </p>
          </motion.div>
          <motion.div
            className="metric-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.4 }}
          >
            <span className="metric-label">Sustainability</span>
            <p className="text-primary font-medium mt-1">FSC Certified</p>
          </motion.div>
        </div>

        <NarratorCaption text={`${inputs.biomassType} is harvested from sustainably managed sources. At ${(inputs.feedRate / 1000).toFixed(1)} t/hr, we need ${dailyIntake} tonnes delivered daily!`} />
      </motion.div>
    </section>
  );
};
