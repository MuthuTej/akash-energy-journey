import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface AnimatedValueProps {
  value: number;
  decimals?: number;
  duration?: number;
}

// Hook for smooth number animation
function useAnimatedValue(targetValue: number, duration = 500): number {
  const [displayValue, setDisplayValue] = useState(targetValue);
  const animationRef = useRef<number>();
  const startTimeRef = useRef<number>();
  const startValueRef = useRef<number>(targetValue);
  
  useEffect(() => {
    startValueRef.current = displayValue;
    startTimeRef.current = performance.now();
    
    const animate = (currentTime: number) => {
      const elapsed = currentTime - (startTimeRef.current || 0);
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentValue = startValueRef.current + (targetValue - startValueRef.current) * easeProgress;
      
      setDisplayValue(currentValue);
      
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [targetValue, duration]);
  
  return displayValue;
}

// Circular gauge component
interface CircularGaugeProps {
  value: number;
  max: number;
  label: string;
  unit: string;
  color?: string;
  size?: "sm" | "md" | "lg";
  tooltip?: string;
}

export const CircularGauge = ({
  value,
  max,
  label,
  unit,
  color = "hsl(var(--primary))",
  size = "md",
  tooltip,
}: CircularGaugeProps) => {
  const animatedValue = useAnimatedValue(value);
  const percentage = Math.min((animatedValue / max) * 100, 100);
  
  const sizes = {
    sm: { width: 80, stroke: 6, fontSize: "text-sm" },
    md: { width: 100, stroke: 8, fontSize: "text-lg" },
    lg: { width: 120, stroke: 10, fontSize: "text-xl" },
  };
  
  const { width, stroke, fontSize } = sizes[size];
  const radius = (width - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;
  
  return (
    <TooltipProvider delayDuration={300}>
      <div className="flex flex-col items-center gap-1">
        <div className="flex items-center gap-1">
          <span className="text-[10px] text-muted-foreground">{label}</span>
          {tooltip && (
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="w-3 h-3 text-muted-foreground/60 cursor-help" />
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-[180px]">
                <p className="text-xs">{tooltip}</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
        <div className="relative" style={{ width, height: width }}>
          <svg className="w-full h-full -rotate-90" viewBox={`0 0 ${width} ${width}`}>
            {/* Background circle */}
            <circle
              cx={width / 2}
              cy={width / 2}
              r={radius}
              fill="none"
              stroke="hsl(var(--muted))"
              strokeWidth={stroke}
            />
            {/* Progress circle */}
            <circle
              cx={width / 2}
              cy={width / 2}
              r={radius}
              fill="none"
              stroke={color}
              strokeWidth={stroke}
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              className="transition-all duration-300"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`font-mono font-bold ${fontSize}`} style={{ color }}>
              {animatedValue.toFixed(value >= 100 ? 0 : 1)}
            </span>
            <span className="text-[9px] text-muted-foreground">{unit}</span>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

// Vertical meter component
interface VerticalMeterProps {
  value: number;
  max: number;
  label: string;
  unit: string;
  color?: string;
  height?: number;
  tooltip?: string;
  warningThreshold?: number;
}

export const VerticalMeter = ({
  value,
  max,
  label,
  unit,
  color = "hsl(var(--primary))",
  height = 100,
  tooltip,
  warningThreshold,
}: VerticalMeterProps) => {
  const animatedValue = useAnimatedValue(value);
  const percentage = Math.min((animatedValue / max) * 100, 100);
  const isWarning = warningThreshold && animatedValue < warningThreshold;
  
  return (
    <TooltipProvider delayDuration={300}>
      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-1">
          <span className="text-[10px] text-muted-foreground">{label}</span>
          {tooltip && (
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="w-3 h-3 text-muted-foreground/60 cursor-help" />
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-[180px]">
                <p className="text-xs">{tooltip}</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
        <div 
          className="relative w-6 bg-muted rounded-full overflow-hidden"
          style={{ height }}
        >
          <motion.div
            className="absolute bottom-0 left-0 right-0 rounded-full transition-colors duration-300"
            style={{ 
              height: `${percentage}%`,
              backgroundColor: isWarning ? "hsl(var(--destructive))" : color,
            }}
          />
          {/* Level markers */}
          {[25, 50, 75].map((mark) => (
            <div
              key={mark}
              className="absolute left-0 right-0 border-t border-background/30"
              style={{ bottom: `${mark}%` }}
            />
          ))}
        </div>
        <div className="text-center">
          <span className="font-mono text-sm font-bold" style={{ color: isWarning ? "hsl(var(--destructive))" : color }}>
            {animatedValue.toFixed(1)}
          </span>
          <span className="text-[9px] text-muted-foreground ml-0.5">{unit}</span>
        </div>
      </div>
    </TooltipProvider>
  );
};

// Numeric counter component
interface NumericCounterProps {
  value: number;
  label: string;
  unit: string;
  decimals?: number;
  color?: string;
  size?: "sm" | "md" | "lg";
  tooltip?: string;
  prefix?: string;
}

export const NumericCounter = ({
  value,
  label,
  unit,
  decimals = 0,
  color = "hsl(var(--foreground))",
  size = "md",
  tooltip,
  prefix,
}: NumericCounterProps) => {
  const animatedValue = useAnimatedValue(value);
  
  const sizes = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl",
  };
  
  return (
    <TooltipProvider delayDuration={300}>
      <div className="metric-card">
        <div className="flex items-center gap-1 mb-1">
          <span className="text-[10px] text-muted-foreground">{label}</span>
          {tooltip && (
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="w-3 h-3 text-muted-foreground/60 cursor-help" />
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-[180px]">
                <p className="text-xs">{tooltip}</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
        <div className="flex items-baseline gap-1">
          {prefix && <span className="text-sm text-muted-foreground">{prefix}</span>}
          <span className={`font-mono font-bold ${sizes[size]}`} style={{ color }}>
            {animatedValue >= 1000 
              ? animatedValue.toLocaleString(undefined, { maximumFractionDigits: decimals })
              : animatedValue.toFixed(decimals)
            }
          </span>
          <span className="text-xs text-muted-foreground">{unit}</span>
        </div>
      </div>
    </TooltipProvider>
  );
};
