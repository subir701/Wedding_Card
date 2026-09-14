import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import confetti from "canvas-confetti";
import FloatingPetals from "./FloatingPetals";
import ScrollFade from "./ScrollFade";

export default function ThankYou() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0 }, colors: ["#D4AF37", "#E8B4B8"] });
      confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1 }, colors: ["#D4AF37", "#E8B4B8"] });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  }, [inView]);

  return (
    <div ref={ref}>
      <ScrollFade className="w-full flex flex-col items-center justify-center text-center overflow-hidden">
        <FloatingPetals count={12} variant="heart" />

        <h2 className="font-heading text-4xl sm:text-5xl md:text-7xl text-gold-dark z-10">
          Thank You
        </h2>

        <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base text-inkbrown/80 max-w-[240px] sm:max-w-sm md:max-w-md z-10 leading-relaxed">
          We look forward to celebrating with you.
        </p>
      </ScrollFade>
    </div>
  );
}