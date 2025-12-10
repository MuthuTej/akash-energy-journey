import { motion } from "framer-motion";

export const SceneSummary = () => {
  const metrics = [
    { label: "Feed Rate", value: "18.5", unit: "t/hr", color: "primary" },
    { label: "Thermal Efficiency", value: "38", unit: "%", color: "primary" },
    { label: "Power Output", value: "25", unit: "MW", color: "accent" },
    { label: "Emissions", value: "0.15", unit: "g/MJ NOx", color: "primary" },
  ];

  return (
    <div className="scene-container min-h-[400px] p-6 relative">
      <motion.h2
        className="section-title text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Summary & Metrics
      </motion.h2>

      {/* Full plant schematic */}
      <motion.div
        className="w-full max-w-4xl mx-auto mb-8"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        <svg viewBox="0 0 800 200" className="w-full h-auto">
          {/* Feedstock */}
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            <rect x="20" y="100" width="80" height="60" fill="hsl(145 50% 35%)" rx="5" />
            <text x="60" y="180" textAnchor="middle" className="fill-foreground text-[10px]">Feedstock</text>
          </motion.g>

          {/* Arrow */}
          <motion.path d="M110 130 L140 130" stroke="hsl(145 60% 45%)" strokeWidth="3" markerEnd="url(#arr)"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.7, duration: 0.3 }} />

          {/* Pre-processing */}
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
            <rect x="150" y="90" width="90" height="80" fill="hsl(215 20% 28%)" rx="5" />
            <motion.circle cx="195" cy="130" r="20" fill="hsl(215 15% 35%)"
              animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} />
            <text x="195" y="185" textAnchor="middle" className="fill-foreground text-[10px]">Processing</text>
          </motion.g>

          {/* Arrow */}
          <motion.path d="M250 130 L280 130" stroke="hsl(145 60% 45%)" strokeWidth="3" markerEnd="url(#arr)"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1, duration: 0.3 }} />

          {/* Boiler */}
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}>
            <rect x="290" y="70" width="100" height="100" fill="hsl(215 20% 28%)" rx="5" />
            <motion.rect x="310" y="120" width="60" height="30" fill="hsl(25 90% 50%)" rx="3"
              animate={{ opacity: [0.7, 1, 0.7] }} transition={{ duration: 0.8, repeat: Infinity }} />
            <text x="340" y="185" textAnchor="middle" className="fill-foreground text-[10px]">Boiler</text>
          </motion.g>

          {/* Arrow */}
          <motion.path d="M400 130 L430 130" stroke="hsl(200 80% 60%)" strokeWidth="3" strokeDasharray="5 3"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.3, duration: 0.3 }} />

          {/* Turbine */}
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}>
            <rect x="440" y="80" width="100" height="80" fill="hsl(215 20% 28%)" rx="5" />
            {[0, 72, 144, 216, 288].map((angle, i) => (
              <motion.rect key={i} x="485" y="100" width="8" height="40" fill="hsl(145 60% 45%)" rx="2"
                style={{ transformOrigin: "489px 120px", transform: `rotate(${angle}deg)` }}
                animate={{ rotate: [angle, angle + 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }} />
            ))}
            <text x="490" y="185" textAnchor="middle" className="fill-foreground text-[10px]">Turbine</text>
          </motion.g>

          {/* Arrow */}
          <motion.path d="M550 120 L580 120" stroke="hsl(35 90% 55%)" strokeWidth="3"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.6, duration: 0.3 }} />

          {/* Generator */}
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.7 }}>
            <rect x="590" y="90" width="70" height="60" fill="hsl(35 80% 45%)" rx="5" />
            <motion.text x="625" y="125" textAnchor="middle" className="fill-background text-[12px] font-bold"
              animate={{ opacity: [1, 0.7, 1] }} transition={{ duration: 1, repeat: Infinity }}>
              ⚡
            </motion.text>
            <text x="625" y="185" textAnchor="middle" className="fill-foreground text-[10px]">Generator</text>
          </motion.g>

          {/* Arrow to grid */}
          <motion.path d="M670 120 L700 120" stroke="hsl(35 90% 55%)" strokeWidth="3" markerEnd="url(#arr)"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.9, duration: 0.3 }} />

          {/* Grid */}
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}>
            <rect x="710" y="95" width="60" height="50" fill="hsl(145 60% 40%)" rx="5" />
            <text x="740" y="125" textAnchor="middle" className="fill-background text-[10px] font-medium">GRID</text>
            <text x="740" y="185" textAnchor="middle" className="fill-foreground text-[10px]">25 MW</text>
          </motion.g>

          {/* Emissions control (top) */}
          <motion.g initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.2 }}>
            <rect x="350" y="20" width="80" height="35" fill="hsl(215 20% 25%)" rx="3" />
            <text x="390" y="42" textAnchor="middle" className="fill-muted-foreground text-[8px]">Clean Exhaust</text>
            <path d="M340 65 L350 65 L360 30 L380 55" stroke="hsl(200 60% 50%)" strokeWidth="2" fill="none" />
          </motion.g>

          <defs>
            <marker id="arr" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill="hsl(145 60% 45%)" />
            </marker>
          </defs>
        </svg>
      </motion.div>

      {/* Live metrics overlay */}
      <motion.div
        className="flex flex-wrap justify-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5 }}
      >
        {metrics.map((metric, i) => (
          <motion.div
            key={metric.label}
            className="metric-card min-w-[140px]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.7 + i * 0.1 }}
          >
            <span className="metric-label">{metric.label}</span>
            <div className="flex items-baseline gap-1 mt-1">
              <motion.span
                className={`metric-value ${metric.color === "accent" ? "!text-accent" : ""}`}
                animate={{ opacity: [1, 0.8, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
              >
                {metric.value}
              </motion.span>
              <span className="text-xs text-muted-foreground">{metric.unit}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Renewable note */}
      <motion.div
        className="mt-8 text-center max-w-2xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.2 }}
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-sm text-foreground">
            Biomass energy is renewable when sourced from sustainably managed forests
          </span>
        </div>
      </motion.div>
    </div>
  );
};
