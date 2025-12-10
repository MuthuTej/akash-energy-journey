import { motion } from "framer-motion";
import { TurbineCrossSection } from "../TurbineCrossSection";
import { AnimatedGauge } from "../AnimatedGauge";
import { SteamParticles } from "../ParticleEffects";

export const SceneTurbine = () => {
  return (
    <div className="scene-container min-h-[400px] p-6 relative overflow-hidden">
      <SteamParticles count={10} originX={10} originY={50} spread={5} />

      <motion.h2
        className="section-title text-center mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Steam Path & Turbine
      </motion.h2>

      <div className="flex flex-col gap-6">
        {/* Turbine cross-section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <TurbineCrossSection />
        </motion.div>

        {/* Metrics row */}
        <motion.div
          className="flex flex-wrap justify-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <AnimatedGauge
            value={85}
            maxValue={120}
            label="Steam Pressure"
            unit="bar"
            size={80}
          />
          <AnimatedGauge
            value={540}
            maxValue={600}
            label="Steam Temp"
            unit="°C"
            size={80}
            colorType="warning"
          />
          <AnimatedGauge
            value={3000}
            maxValue={3600}
            label="Turbine RPM"
            unit="rpm"
            size={80}
          />
          <AnimatedGauge
            value={25}
            maxValue={30}
            label="Power Output"
            unit="MW"
            size={80}
          />
        </motion.div>

        {/* Process explanation */}
        <motion.div
          className="flex justify-center gap-4 flex-wrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div className="metric-card flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-primary text-sm">1</span>
            </div>
            <span className="text-sm">Steam enters HP stage</span>
          </div>
          <div className="metric-card flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-primary text-sm">2</span>
            </div>
            <span className="text-sm">Expands through MP/LP</span>
          </div>
          <div className="metric-card flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
              <span className="text-accent text-sm">3</span>
            </div>
            <span className="text-sm">Generator converts to electricity</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
