import { motion } from "framer-motion";

export const TurbineCrossSection = () => {
  return (
    <div className="relative w-full max-w-lg mx-auto">
      <svg viewBox="0 0 500 300" className="w-full h-auto">
        <defs>
          <linearGradient id="turbineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(215 20% 35%)" />
            <stop offset="50%" stopColor="hsl(215 15% 45%)" />
            <stop offset="100%" stopColor="hsl(215 20% 35%)" />
          </linearGradient>
          <linearGradient id="shaftGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(215 12% 55%)" />
            <stop offset="50%" stopColor="hsl(215 15% 40%)" />
            <stop offset="100%" stopColor="hsl(215 12% 55%)" />
          </linearGradient>
          <linearGradient id="steamGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(200 80% 70%)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="hsl(200 80% 70%)" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Turbine casing */}
        <motion.path
          d="M50 150 Q50 80 100 60 L400 60 Q450 80 450 150 Q450 220 400 240 L100 240 Q50 220 50 150"
          fill="url(#turbineGradient)"
          stroke="hsl(215 15% 55%)"
          strokeWidth="2"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        />

        {/* Inner chamber */}
        <motion.path
          d="M70 150 Q70 100 110 85 L390 85 Q430 100 430 150 Q430 200 390 215 L110 215 Q70 200 70 150"
          fill="hsl(220 20% 10%)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        />

        {/* Central shaft */}
        <motion.rect
          x="80"
          y="140"
          width="340"
          height="20"
          rx="10"
          fill="url(#shaftGradient)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        />

        {/* HP Stage blades */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
            <motion.rect
              key={`hp-${i}`}
              x="115"
              y="125"
              width="8"
              height="50"
              rx="2"
              fill="hsl(145 60% 40%)"
              style={{
                transformOrigin: "119px 150px",
                transform: `rotate(${angle}deg)`,
              }}
              animate={{ rotate: [angle, angle + 360] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
          <text
            x="120"
            y="200"
            textAnchor="middle"
            className="fill-primary text-[9px] font-medium"
          >
            HP
          </text>
        </motion.g>

        {/* MP Stage blades */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          {[0, 40, 80, 120, 160, 200, 240, 280, 320].map((angle, i) => (
            <motion.rect
              key={`mp-${i}`}
              x="243"
              y="118"
              width="10"
              height="64"
              rx="2"
              fill="hsl(145 55% 45%)"
              style={{
                transformOrigin: "248px 150px",
                transform: `rotate(${angle}deg)`,
              }}
              animate={{ rotate: [angle, angle + 360] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
          <text
            x="250"
            y="205"
            textAnchor="middle"
            className="fill-primary text-[9px] font-medium"
          >
            MP
          </text>
        </motion.g>

        {/* LP Stage blades */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          {[0, 36, 72, 108, 144, 180, 216, 252, 288, 324].map((angle, i) => (
            <motion.rect
              key={`lp-${i}`}
              x="373"
              y="110"
              width="12"
              height="80"
              rx="3"
              fill="hsl(145 50% 50%)"
              style={{
                transformOrigin: "379px 150px",
                transform: `rotate(${angle}deg)`,
              }}
              animate={{ rotate: [angle, angle + 360] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
          <text
            x="380"
            y="210"
            textAnchor="middle"
            className="fill-primary text-[9px] font-medium"
          >
            LP
          </text>
        </motion.g>

        {/* Steam flow arrows */}
        <motion.path
          d="M30 150 L60 150"
          stroke="url(#steamGradient)"
          strokeWidth="20"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.5 }}
        />
        <motion.text
          x="45"
          y="135"
          textAnchor="middle"
          className="fill-steam text-[8px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          STEAM IN
        </motion.text>

        {/* Velocity lines */}
        {[0, 1, 2].map((i) => (
          <motion.path
            key={`velocity-${i}`}
            d={`M${85 + i * 130} 150 Q${150 + i * 130} ${140 + i * 3} ${200 + i * 130} 150`}
            stroke="hsl(200 80% 70%)"
            strokeWidth="2"
            fill="none"
            strokeDasharray="5 5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.6 }}
            transition={{ delay: 1.5 + i * 0.2, duration: 0.8 }}
          />
        ))}

        {/* Generator connection */}
        <motion.g
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.4 }}
        >
          <rect
            x="440"
            y="120"
            width="50"
            height="60"
            rx="5"
            fill="hsl(35 80% 45%)"
            stroke="hsl(35 90% 55%)"
            strokeWidth="2"
          />
          <text
            x="465"
            y="155"
            textAnchor="middle"
            className="fill-background text-[10px] font-bold"
          >
            GEN
          </text>
        </motion.g>

        {/* RPM indicator */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
        >
          <rect
            x="220"
            y="250"
            width="60"
            height="25"
            rx="4"
            fill="hsl(220 18% 14%)"
            stroke="hsl(220 15% 25%)"
          />
          <motion.text
            x="250"
            y="267"
            textAnchor="middle"
            className="fill-primary text-[11px] font-mono font-medium"
            animate={{ opacity: [1, 0.7, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            3000 rpm
          </motion.text>
        </motion.g>

        {/* Labels */}
        <text
          x="250"
          y="50"
          textAnchor="middle"
          className="fill-foreground text-[11px] font-medium"
        >
          STEAM TURBINE — Cross Section
        </text>
      </svg>
    </div>
  );
};
