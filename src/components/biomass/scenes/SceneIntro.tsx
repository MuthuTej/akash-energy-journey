import { motion } from "framer-motion";

export const SceneIntro = () => {
  return (
    <div className="scene-container flex flex-col items-center justify-center min-h-[450px] py-12 relative overflow-hidden">
      {/* Background plant silhouette */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.12 }}
        transition={{ duration: 0.5 }}
      >
        <svg viewBox="0 0 800 400" className="w-full h-full">
          {/* Plant silhouette */}
          <rect x="100" y="200" width="150" height="150" fill="hsl(215 20% 25%)" rx="5" />
          <rect x="130" y="100" width="30" height="100" fill="hsl(215 20% 30%)" />
          <rect x="180" y="80" width="40" height="120" fill="hsl(215 20% 28%)" />
          <rect x="300" y="150" width="200" height="200" fill="hsl(215 20% 22%)" rx="5" />
          <rect x="350" y="50" width="60" height="100" fill="hsl(215 20% 30%)" />
          <rect x="450" y="70" width="30" height="80" fill="hsl(215 20% 32%)" />
          <rect x="550" y="180" width="100" height="170" fill="hsl(215 20% 25%)" rx="5" />
          <rect x="580" y="120" width="40" height="60" fill="hsl(215 20% 28%)" />
        </svg>
      </motion.div>

      {/* Title card */}
      <motion.div
        className="text-center z-10 px-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <motion.div
          className="inline-block mb-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.5 }}
        >
          <div className="w-16 h-16 mx-auto rounded-full bg-primary/20 flex items-center justify-center mb-4">
            <svg viewBox="0 0 24 24" className="w-8 h-8 text-primary" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
        </motion.div>

        <motion.h1
          className="text-3xl md:text-5xl font-bold mb-3 text-gradient-eco"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          How a Biomass Power Plant Works
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          From biomass to electricity
        </motion.p>

        <motion.div
          className="mt-8 flex items-center justify-center gap-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-sm text-muted-foreground">Press play to begin</span>
        </motion.div>
      </motion.div>
    </div>
  );
};
