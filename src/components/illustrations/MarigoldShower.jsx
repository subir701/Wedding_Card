import { useMemo } from "react";
import { motion } from "framer-motion";

function Marigold({ size }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size}>
      <g fill="#E8963C">
        {Array.from({ length: 8 }).map((_, i) => (
          <ellipse
            key={i}
            cx="12"
            cy="6"
            rx="3"
            ry="5.5"
            transform={`rotate(${i * 45} 12 12)`}
            opacity="0.95"
          />
        ))}
      </g>
      <circle cx="12" cy="12" r="3.4" fill="#D4AF37" />
    </svg>
  );
}

/**
 * A gentle, continuous shower of marigold flowers across the hero scene.
 * Purely decorative — pointer-events disabled.
 */
export default function MarigoldShower({ count = 22 }) {
  const items = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 5 + Math.random() * 5,
        size: 12 + Math.random() * 14,
        spin: Math.random() > 0.5 ? 360 : -360,
      })),
    [count]
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-20" aria-hidden="true">
      {items.map((item) => (
        <motion.div
          key={item.id}
          className="absolute"
          style={{ left: `${item.left}%`, top: "-8%" }}
          initial={{ y: "-10vh", opacity: 0 }}
          animate={{
            y: "110vh",
            opacity: [0, 1, 1, 0],
            rotate: item.spin,
            x: [0, 20, -10, 0],
          }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Marigold size={item.size} />
        </motion.div>
      ))}
    </div>
  );
}
