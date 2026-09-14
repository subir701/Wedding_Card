import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, PlusCircle, Sparkles } from "lucide-react";
import ScrollFade from "./ScrollFade";

const initialBlessings = [
  { name: "Priya & Karan", message: "Wishing you a lifetime of love and laughter! 💕" },
  { name: "Aunt Sunita", message: "So proud of you both. Can't wait to celebrate!" },
  { name: "Rohan", message: "May your love story keep getting better every year." },
];

const rotations = [-3, 2, -1.5, 3, -2, 1.5, -3.5, 2.5];

function BlessingChip({ b, index, activeId, setActiveId }) {
  const id = `${b.name}-${index}`;
  const isActive = activeId === id;
  const rotation = rotations[index % rotations.length];

  return (
    <div className="relative">
      <motion.button
        type="button"
        layout
        onClick={() => setActiveId(isActive ? null : id)}
        onMouseEnter={() => setActiveId(id)}
        onMouseLeave={() => setActiveId((cur) => (cur === id ? null : cur))}
        animate={{ rotate: isActive ? 0 : rotation }}
        transition={{ duration: 0.3 }}
        className="glass-card px-4 py-3 sm:px-5 sm:py-3.5 flex items-center gap-2 cursor-pointer"
      >
        <Heart size={12} className="text-rosegold shrink-0" fill="currentColor" />
        <span className="text-[11px] sm:text-xs font-medium text-inkbrown/80 whitespace-nowrap">
          {b.name}
        </span>
      </motion.button>

      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 6 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 z-30 w-[180px] sm:w-[220px]"
          >
            <div className="glass-card px-4 py-3 text-center shadow-xl">
              <Sparkles size={12} className="text-gold mx-auto mb-1.5" />
              <p className="text-[11px] sm:text-xs text-inkbrown/80 italic leading-relaxed">
                "{b.message}"
              </p>
              <p className="text-[10px] text-gold-dark mt-2 font-medium">— {b.name}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Blessings() {
  const [blessings, setBlessings] = useState(initialBlessings);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [activeId, setActiveId] = useState(null);

  const addBlessing = (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    setBlessings((b) => [{ name, message }, ...b]);
    setName("");
    setMessage("");
  };

  return (
    <ScrollFade className="w-full flex flex-col items-center justify-center px-6 py-16">
      <h2 className="section-title !text-3xl sm:!text-4xl md:!text-6xl mt-16 sm:mt-8 md:mt-0">
        Blessings & Wishes
      </h2>
      <p className="section-subtitle !text-[10px] sm:!text-xs max-w-[220px] sm:max-w-none mx-auto">
        Hover or tap a name to reveal their wish
      </p>

      <form
        onSubmit={addBlessing}
        className="w-full max-w-[260px] sm:max-w-sm mx-auto flex flex-col gap-2.5 mb-10 mt-2"
      >
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="rounded-xl border border-gold/30 bg-white/60 px-3.5 py-2 text-sm outline-none focus:border-gold-dark"
        />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write your wishes..."
          rows={2}
          className="rounded-xl border border-gold/30 bg-white/60 px-3.5 py-2 text-sm outline-none focus:border-gold-dark resize-none"
        />
        <button
          type="submit"
          className="gold-btn self-center !text-xs !px-6 !py-2"
        >
          <PlusCircle size={14} /> Add Blessing
        </button>
      </form>

      <div className="w-full max-w-[260px] sm:max-w-md md:max-w-xl mx-auto flex flex-wrap justify-center gap-3 sm:gap-4">
        {blessings.map((b, i) => (
          <BlessingChip
            key={`${b.name}-${i}`}
            b={b}
            index={i}
            activeId={activeId}
            setActiveId={setActiveId}
          />
        ))}
      </div>
    </ScrollFade>
  );
}