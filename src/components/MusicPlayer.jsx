import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Music2, Pause, Volume2, VolumeX } from "lucide-react";
import weddingConfig from "../config/weddingConfig";

export default function MusicPlayer() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }
    setPlaying((p) => !p);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setMuted(audio.muted);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2">
      <audio ref={audioRef} src={weddingConfig.music.src} loop />
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={toggle}
        className="w-12 h-12 rounded-full glass-card flex items-center justify-center text-gold-dark shadow-lg"
        aria-label={playing ? "Pause music" : "Play music"}
      >
        {playing ? (
          <Pause size={18} />
        ) : (
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
          >
            <Music2 size={18} />
          </motion.span>
        )}
      </motion.button>
      {playing && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={toggleMute}
          className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-gold-dark shadow-lg"
          aria-label={muted ? "Unmute" : "Mute"}
        >
          {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </motion.button>
      )}
    </div>
  );
}
