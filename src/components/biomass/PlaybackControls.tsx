import { motion } from "framer-motion";
import { Play, Pause, RotateCcw, Volume2, VolumeX } from "lucide-react";

interface PlaybackControlsProps {
  isPlaying: boolean;
  isMuted: boolean;
  onPlayPause: () => void;
  onRestart: () => void;
  onToggleMute: () => void;
}

export const PlaybackControls = ({
  isPlaying,
  isMuted,
  onPlayPause,
  onRestart,
  onToggleMute,
}: PlaybackControlsProps) => {
  return (
    <motion.div
      className="flex items-center gap-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <button
        onClick={onRestart}
        className="control-button"
        aria-label="Restart"
      >
        <RotateCcw className="w-5 h-5 text-foreground" />
      </button>

      <button
        onClick={onPlayPause}
        className="control-button !p-4 !bg-primary hover:!bg-primary/90"
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? (
          <Pause className="w-6 h-6 text-primary-foreground" />
        ) : (
          <Play className="w-6 h-6 text-primary-foreground ml-0.5" />
        )}
      </button>

      <button
        onClick={onToggleMute}
        className="control-button"
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? (
          <VolumeX className="w-5 h-5 text-foreground" />
        ) : (
          <Volume2 className="w-5 h-5 text-foreground" />
        )}
      </button>
    </motion.div>
  );
};
