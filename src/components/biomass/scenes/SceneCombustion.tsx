import { motion } from "framer-motion";
import { BoilerCrossSection } from "../BoilerCrossSection";
import { AnimatedGauge } from "../AnimatedGauge";

export const SceneCombustion = () => {
  return (
    <div className="scene-container min-h-[400px] p-6 relative overflow-hidden">
      <motion.h2
        className="section-title text-center mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Feeding & Combustion
      </motion.h2>

      <div className="flex flex-col xl:flex-row items-center justify-center gap-6">
        {/* Boiler cross-section */}
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <BoilerCrossSection />
        </motion.div>

        {/* Metrics panel */}
        <motion.div
          className="flex flex-col gap-4"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="grid grid-cols-2 gap-3">
            <AnimatedGauge
              value={21}
              maxValue={25}
              label="O₂ Level"
              unit="%"
              size={90}
            />
            <AnimatedGauge
              value={0.02}
              maxValue={0.1}
              label="CO Level"
              unit="%"
              size={90}
            />
          </div>

          <div className="metric-card">
            <span className="metric-label">Combustion Type</span>
            <p className="text-primary font-medium mt-1">Grate-Fired System</p>
            <p className="text-xs text-muted-foreground mt-1">
              Staged combustion with primary & secondary air injection
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="metric-card">
              <span className="metric-label">Bed Temp</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="metric-value text-accent">850</span>
                <span className="text-xs text-muted-foreground">°C</span>
              </div>
            </div>
            <div className="metric-card">
              <span className="metric-label">Feed Rate</span>
              <div className="flex items-baseline gap-1 mt-1">
                <motion.span
                  className="metric-value"
                  animate={{ opacity: [1, 0.7, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  18.5
                </motion.span>
                <span className="text-xs text-muted-foreground">t/hr</span>
              </div>
            </div>
          </div>

          {/* Air ratio indicator */}
          <motion.div
            className="metric-card"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <span className="metric-label">Excess Air Ratio</span>
            <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "65%" }}
                transition={{ delay: 1.2, duration: 1 }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
              <span>1.0</span>
              <span className="text-primary font-medium">1.3</span>
              <span>2.0</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
