// App.jsx
import { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import HouseIntro from "./components/HouseIntro";
import ArchFrame from "./components/ArchFrame";
import Hero from "./components/Hero";
import ScratchCard from "./components/ScratchCard";
import Family from "./components/Family";
import Venue from "./components/Venue";
import Blessings from "./components/Blessings";
import ThankYou from "./components/ThankYou";
import Footer from "./components/Footer";
import MusicPlayer from "./components/MusicPlayer";

const SECTIONS = [
  { id: "hero", Component: Hero },
  { id: "scratch", Component: ScratchCard },
  { id: "family", Component: Family },
  { id: "venue", Component: Venue },
  { id: "blessings", Component: Blessings },
  { id: "thankyou", Component: ThankYou },
  { id: "footer", Component: Footer },
];

const AUTO_ADVANCE_MS = 10000;

export default function App() {
  const [revealed, setRevealed] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCardRevealed, setIsCardRevealed] = useState(false);
  const isTransitioning = useRef(false);
  const autoAdvanceTimer = useRef(null);

  const isScratchLocked = SECTIONS[currentIndex].id === "scratch" && !isCardRevealed;

  const goToNext = useCallback(() => {
    // Prevent moving next if scratch card is not yet revealed
    if (SECTIONS[currentIndex].id === "scratch" && !isCardRevealed) return;
    setCurrentIndex((prev) => (prev < SECTIONS.length - 1 ? prev + 1 : prev));
  }, [currentIndex, isCardRevealed]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  const resetAutoAdvance = useCallback(() => {
    if (autoAdvanceTimer.current) clearTimeout(autoAdvanceTimer.current);
    if (!revealed || currentIndex >= SECTIONS.length - 1 || isScratchLocked) return;

    autoAdvanceTimer.current = setTimeout(() => {
      goToNext();
    }, AUTO_ADVANCE_MS);
  }, [currentIndex, revealed, isScratchLocked, goToNext]);

  useEffect(() => {
    resetAutoAdvance();
    return () => {
      if (autoAdvanceTimer.current) clearTimeout(autoAdvanceTimer.current);
    };
  }, [currentIndex, revealed, isCardRevealed, resetAutoAdvance]);

  const handleCardRevealed = useCallback(() => {
    setIsCardRevealed(true);
    if (autoAdvanceTimer.current) clearTimeout(autoAdvanceTimer.current);
    autoAdvanceTimer.current = setTimeout(() => {
      goToNext();
    }, AUTO_ADVANCE_MS);
  }, [goToNext]);

  const handleWheel = (e) => {
    if (isTransitioning.current) return;
    if (e.deltaY > 25) {
      if (isScratchLocked) return; // Prevent skipping scratch card
      isTransitioning.current = true;
      goToNext();
      setTimeout(() => { isTransitioning.current = false; }, 650);
    } else if (e.deltaY < -25) {
      isTransitioning.current = true;
      goToPrev();
      setTimeout(() => { isTransitioning.current = false; }, 650);
    }
  };

  const touchStartY = useRef(0);
  const touchStartX = useRef(0);

  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (isTransitioning.current) return;
    const touchEndY = e.changedTouches[0].clientY;
    const touchEndX = e.changedTouches[0].clientX;

    const diffY = touchStartY.current - touchEndY;
    const diffX = touchStartX.current - touchEndX;

    if (Math.abs(diffY) > Math.abs(diffX) && Math.abs(diffY) > 40) {
      if (diffY > 0) {
        if (isScratchLocked) return; // Disallow swiping forward while scratching
        isTransitioning.current = true;
        goToNext();
        setTimeout(() => { isTransitioning.current = false; }, 650);
      } else {
        isTransitioning.current = true;
        goToPrev();
        setTimeout(() => { isTransitioning.current = false; }, 650);
      }
    }
  };

  const ActiveComponent = SECTIONS[currentIndex].Component;
  const showScrollCue = revealed && currentIndex < SECTIONS.length - 2 && !isScratchLocked;

  return (
    <>
      {!revealed && <HouseIntro onOpen={() => setRevealed(true)} />}

      <div
        className="fixed inset-0 bg-ivory w-full h-full overflow-hidden select-none"
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onClick={resetAutoAdvance}
      >
        <ArchFrame revealed={revealed} />

        <main className="relative z-10 h-full w-full flex items-center justify-center pointer-events-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={SECTIONS[currentIndex].id}
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -15 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="w-full h-full flex items-center justify-center"
            >
              <ActiveComponent 
                revealed={revealed} 
                isCardRevealed={isCardRevealed}
                onCardRevealed={handleCardRevealed}
              />
            </motion.div>
          </AnimatePresence>
        </main>

        <AnimatePresence>
          {showScrollCue && (
            <motion.div
              key="scroll-cue"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute bottom-3 sm:bottom-4 left-0 right-0 z-30 flex flex-col items-center gap-0.5 text-inkbrown/60 pointer-events-none"
            >
              <span className="text-[9px] sm:text-[10px] tracking-[0.3em] uppercase font-semibold">
                Scroll / Swipe
              </span>
              <motion.span
                animate={{ y: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="text-gold-dark text-xs sm:text-sm font-bold"
              >
                ↓
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <MusicPlayer revealed={revealed} />
    </>
  );
}