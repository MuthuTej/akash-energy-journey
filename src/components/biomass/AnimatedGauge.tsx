import { motion } from "framer-motion";

interface AnimatedGaugeProps {
  value: number;
  maxValue: number;
  label: string;
  unit: string;
  size?: number;
  colorType?: "primary" | "warning" | "danger";
}

export const AnimatedGauge = ({
  value,
  maxValue,
  label,
  unit,
  size = 100,
  colorType = "primary",
}: AnimatedGaugeProps) => {
  const percentage = (value / maxValue) * 100;
  const circumference = 2 * Math.PI * 40;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const colorClasses = {
    primary: "stroke-primary",
    warning: "stroke-gauge-warning",
    danger: "stroke-gauge-danger",
  };

  return (
    <div className="metric-card flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          viewBox="0 0 100 100"
          className="transform -rotate-90"
          style={{ width: size, height: size }}
        >
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            className="stroke-muted"
            strokeWidth="8"
          />
          {/* Progress circle */}
          <motion.circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            className={colorClasses[colorType]}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </svg>
        {/* Center value */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className="metric-value text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {value.toFixed(1)}
          </motion.span>
          <span className="text-[10px] text-muted-foreground">{unit}</span>
        </div>
      </div>
      <span className="metric-label text-center">{label}</span>
    </div>
  );
};
