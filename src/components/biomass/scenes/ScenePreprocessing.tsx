import { motion } from "framer-motion";
import { MetricDisplay } from "../MetricDisplay";

export const ScenePreprocessing = () => {
  return (
    <div className="scene-container min-h-[400px] p-6 relative">
      <motion.h2
        className="section-title text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Pre-processing
      </motion.h2>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
        {/* Illustration */}
        <motion.div
          className="w-full max-w-lg"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <svg viewBox="0 0 500 280" className="w-full h-auto">
            {/* Chipper/Grinder */}
            <motion.g>
              <rect x="30" y="100" width="120" height="100" fill="hsl(215 20% 28%)" rx="5" />
              <rect x="40" y="110" width="100" height="80" fill="hsl(220 20% 12%)" rx="3" />
              
              {/* Rotating blade */}
              <motion.g
                style={{ transformOrigin: "90px 150px" }}
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                  <rect
                    key={i}
                    x="85"
                    y="125"
                    width="10"
                    height="50"
                    fill="hsl(215 12% 55%)"
                    style={{
                      transformOrigin: "90px 150px",
                      transform: `rotate(${angle}deg)`,
                    }}
                  />
                ))}
              </motion.g>

              {/* Input chute */}
              <path d="M10 80 L50 100 L50 130 L10 110 Z" fill="hsl(215 20% 32%)" />
              
              {/* Wood chips going in */}
              {[0, 1, 2].map((i) => (
                <motion.rect
                  key={i}
                  x={15 + i * 8}
                  y={85 + i * 5}
                  width={12}
                  height={8}
                  fill="hsl(30 55% 38%)"
                  rx="2"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 15 + i * 8, opacity: [0, 1, 1, 0] }}
                  transition={{
                    delay: 0.5 + i * 0.3,
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                />
              ))}

              <text x="90" y="220" textAnchor="middle" className="fill-muted-foreground text-[10px]">
                CHIPPER
              </text>
            </motion.g>

            {/* Arrow to dryer */}
            <motion.path
              d="M160 150 L200 150"
              stroke="hsl(145 60% 45%)"
              strokeWidth="3"
              markerEnd="url(#arrowGreen2)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            />

            {/* Rotary Dryer */}
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {/* Drum */}
              <ellipse cx="220" cy="150" rx="15" ry="40" fill="hsl(215 20% 32%)" />
              <rect x="220" y="110" width="150" height="80" fill="hsl(215 20% 28%)" />
              <ellipse cx="370" cy="150" rx="15" ry="40" fill="hsl(215 20% 35%)" />
              
              {/* Inner drum visualization */}
              <rect x="225" y="115" width="140" height="70" fill="hsl(220 20% 12%)" />
              
              {/* Rotating flights inside */}
              <motion.g
                style={{ transformOrigin: "295px 150px" }}
                animate={{ rotate: -360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                  <line
                    key={i}
                    x1="240"
                    y1="150"
                    x2="350"
                    y2="150"
                    stroke="hsl(215 15% 35%)"
                    strokeWidth="2"
                    style={{
                      transformOrigin: "295px 150px",
                      transform: `rotate(${angle}deg)`,
                    }}
                  />
                ))}
              </motion.g>

              {/* Heat source indicator */}
              <motion.g
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <rect x="230" y="195" width="130" height="15" fill="hsl(25 90% 50%)" rx="2" opacity={0.6} />
                <text x="295" y="206" textAnchor="middle" className="fill-background text-[8px] font-medium">
                  HOT AIR FLOW
                </text>
              </motion.g>

              {/* Steam escaping */}
              {[0, 1, 2].map((i) => (
                <motion.ellipse
                  key={i}
                  cx={250 + i * 40}
                  cy={105}
                  rx={8}
                  ry={5}
                  fill="hsl(200 20% 80%)"
                  opacity={0.5}
                  initial={{ y: 0, opacity: 0.5, scale: 1 }}
                  animate={{ y: -30, opacity: 0, scale: 1.5 }}
                  transition={{
                    delay: i * 0.4,
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
              ))}

              <text x="295" y="240" textAnchor="middle" className="fill-muted-foreground text-[10px]">
                ROTARY DRYER
              </text>
            </motion.g>

            {/* Output */}
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              <path d="M385 140 L420 120 L420 180 L385 160 Z" fill="hsl(215 20% 32%)" />
              
              {/* Dried particles */}
              {[0, 1, 2].map((i) => (
                <motion.rect
                  key={i}
                  x={400}
                  y={135 + i * 10}
                  width={8}
                  height={6}
                  fill="hsl(35 50% 45%)"
                  rx="1"
                  initial={{ x: 385, opacity: 1 }}
                  animate={{ x: 430, opacity: [1, 1, 0] }}
                  transition={{
                    delay: 1.8 + i * 0.2,
                    duration: 1,
                    repeat: Infinity,
                  }}
                />
              ))}
            </motion.g>

            <defs>
              <marker id="arrowGreen2" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="hsl(145 60% 45%)" />
              </marker>
            </defs>
          </svg>
        </motion.div>

        {/* Metrics panel */}
        <motion.div
          className="flex flex-col gap-4"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="grid grid-cols-2 gap-3">
            <MetricDisplay label="Particle Size" value="< 50" unit="mm" />
            <MetricDisplay label="Output Moisture" value={15} unit="%" trend="down" />
          </div>

          {/* LHV Chart */}
          <motion.div
            className="metric-card"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <span className="metric-label block mb-2">LHV vs Moisture</span>
            <svg viewBox="0 0 200 80" className="w-full">
              {/* Axis */}
              <line x1="30" y1="60" x2="180" y2="60" stroke="hsl(215 15% 35%)" strokeWidth="1" />
              <line x1="30" y1="10" x2="30" y2="60" stroke="hsl(215 15% 35%)" strokeWidth="1" />
              
              {/* LHV curve */}
              <motion.path
                d="M30 55 Q70 50 100 35 Q130 20 180 15"
                fill="none"
                stroke="hsl(145 60% 45%)"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
              />
              
              {/* Labels */}
              <text x="105" y="75" textAnchor="middle" className="fill-muted-foreground text-[8px]">
                Moisture %
              </text>
              <text x="15" y="35" textAnchor="middle" className="fill-muted-foreground text-[8px]" style={{ writingMode: "vertical-rl" }}>
                LHV
              </text>
              <text x="35" y="70" className="fill-muted-foreground text-[6px]">High</text>
              <text x="165" y="70" className="fill-muted-foreground text-[6px]">Low</text>
            </svg>
            <p className="text-xs text-primary mt-1">↑ Drier fuel = Higher energy content</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
