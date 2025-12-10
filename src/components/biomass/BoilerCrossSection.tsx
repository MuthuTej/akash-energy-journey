import { motion } from "framer-motion";
import { FlameEffect, SteamParticles } from "./ParticleEffects";

export const BoilerCrossSection = () => {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <svg viewBox="0 0 400 350" className="w-full h-auto">
        <defs>
          <linearGradient id="steelGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(215 15% 45%)" />
            <stop offset="50%" stopColor="hsl(215 20% 35%)" />
            <stop offset="100%" stopColor="hsl(215 20% 25%)" />
          </linearGradient>
          <linearGradient id="tubeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(215 12% 55%)" />
            <stop offset="100%" stopColor="hsl(215 15% 35%)" />
          </linearGradient>
        </defs>

        {/* Boiler outer shell */}
        <motion.rect
          x="50"
          y="30"
          width="300"
          height="280"
          rx="10"
          fill="url(#steelGradient)"
          stroke="hsl(215 15% 55%)"
          strokeWidth="3"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        />

        {/* Inner chamber */}
        <motion.rect
          x="70"
          y="50"
          width="260"
          height="240"
          rx="5"
          fill="hsl(220 20% 12%)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        />

        {/* Combustion zone label */}
        <motion.text
          x="200"
          y="260"
          textAnchor="middle"
          className="fill-accent text-[10px] font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          COMBUSTION ZONE
        </motion.text>

        {/* Primary air arrows */}
        {[100, 200, 300].map((x, i) => (
          <motion.g key={`primary-${i}`}>
            <motion.path
              d={`M${x} 320 L${x} 280`}
              stroke="hsl(200 80% 60%)"
              strokeWidth="2"
              fill="none"
              markerEnd="url(#arrowhead)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 1.2 + i * 0.1, duration: 0.5 }}
            />
            <motion.text
              x={x}
              y="338"
              textAnchor="middle"
              className="fill-muted-foreground text-[8px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              1° AIR
            </motion.text>
          </motion.g>
        ))}

        {/* Secondary air arrows */}
        {[80, 120].map((y, i) => (
          <motion.g key={`secondary-${i}`}>
            <motion.path
              d={`M30 ${y} L65 ${y}`}
              stroke="hsl(160 70% 50%)"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 1.4 + i * 0.1, duration: 0.5 }}
            />
          </motion.g>
        ))}
        <motion.text
          x="20"
          y="100"
          textAnchor="middle"
          className="fill-muted-foreground text-[8px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
        >
          2° AIR
        </motion.text>

        {/* Steam tubes */}
        {[90, 130, 170, 210, 250, 290].map((x, i) => (
          <motion.g key={`tube-${i}`}>
            <motion.rect
              x={x}
              y="60"
              width="12"
              height="120"
              rx="6"
              fill="url(#tubeGradient)"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1, duration: 0.4 }}
            />
            {/* Steam flow indicator */}
            <motion.circle
              cx={x + 6}
              cy="80"
              r="3"
              fill="hsl(200 80% 70%)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.3, 1, 0.3], y: [0, -30, -60] }}
              transition={{
                delay: 1 + i * 0.2,
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </motion.g>
        ))}

        {/* Grate */}
        <motion.rect
          x="80"
          y="230"
          width="240"
          height="10"
          fill="hsl(215 20% 30%)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        />
        {/* Grate holes */}
        {[100, 140, 180, 220, 260, 300].map((x, i) => (
          <motion.rect
            key={`grate-${i}`}
            x={x}
            y="232"
            width="20"
            height="6"
            fill="hsl(220 20% 12%)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 + i * 0.05 }}
          />
        ))}

        {/* Label: Steam outlet */}
        <motion.text
          x="200"
          y="25"
          textAnchor="middle"
          className="fill-primary text-[10px] font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          STEAM OUTLET →
        </motion.text>

        {/* Arrow marker definition */}
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon
              points="0 0, 10 3.5, 0 7"
              fill="hsl(200 80% 60%)"
            />
          </marker>
        </defs>
      </svg>

      {/* Flame effect positioned in combustion zone */}
      <div className="absolute bottom-[28%] left-1/2 transform -translate-x-1/2">
        <FlameEffect width={80} height={100} />
      </div>

      {/* Steam particles */}
      <SteamParticles count={6} originX={50} originY={20} spread={40} />
    </div>
  );
};
