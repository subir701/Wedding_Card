import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import weddingConfig from "../config/weddingConfig";

function getTimeLeft(target) {
  const diff = +new Date(target) - +new Date();
  if (diff <= 0) return null;
  return {
    Days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    Hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    Minutes: Math.floor((diff / 1000 / 60) % 60),
    Seconds: Math.floor((diff / 1000) % 60),
  };
}

function DigitCard({ label, value }) {
  return (
    <div className="glass-card w-20 md:w-28 py-4 md:py-6 flex flex-col items-center overflow-hidden">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={value}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="text-3xl md:text-5xl font-semibold text-gold-dark tabular-nums"
        >
          {String(value).padStart(2, "0")}
        </motion.span>
      </AnimatePresence>
      <span className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-inkbrown/60 mt-2">
        {label}
      </span>
    </div>
  );
}

export default function Countdown() {
  const [time, setTime] = useState(() => getTimeLeft(weddingConfig.weddingDateTime));

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(getTimeLeft(weddingConfig.weddingDateTime));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-ivory to-rosegold/10 flex flex-col items-center">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="section-title"
      >
        Counting Down
      </motion.h2>
      <p className="section-subtitle">Until we say "I do"</p>

      {time ? (
        <div className="flex gap-3 md:gap-6">
          <DigitCard label="Days" value={time.Days} />
          <DigitCard label="Hours" value={time.Hours} />
          <DigitCard label="Minutes" value={time.Minutes} />
          <DigitCard label="Seconds" value={time.Seconds} />
        </div>
      ) : (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-heading text-4xl text-gold-dark"
        >
          The celebration has begun!
        </motion.p>
      )}
    </section>
  );
}
