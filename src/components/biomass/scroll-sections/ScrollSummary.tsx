import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { NarratorCaption } from "../NarratorCaption";

gsap.registerPlugin(ScrollTrigger);

export const ScrollSummary = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animate metrics on scroll
      gsap.utils.toArray(".summary-metric").forEach((el, i) => {
        gsap.fromTo(
          el as Element,
          { opacity: 0, y: 30, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            delay: i * 0.1,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const metrics = [
    { label: "Feed Rate", value: "18.5", unit: "t/hr", color: "text-primary" },
    { label: "Thermal Efficiency", value: "38", unit: "%", color: "text-primary" },
    { label: "Power Output", value: "25", unit: "MW", color: "text-accent" },
    { label: "Emissions", value: "0.15", unit: "g/MJ NOx", color: "text-primary" },
  ];

  return (
    <section
      ref={sectionRef}
      id="summary"
      className="min-h-screen relative flex flex-col items-center justify-center py-20 px-4 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-card/50 via-background to-primary/5" />

      {/* Eco glow */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-[120px]"
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      <motion.div
        className="relative z-10 w-full max-w-5xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="section-title text-center mb-8">
          Complete Process Overview
        </h2>

        {/* Full plant schematic */}
        <div className="w-full max-w-4xl mx-auto mb-12">
          <svg viewBox="0 0 900 180" className="w-full h-auto">
            {/* Process blocks */}
            {[
              { x: 20, label: "Feedstock", icon: "🌲" },
              { x: 110, label: "Storage", icon: "📦" },
              { x: 200, label: "Processing", icon: "⚙️" },
              { x: 290, label: "Feeding", icon: "➡️" },
              { x: 380, label: "Boiler", icon: "🔥" },
              { x: 470, label: "Steam", icon: "💨" },
              { x: 560, label: "Turbine", icon: "🔄" },
              { x: 650, label: "Generator", icon: "⚡" },
              { x: 740, label: "Grid", icon: "🏠" },
            ].map((item, i) => (
              <motion.g
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: i * 0.1 }}
              >
                <rect
                  x={item.x}
                  y={60}
                  width={70}
                  height={60}
                  rx={8}
                  fill={i === 8 ? "hsl(145 60% 40%)" : "hsl(215 20% 25%)"}
                  stroke={i === 4 ? "hsl(25 90% 50%)" : i === 8 ? "hsl(145 70% 50%)" : "hsl(215 15% 35%)"}
                  strokeWidth={2}
                />
                <text x={item.x + 35} y={95} textAnchor="middle" className="text-[18px]">
                  {item.icon}
                </text>
                <text
                  x={item.x + 35}
                  y={145}
                  textAnchor="middle"
                  className="fill-muted-foreground text-[9px]"
                >
                  {item.label}
                </text>
                
                {/* Connector arrows */}
                {i < 8 && (
                  <motion.path
                    d={`M${item.x + 75} 90 L${item.x + 105} 90`}
                    stroke="hsl(145 60% 45%)"
                    strokeWidth={2}
                    fill="none"
                    markerEnd="url(#summaryArrow)"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: false }}
                    transition={{ delay: 0.5 + i * 0.1, duration: 0.3 }}
                  />
                )}
              </motion.g>
            ))}

            {/* Emissions branch */}
            <motion.g
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              transition={{ delay: 1 }}
            >
              <path d="M415 60 L415 30 L520 30" stroke="hsl(200 60% 50%)" strokeWidth={2} strokeDasharray="4 2" />
              <rect x="520" y="15" width="60" height="30" rx={5} fill="hsl(215 20% 25%)" />
              <text x="550" y="35" textAnchor="middle" className="fill-steam text-[8px]">
                Clean Air
              </text>
            </motion.g>

            {/* Condenser loop */}
            <motion.g
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              transition={{ delay: 1.2 }}
            >
              <path
                d="M595 125 L595 160 L470 160 L470 125"
                stroke="hsl(200 60% 50%)"
                strokeWidth={2}
                fill="none"
              />
              <text x="530" y="175" textAnchor="middle" className="fill-primary text-[8px]">
                Water Loop
              </text>
            </motion.g>

            <defs>
              <marker id="summaryArrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                <polygon points="0 0, 8 3, 0 6" fill="hsl(145 60% 45%)" />
              </marker>
            </defs>
          </svg>
        </div>

        {/* Live metrics */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {metrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              className="summary-metric metric-card min-w-[150px] text-center"
            >
              <span className="metric-label">{metric.label}</span>
              <div className="flex items-baseline justify-center gap-1 mt-2">
                <motion.span
                  className={`text-2xl font-mono font-bold ${metric.color}`}
                  animate={{ opacity: [1, 0.7, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                >
                  {metric.value}
                </motion.span>
                <span className="text-sm text-muted-foreground">{metric.unit}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Renewable badge */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          transition={{ delay: 0.5 }}
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary/15 border border-primary/40">
            <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
            <span className="text-foreground font-medium">
              Renewable energy from sustainably managed forests
            </span>
            <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
          </div>
        </motion.div>

        <NarratorCaption text="And there you have it — from biomass to clean electricity! When sourced responsibly, biomass provides reliable, renewable power while supporting rural economies and sustainable forestry." />

        {/* End CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-muted-foreground mb-4">Thanks for exploring with me!</p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
          >
            ↑ Back to Top
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
};
