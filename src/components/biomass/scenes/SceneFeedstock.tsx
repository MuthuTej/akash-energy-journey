import { motion } from "framer-motion";
import { MetricDisplay } from "../MetricDisplay";

export const SceneFeedstock = () => {
  return (
    <div className="scene-container min-h-[400px] p-6 relative">
      <motion.h2
        className="section-title text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Feedstock & Storage
      </motion.h2>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
        {/* Illustration */}
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <svg viewBox="0 0 400 300" className="w-full h-auto">
            {/* Ground */}
            <rect x="0" y="250" width="400" height="50" fill="hsl(215 20% 15%)" />
            
            {/* Truck */}
            <motion.g
              initial={{ x: -100 }}
              animate={{ x: 0 }}
              transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
            >
              {/* Truck bed */}
              <rect x="30" y="180" width="100" height="60" fill="hsl(145 50% 35%)" rx="3" />
              {/* Truck cab */}
              <rect x="130" y="200" width="40" height="40" fill="hsl(145 55% 40%)" rx="3" />
              {/* Wheels */}
              <circle cx="60" cy="250" r="15" fill="hsl(215 20% 25%)" />
              <circle cx="110" cy="250" r="15" fill="hsl(215 20% 25%)" />
              <circle cx="155" cy="250" r="15" fill="hsl(215 20% 25%)" />
              {/* Biomass in truck */}
              <rect x="35" y="170" width="90" height="20" fill="hsl(30 60% 35%)" rx="2" />
              {/* Wood chip texture */}
              {[45, 60, 75, 90, 105].map((x, i) => (
                <rect key={i} x={x} y={175} width={8} height={10} fill="hsl(25 50% 40%)" rx="1" />
              ))}
            </motion.g>

            {/* Weighbridge */}
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <rect x="180" y="240" width="60" height="10" fill="hsl(215 15% 35%)" rx="2" />
              <rect x="195" y="220" width="30" height="25" fill="hsl(220 18% 14%)" rx="2" />
              <text x="210" y="238" textAnchor="middle" className="fill-primary text-[8px] font-mono">
                28.5t
              </text>
            </motion.g>

            {/* Storage hopper */}
            <motion.g
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 }}
            >
              {/* Hopper structure */}
              <path d="M260 100 L340 100 L360 180 L370 250 L230 250 L240 180 Z" fill="hsl(215 20% 28%)" />
              <path d="M265 105 L335 105 L353 175 L363 245 L237 245 L247 175 Z" fill="hsl(30 50% 30%)" />
              {/* Wood chips inside */}
              {[270, 285, 300, 315, 330].map((x, i) => (
                <motion.rect
                  key={i}
                  x={x}
                  y={120 + i * 5}
                  width={15}
                  height={20}
                  fill="hsl(25 55% 38%)"
                  rx="2"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 120 + i * 5, opacity: 1 }}
                  transition={{ delay: 1.5 + i * 0.1, duration: 0.5 }}
                />
              ))}
              {/* Hopper label */}
              <text x="300" y="90" textAnchor="middle" className="fill-muted-foreground text-[10px]">
                STORAGE HOPPER
              </text>
            </motion.g>

            {/* Arrow showing flow */}
            <motion.path
              d="M175 230 L220 230"
              stroke="hsl(145 60% 45%)"
              strokeWidth="3"
              fill="none"
              markerEnd="url(#arrowGreen)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 1.8, duration: 0.5 }}
            />

            <defs>
              <marker id="arrowGreen" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="hsl(145 60% 45%)" />
              </marker>
            </defs>
          </svg>
        </motion.div>

        {/* Metrics panel */}
        <motion.div
          className="grid grid-cols-2 gap-3"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <MetricDisplay label="Biomass Type" value="Wood Chips" unit="" />
          <MetricDisplay label="Moisture" value={35} unit="%" trend="down" />
          <MetricDisplay label="Daily Intake" value={450} unit="t/day" />
          <MetricDisplay label="Storage Time" value="3-5" unit="days" />
        </motion.div>
      </div>

      {/* Callout */}
      <motion.div
        className="mt-6 mx-auto max-w-md p-3 rounded-lg bg-accent/10 border border-accent/30"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
      >
        <p className="text-sm text-accent flex items-center gap-2">
          <span className="text-lg">💡</span>
          <span>Why moisture matters → lower energy if wet</span>
        </p>
      </motion.div>
    </div>
  );
};
