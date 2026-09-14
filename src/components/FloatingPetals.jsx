import { useMemo } from "react";
import { motion } from "framer-motion";

/**
 * Decorative floating petals / sparkles background.
 * Purely visual — pointer-events disabled so it never blocks interaction.
 */
export default function FloatingPetals({ count = 14, variant = "petal" }) {
  const items = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 6,
        duration: 8 + Math.random() * 8,
        size: 14 + Math.random() * 18,
        drift: Math.random() * 60 - 30,
      })),
    [count]
  );

  const symbol = variant === "sparkle" ? "✦" : variant === "heart" ? "♥" : "❀";

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-0" aria-hidden="true">
      {items.map((item) => (
        <motion.span
          key={item.id}
          className="absolute select-none"
          style={{
            left: `${item.left}%`,
            fontSize: item.size,
            color: variant === "sparkle" ? "#D4AF37" : "#E8B4B8",
            top: "-5%",
          }}
          initial={{ y: "-10vh", x: 0, opacity: 0, rotate: 0 }}
          animate={{
            y: "110vh",
            x: [0, item.drift, 0],
            opacity: [0, 1, 1, 0],
            rotate: 360,
          }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {symbol}
        </motion.span>
      ))}
    </div>
  );
}
