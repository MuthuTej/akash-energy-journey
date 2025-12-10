import { motion } from "framer-motion";
import { useMemo } from "react";

interface SteamParticlesProps {
  count?: number;
  originX?: number;
  originY?: number;
  spread?: number;
}

export const SteamParticles = ({
  count = 8,
  originX = 50,
  originY = 80,
  spread = 30,
}: SteamParticlesProps) => {
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: originX + (Math.random() - 0.5) * spread,
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 2,
      size: 4 + Math.random() * 8,
    }));
  }, [count, originX, spread]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="steam-particle"
          style={{
            left: `${particle.x}%`,
            top: `${originY}%`,
            width: particle.size,
            height: particle.size,
          }}
          initial={{ y: 0, opacity: 0, scale: 0.5 }}
          animate={{
            y: -150,
            opacity: [0, 0.7, 0.5, 0],
            scale: [0.5, 1, 1.5, 2],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
};

interface FlameEffectProps {
  width?: number;
  height?: number;
}

export const FlameEffect = ({ width = 60, height = 80 }: FlameEffectProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 60 80"
      className="flame-glow"
    >
      <defs>
        <linearGradient id="flameGradient" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="hsl(15 90% 45%)" />
          <stop offset="40%" stopColor="hsl(25 95% 55%)" />
          <stop offset="70%" stopColor="hsl(35 100% 60%)" />
          <stop offset="100%" stopColor="hsl(45 100% 70%)" />
        </linearGradient>
        <filter id="flameBlur">
          <feGaussianBlur stdDeviation="2" />
        </filter>
      </defs>
      {/* Main flame */}
      <motion.path
        d="M30 5 Q45 25 40 45 Q35 60 30 75 Q25 60 20 45 Q15 25 30 5"
        fill="url(#flameGradient)"
        filter="url(#flameBlur)"
        animate={{
          d: [
            "M30 5 Q45 25 40 45 Q35 60 30 75 Q25 60 20 45 Q15 25 30 5",
            "M30 8 Q48 28 42 48 Q36 62 30 75 Q24 62 18 48 Q12 28 30 8",
            "M30 5 Q45 25 40 45 Q35 60 30 75 Q25 60 20 45 Q15 25 30 5",
          ],
        }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      {/* Inner flame */}
      <motion.path
        d="M30 20 Q38 35 35 50 Q32 60 30 70 Q28 60 25 50 Q22 35 30 20"
        fill="hsl(50 100% 75%)"
        opacity={0.8}
        animate={{
          d: [
            "M30 20 Q38 35 35 50 Q32 60 30 70 Q28 60 25 50 Q22 35 30 20",
            "M30 25 Q40 38 37 52 Q33 62 30 70 Q27 62 23 52 Q20 38 30 25",
            "M30 20 Q38 35 35 50 Q32 60 30 70 Q28 60 25 50 Q22 35 30 20",
          ],
        }}
        transition={{
          duration: 0.4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </svg>
  );
};
