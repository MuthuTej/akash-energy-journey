import { motion } from "framer-motion";
import { AnimatedGauge } from "../AnimatedGauge";

export const SceneCondenser = () => {
  return (
    <div className="scene-container min-h-[400px] p-6 relative">
      <motion.h2
        className="section-title text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Condenser & Feedwater
      </motion.h2>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
        {/* Illustration */}
        <motion.div
          className="w-full max-w-lg"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <svg viewBox="0 0 500 300" className="w-full h-auto">
            {/* Condenser shell */}
            <motion.rect
              x="50"
              y="80"
              width="200"
              height="140"
              rx="10"
              fill="hsl(215 20% 28%)"
              stroke="hsl(215 15% 45%)"
              strokeWidth="2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />

            {/* Cooling tubes */}
            {[100, 130, 160, 190].map((y, i) => (
              <motion.g key={i}>
                <line
                  x1="60"
                  y1={y}
                  x2="240"
                  y2={y}
                  stroke="hsl(200 60% 50%)"
                  strokeWidth="4"
                />
                {/* Water flow animation */}
                <motion.circle
                  cx="60"
                  cy={y}
                  r="3"
                  fill="hsl(200 80% 70%)"
                  initial={{ x: 0 }}
                  animate={{ x: 180 }}
                  transition={{
                    delay: i * 0.2,
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </motion.g>
            ))}

            {/* Steam inlet */}
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <path d="M150 50 L150 80" stroke="hsl(200 80% 70%)" strokeWidth="8" />
              <text x="150" y="40" textAnchor="middle" className="fill-steam text-[9px]">
                STEAM IN
              </text>
              {/* Steam particles condensing */}
              {[0, 1, 2].map((i) => (
                <motion.circle
                  key={i}
                  cx={140 + i * 10}
                  cy={65}
                  r={4}
                  fill="hsl(200 80% 80%)"
                  opacity={0.6}
                  initial={{ y: 0, opacity: 0.6, scale: 1 }}
                  animate={{ y: 20, opacity: 0, scale: 0.5 }}
                  transition={{
                    delay: i * 0.3,
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                />
              ))}
            </motion.g>

            {/* Condensate outlet */}
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <path d="M150 220 L150 260" stroke="hsl(200 60% 50%)" strokeWidth="6" />
              <text x="150" y="275" textAnchor="middle" className="fill-primary text-[9px]">
                CONDENSATE OUT
              </text>
            </motion.g>

            {/* Pump */}
            <motion.g
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <circle cx="320" cy="240" r="30" fill="hsl(215 20% 28%)" stroke="hsl(145 60% 45%)" strokeWidth="2" />
              <motion.path
                d="M305 240 L335 240 M320 225 L320 255"
                stroke="hsl(145 60% 45%)"
                strokeWidth="3"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: "320px 240px" }}
              />
              <text x="320" y="285" textAnchor="middle" className="fill-muted-foreground text-[9px]">
                FEEDWATER PUMP
              </text>
            </motion.g>

            {/* Pipe from condenser to pump */}
            <motion.path
              d="M150 260 L150 280 Q150 290 160 290 L290 290 Q300 290 300 280 L300 250"
              fill="none"
              stroke="hsl(200 60% 50%)"
              strokeWidth="4"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            />

            {/* Pipe from pump back to boiler */}
            <motion.path
              d="M350 240 L420 240 L420 150 L480 150"
              fill="none"
              stroke="hsl(200 60% 50%)"
              strokeWidth="4"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 1.5, duration: 0.6 }}
            />

            {/* Boiler return indicator */}
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
            >
              <text x="480" y="140" className="fill-accent text-[9px]">
                → TO BOILER
              </text>
            </motion.g>

            {/* Closed loop label */}
            <motion.g
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2.2 }}
            >
              <rect x="280" y="120" width="90" height="30" rx="5" fill="hsl(145 60% 40%)" />
              <text x="325" y="140" textAnchor="middle" className="fill-background text-[10px] font-medium">
                CLOSED LOOP
              </text>
            </motion.g>
          </svg>
        </motion.div>

        {/* Metrics panel */}
        <motion.div
          className="flex flex-col gap-4"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <AnimatedGauge
            value={0.05}
            maxValue={0.1}
            label="Condenser Pressure"
            unit="bar"
            size={100}
          />

          <div className="metric-card">
            <span className="metric-label">Cooling Water</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="metric-value">15,000</span>
              <span className="text-xs text-muted-foreground">m³/hr</span>
            </div>
          </div>

          <motion.div
            className="metric-card"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <span className="metric-label">Heat Recovery</span>
            <div className="mt-2 h-3 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: "linear-gradient(90deg, hsl(145 60% 40%), hsl(145 70% 55%))",
                }}
                initial={{ width: 0 }}
                animate={{ width: "88%" }}
                transition={{ delay: 1.8, duration: 1.2 }}
              />
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-[10px] text-muted-foreground">Efficiency</span>
              <span className="text-xs text-primary font-medium">88%</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
