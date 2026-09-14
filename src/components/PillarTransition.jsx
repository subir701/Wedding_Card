import { motion } from "framer-motion";
import weddingConfig from "../config/weddingConfig";

/**
 * A quiet architectural interlude — stone pillars with a soft arch —
 * that takes over visually once the Hero's couple has retreated offscreen.
 * If you have a real pillar-photo asset, set visuals.pillarBg in the config
 * and it will be used instead of the built-in illustrated pillars.
 */
export default function PillarTransition() {
  const { pillarBg } = weddingConfig.visuals;

  return (
    <section className="relative h-[70vh] md:h-[85vh] overflow-hidden bg-cream flex items-center justify-center">
      {pillarBg ? (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-90"
          style={{ backgroundImage: `url(${pillarBg})` }}
        />
      ) : (
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 400 300"
          preserveAspectRatio="xMidYMax slice"
        >
          <rect width="400" height="300" fill="#FDF6EC" />
          {/* left pillar */}
          <rect x="30" y="40" width="34" height="260" fill="#E9CE7A" opacity="0.55" />
          <rect x="26" y="30" width="42" height="14" fill="#D4AF37" opacity="0.6" />
          {/* right pillar */}
          <rect x="336" y="40" width="34" height="260" fill="#E9CE7A" opacity="0.55" />
          <rect x="332" y="30" width="42" height="14" fill="#D4AF37" opacity="0.6" />
          {/* soft arch connecting them */}
          <path
            d="M64 60 Q200 -30 336 60"
            stroke="#D4AF37"
            strokeWidth="6"
            fill="none"
            opacity="0.4"
          />
        </svg>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center px-6"
      >
        <p className="font-heading text-4xl md:text-5xl text-gold-dark">
          A Sacred Beginning
        </p>
        <div className="divider-flourish"><span>✦</span></div>
      </motion.div>
    </section>
  );
}
