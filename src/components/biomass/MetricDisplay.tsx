import { motion } from "framer-motion";

interface MetricDisplayProps {
  label: string;
  value: number | string;
  unit: string;
  trend?: "up" | "down" | "stable";
  animate?: boolean;
}

export const MetricDisplay = ({
  label,
  value,
  unit,
  trend,
  animate = true,
}: MetricDisplayProps) => {
  const trendIcons = {
    up: "↑",
    down: "↓",
    stable: "→",
  };

  const trendColors = {
    up: "text-primary",
    down: "text-accent",
    stable: "text-muted-foreground",
  };

  return (
    <motion.div
      className="metric-card"
      initial={animate ? { opacity: 0, y: 20 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between gap-4">
        <span className="metric-label">{label}</span>
        {trend && (
          <span className={`text-sm ${trendColors[trend]}`}>
            {trendIcons[trend]}
          </span>
        )}
      </div>
      <div className="flex items-baseline gap-1 mt-1">
        <motion.span
          className="metric-value"
          initial={animate ? { scale: 0.8 } : false}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
        >
          {typeof value === "number" ? value.toFixed(1) : value}
        </motion.span>
        <span className="text-xs text-muted-foreground">{unit}</span>
      </div>
    </motion.div>
  );
};
