import { motion } from "framer-motion";
import { AnimatedGauge } from "../AnimatedGauge";

export const SceneEmissions = () => {
  return (
    <div className="scene-container min-h-[400px] p-6 relative">
      <motion.h2
        className="section-title text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Ash & Emissions Control
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
            {/* Boiler exhaust */}
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <rect x="30" y="100" width="60" height="100" fill="hsl(215 20% 28%)" rx="3" />
              <text x="60" y="90" textAnchor="middle" className="fill-muted-foreground text-[8px]">
                FROM BOILER
              </text>
              <path d="M90 150 L130 150" stroke="hsl(200 20% 60%)" strokeWidth="6" />
            </motion.g>

            {/* ESP / Baghouse */}
            <motion.g
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <rect x="130" y="70" width="120" height="160" fill="hsl(215 20% 25%)" rx="5" />
              <rect x="140" y="80" width="100" height="140" fill="hsl(220 20% 12%)" rx="3" />
              
              {/* Filter bags */}
              {[160, 190, 220].map((x, i) => (
                <motion.rect
                  key={i}
                  x={x}
                  y="90"
                  width="15"
                  height="110"
                  fill="hsl(215 15% 35%)"
                  rx="3"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
                />
              ))}

              {/* Dirty particles entering */}
              {[0, 1, 2, 3].map((i) => (
                <motion.circle
                  key={`dirty-${i}`}
                  cx={135}
                  cy={120 + i * 25}
                  r={4}
                  fill="hsl(30 30% 40%)"
                  initial={{ x: 0, opacity: 0.8 }}
                  animate={{ x: 40, opacity: [0.8, 0.8, 0] }}
                  transition={{
                    delay: 0.8 + i * 0.2,
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                />
              ))}

              <text x="190" y="250" textAnchor="middle" className="fill-muted-foreground text-[9px]">
                ESP / BAGHOUSE
              </text>
            </motion.g>

            {/* Arrow to scrubber */}
            <motion.path
              d="M260 150 L300 150"
              stroke="hsl(145 60% 45%)"
              strokeWidth="3"
              markerEnd="url(#arrowGreen3)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 1.2, duration: 0.4 }}
            />

            {/* Scrubber */}
            <motion.g
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <rect x="300" y="80" width="80" height="140" fill="hsl(215 20% 28%)" rx="5" />
              <rect x="310" y="90" width="60" height="120" fill="hsl(220 20% 12%)" rx="3" />
              
              {/* Water spray */}
              {[0, 1, 2].map((i) => (
                <motion.g key={`spray-${i}`}>
                  <motion.circle
                    cx={340}
                    cy={110 + i * 30}
                    r={3}
                    fill="hsl(200 70% 60%)"
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1, 0], y: [0, 15, 30] }}
                    transition={{
                      delay: 1.5 + i * 0.3,
                      duration: 1,
                      repeat: Infinity,
                    }}
                  />
                </motion.g>
              ))}

              <text x="340" y="250" textAnchor="middle" className="fill-muted-foreground text-[9px]">
                SCRUBBER
              </text>
            </motion.g>

            {/* Stack */}
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              <rect x="420" y="40" width="40" height="180" fill="hsl(215 20% 30%)" rx="3" />
              <rect x="415" y="35" width="50" height="15" fill="hsl(215 20% 35%)" rx="2" />
              
              {/* Clean exhaust */}
              {[0, 1, 2].map((i) => (
                <motion.ellipse
                  key={`clean-${i}`}
                  cx={440}
                  cy={30}
                  rx={10 + i * 5}
                  ry={5 + i * 2}
                  fill="hsl(200 20% 80%)"
                  opacity={0.3}
                  initial={{ y: 0, opacity: 0.3, scale: 1 }}
                  animate={{ y: -40, opacity: 0, scale: 1.5 }}
                  transition={{
                    delay: 2 + i * 0.3,
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
              ))}

              <text x="440" y="235" textAnchor="middle" className="fill-muted-foreground text-[9px]">
                STACK
              </text>
            </motion.g>

            {/* Connection line */}
            <motion.path
              d="M380 150 L420 150"
              stroke="hsl(145 60% 45%)"
              strokeWidth="3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 1.7, duration: 0.3 }}
            />

            {/* Ash collection */}
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
            >
              <rect x="160" y="240" width="60" height="30" fill="hsl(30 40% 30%)" rx="3" />
              <text x="190" y="260" textAnchor="middle" className="fill-muted-foreground text-[7px]">
                FLY ASH
              </text>
              {/* Ash falling */}
              <motion.rect
                x="185"
                y="220"
                width="10"
                height="8"
                fill="hsl(30 30% 45%)"
                rx="1"
                initial={{ y: 220 }}
                animate={{ y: [220, 240] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </motion.g>

            <defs>
              <marker id="arrowGreen3" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
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
          {/* Before/After comparison */}
          <motion.div
            className="metric-card"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <span className="metric-label">Particulate Removal</span>
            <div className="flex items-center gap-4 mt-3">
              <div className="text-center">
                <span className="text-sm text-destructive font-mono">500</span>
                <span className="text-[10px] text-muted-foreground block">mg/Nm³</span>
                <span className="text-[8px] text-muted-foreground">Before</span>
              </div>
              <motion.div
                className="flex-1 h-1 bg-muted rounded"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1.3, duration: 0.8 }}
              >
                <div className="h-full bg-gradient-to-r from-destructive via-gauge-warning to-primary rounded" />
              </motion.div>
              <div className="text-center">
                <span className="text-sm text-primary font-mono">10</span>
                <span className="text-[10px] text-muted-foreground block">mg/Nm³</span>
                <span className="text-[8px] text-muted-foreground">After</span>
              </div>
            </div>
            <p className="text-xs text-primary mt-2">98% removal efficiency</p>
          </motion.div>

          <div className="grid grid-cols-2 gap-3">
            <AnimatedGauge
              value={0.15}
              maxValue={0.5}
              label="NOx"
              unit="g/MJ"
              size={80}
            />
            <AnimatedGauge
              value={0.02}
              maxValue={0.1}
              label="SO₂"
              unit="g/MJ"
              size={80}
            />
          </div>

          <div className="metric-card">
            <span className="metric-label">Ash Recovery</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="metric-value">95</span>
              <span className="text-xs text-muted-foreground">%</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Used in construction materials
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
