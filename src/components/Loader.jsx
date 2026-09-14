import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * The invitation opens like a Bengali house window — two wooden shutters
 * the guest taps to swing open, revealing the wedding scene behind it.
 * Kept intentionally light (cream/gold) rather than a dark overlay.
 */
export default function Loader({ onOpen }) {
  const [opening, setOpening] = useState(false);

  const handleTap = () => {
    if (opening) return;
    setOpening(true);
    setTimeout(onOpen, 1400);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-cream"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.9 }}
      >
        <motion.p
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: opening ? 0 : 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-heading text-3xl text-gold-dark mb-6"
        >
          Together with our families
        </motion.p>

        <div
          className="relative w-64 h-80 sm:w-72 sm:h-96 cursor-pointer select-none"
          style={{ perspective: 900 }}
          onClick={handleTap}
          role="button"
          tabIndex={0}
          aria-label="Tap to open the invitation"
          onKeyDown={(e) => e.key === "Enter" && handleTap()}
        >
          {/* window frame */}
          <div className="absolute inset-0 rounded-t-[5rem] rounded-b-xl border-[6px] border-gold bg-gold-light/30 overflow-hidden shadow-xl">
            {/* left shutter */}
            <motion.div
              className="absolute left-0 top-0 w-1/2 h-full bg-gradient-to-br from-[#F4E5B2] to-[#D4AF37] border-r border-gold-dark/40 origin-left"
              style={{ transformStyle: "preserve-3d" }}
              animate={{ rotateY: opening ? -110 : 0 }}
              transition={{ duration: 1.1, ease: "easeInOut" }}
            >
              <ShutterSlats />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-inkbrown/50" />
            </motion.div>

            {/* right shutter */}
            <motion.div
              className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-bl from-[#F4E5B2] to-[#D4AF37] border-l border-gold-dark/40 origin-right"
              style={{ transformStyle: "preserve-3d" }}
              animate={{ rotateY: opening ? 110 : 0 }}
              transition={{ duration: 1.1, ease: "easeInOut" }}
            >
              <ShutterSlats flip />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-inkbrown/50" />
            </motion.div>
          </div>
        </div>

        <motion.p
          animate={{ opacity: opening ? 0 : [0.4, 1, 0.4] }}
          transition={{ opacity: { repeat: opening ? 0 : Infinity, duration: 2 } }}
          className="mt-6 text-xs tracking-[0.3em] uppercase text-inkbrown/60"
        >
          Tap to open
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
}

function ShutterSlats({ flip }) {
  return (
    <div className={`h-full flex flex-col justify-center gap-3 px-4 ${flip ? "items-end" : "items-start"}`}>
      {Array.from({ length: 7 }).map((_, i) => (
        <div key={i} className="w-full h-[2px] bg-inkbrown/15" />
      ))}
    </div>
  );
}
