// components/HouseIntro.jsx
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import weddingConfig from "../config/weddingConfig";

const BENGALI_PHRASES = [
  {
    id: "ulu",
    bn: "উলু উলু উলু! 🎉",
    en: "Ulu Ulu Ulu! 🎉",
    duration: 4200,
  },
  {
    id: "ready",
    bn: "তৈরি তো? 😄",
    en: "Ki re, toiri to? 😄",
    duration: 3000,
  },
  {
    id: "coming",
    bn: "আসছে... আসছে... ✨",
    en: "Dekh, eshe geche! ✨",
    duration: 3200,
  },
];

const SARCASTIC_HINT = {
  main: "Arrey VIP entry chahiye kya? Zor se knock karo tabhi khulega! 🚪😂",
  sub: "Tap the door to enter ✨",
};

const OPENING_MOBILE = { left: "12%", top: "21.5%", width: "76%", height: "77%" };
const OPENING_LAPTOP = { left: "39%", top: "22.5%", width: "22%", height: "66%" };

export default function HouseIntro({ onOpen }) {
  const { 
    houseBg, 
    houseBgLaptop, 
    taxi, 
    doorFrame, 
    doorFrameLaptop, 
    doorPanel,
    ganesh 
  } = weddingConfig.visuals;

  const [scene, setScene] = useState("house");
  const [hasStartedAudio, setHasStartedAudio] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [showSarcasticHint, setShowSarcasticHint] = useState(false);
  const [isAssetsLoaded, setIsAssetsLoaded] = useState(false);

  const uluAudioRef = useRef(null);
  const idleTimerRef = useRef(null);
  const phraseTimerRef = useRef(null);

  // 1. Preload visuals
  useEffect(() => {
    const assets = [houseBg, houseBgLaptop, taxi, doorFrame, doorFrameLaptop, doorPanel, ganesh].filter(Boolean);
    let loadedCount = 0;

    assets.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = img.onerror = () => {
        loadedCount++;
        if (loadedCount >= Math.min(assets.length, 3)) setIsAssetsLoaded(true);
      };
    });

    const fallback = setTimeout(() => setIsAssetsLoaded(true), 1200);
    return () => clearTimeout(fallback);
  }, [houseBg, houseBgLaptop, taxi, doorFrame, doorFrameLaptop, doorPanel, ganesh]);

  // 2. Transition from House to Door scene
  useEffect(() => {
    if (!isAssetsLoaded) return;
    const timer = setTimeout(() => setScene("door"), 4500);
    return () => clearTimeout(timer);
  }, [isAssetsLoaded]);

  // 3. Play sound safely
  const playUlu = () => {
    try {
      if (uluAudioRef.current) {
        uluAudioRef.current.currentTime = 0;
        uluAudioRef.current.volume = 1.0;
        const playPromise = uluAudioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch((err) => {
            console.log("Audio waiting for user gesture:", err.message);
          });
        }
      }
    } catch (e) {
      console.warn("Audio play error:", e);
    }
  };

  // 4. Start audio on user tap
  const startAudioExperience = () => {
    if (hasStartedAudio) return;
    setHasStartedAudio(true);
    setPhraseIndex(0);
    playUlu();
  };

  // 5. Phrase Cycling Loop
  useEffect(() => {
    if (scene !== "door" || !hasStartedAudio) return;

    // Play sound on the ulu phrase
    if (BENGALI_PHRASES[phraseIndex].id === "ulu") {
      playUlu();
    }

    const currentDuration = BENGALI_PHRASES[phraseIndex].duration || 3500;
    phraseTimerRef.current = setTimeout(() => {
      setPhraseIndex((prev) => (prev + 1) % BENGALI_PHRASES.length);
    }, currentDuration);

    return () => {
      if (phraseTimerRef.current) clearTimeout(phraseTimerRef.current);
    };
  }, [scene, hasStartedAudio, phraseIndex]);

  // 6. 10-Second Idle Sarcasm Timer
  useEffect(() => {
    if (scene !== "door") return;

    idleTimerRef.current = setTimeout(() => {
      setShowSarcasticHint(true);
    }, 10000);

    return () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, [scene]);

  const handleDoorTap = () => {
    if (scene !== "door") return;
    setScene("opening");

    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    if (phraseTimerRef.current) clearTimeout(phraseTimerRef.current);
    if (uluAudioRef.current) uluAudioRef.current.pause();

    try {
      const openSound = new Audio("/audio/door-creak.mp3");
      openSound.volume = 0.7;
      openSound.play().catch(() => {});
    } catch {}

    setTimeout(() => onOpen(), 900);
    setTimeout(() => setScene("revealed"), 1600);
  };

  const currentPhrase = BENGALI_PHRASES[phraseIndex];

  return (
    <>
      {/* Only preloads ulu.mp3 — avoids 404 errors on missing files */}
      <audio ref={uluAudioRef} src="/audio/ulu.mp3" preload="auto" />

      <AnimatePresence>
        {scene !== "revealed" && (
          <motion.div
            key="house-intro"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            onClick={startAudioExperience}
            onTouchStart={startAudioExperience}
            className="fixed inset-0 z-[100] overflow-hidden bg-[#2a1c12]"
          >
            {/* SCENE A: House View */}
            <AnimatePresence>
              {scene === "house" && (
                <motion.div
                  key="house-scene"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isAssetsLoaded ? 1 : 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="absolute inset-0 z-0 overflow-hidden bg-[#2a1c12]"
                >
                  <motion.div
                    initial={{ scale: 1 }}
                    animate={{ scale: 1.45 }}
                    transition={{ duration: 5.5, ease: "easeInOut" }}
                    className="w-full h-full"
                    style={{ transformOrigin: "50% 78%" }}
                  >
                    <picture className="w-full h-full block">
                      <source media="(min-width: 768px)" srcSet={houseBgLaptop || houseBg} />
                      <img src={houseBg} alt="Wedding House" className="w-full h-full object-cover object-center" />
                    </picture>
                  </motion.div>

                  {taxi && (
                    <motion.img
                      src={taxi}
                      alt=""
                      initial={{ x: "-70vw" }}
                      animate={{ x: "135vw" }}
                      transition={{ duration: 6.5, ease: "linear" }}
                      className="absolute -bottom-[4%] sm:-bottom-[6%] md:-bottom-[8%] w-[75vw] sm:w-[50vw] md:w-[35vw] max-w-[500px] pointer-events-none z-20 drop-shadow-2xl"
                    />
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* SCENE B: Doorway Scene */}
            <AnimatePresence>
              {(scene === "door" || scene === "opening") && (
                <motion.div
                  key="door-scene"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="absolute inset-0 flex items-center justify-center overflow-hidden z-10"
                >
                  {ganesh ? (
                    <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
                      <img
                        src={ganesh}
                        alt="Auspicious Backdrop"
                        className="w-full h-full object-cover object-center scale-105"
                      />
                      <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]" />
                    </div>
                  ) : (
                    <div className="absolute inset-0 bg-[#2a1c12] z-0" />
                  )}

                  {/* 1. Mobile Portrait Door */}
                  <div
                    className="relative h-full max-h-screen w-auto md:hidden flex items-center justify-center z-10"
                    style={{ aspectRatio: "381 / 654" }}
                  >
                    <div
                      className="absolute flex"
                      style={{
                        left: OPENING_MOBILE.left,
                        top: OPENING_MOBILE.top,
                        width: OPENING_MOBILE.width,
                        height: OPENING_MOBILE.height,
                        perspective: 1200,
                      }}
                    >
                      <motion.div
                        className="w-1/2 h-full overflow-hidden"
                        style={{ transformOrigin: "left center", transformStyle: "preserve-3d" }}
                        animate={
                          scene === "opening"
                            ? { rotateY: -115, x: 0 }
                            : { rotateY: [-2, 2.5, -2], x: [-1.5, 1.5, -1.5] }
                        }
                        transition={
                          scene === "opening"
                            ? { duration: 1.2, ease: [0.4, 0, 0.2, 1] }
                            : { repeat: Infinity, duration: 0.18, ease: "linear" }
                        }
                        onClick={handleDoorTap}
                      >
                        <img src={doorPanel} alt="" className="h-full w-full object-cover object-right cursor-pointer select-none" />
                      </motion.div>

                      <motion.div
                        className="w-1/2 h-full overflow-hidden"
                        style={{ transformOrigin: "right center", transformStyle: "preserve-3d" }}
                        animate={
                          scene === "opening"
                            ? { rotateY: 115, x: 0 }
                            : { rotateY: [2, -2.5, 2], x: [1.5, -1.5, 1.5] }
                        }
                        transition={
                          scene === "opening"
                            ? { duration: 1.2, ease: [0.4, 0, 0.2, 1] }
                            : { repeat: Infinity, duration: 0.18, ease: "linear" }
                        }
                        onClick={handleDoorTap}
                      >
                        <img src={doorPanel} alt="" className="h-full w-full object-cover object-left cursor-pointer select-none" style={{ transform: "scaleX(-1)" }} />
                      </motion.div>
                    </div>

                    <img src={doorFrame} alt="" className="absolute inset-0 w-full h-full object-contain pointer-events-none z-10" />
                  </div>

                  {/* 2. Laptop 16:9 Door */}
                  <div
                    className="relative hidden md:flex items-center justify-center w-full h-full max-h-[92vh] max-w-screen-2xl z-10"
                    style={{ aspectRatio: "16 / 9" }}
                  >
                    <div
                      className="absolute flex"
                      style={{
                        left: OPENING_LAPTOP.left,
                        top: OPENING_LAPTOP.top,
                        width: OPENING_LAPTOP.width,
                        height: OPENING_LAPTOP.height,
                        perspective: 1400,
                      }}
                    >
                      <motion.div
                        className="w-1/2 h-full overflow-hidden"
                        style={{ transformOrigin: "left center", transformStyle: "preserve-3d" }}
                        animate={
                          scene === "opening"
                            ? { rotateY: -115, x: 0 }
                            : { rotateY: [-1.8, 2.2, -1.8], x: [-1.5, 1.5, -1.5] }
                        }
                        transition={
                          scene === "opening"
                            ? { duration: 1.2, ease: [0.4, 0, 0.2, 1] }
                            : { repeat: Infinity, duration: 0.18, ease: "linear" }
                        }
                        onClick={handleDoorTap}
                      >
                        <img src={doorPanel} alt="" className="h-full w-full object-cover object-right cursor-pointer select-none" />
                      </motion.div>

                      <motion.div
                        className="w-1/2 h-full overflow-hidden"
                        style={{ transformOrigin: "right center", transformStyle: "preserve-3d" }}
                        animate={
                          scene === "opening"
                            ? { rotateY: 115, x: 0 }
                            : { rotateY: [1.8, -2.2, 1.8], x: [1.5, -1.5, 1.5] }
                        }
                        transition={
                          scene === "opening"
                            ? { duration: 1.2, ease: [0.4, 0, 0.2, 1] }
                            : { repeat: Infinity, duration: 0.18, ease: "linear" }
                        }
                        onClick={handleDoorTap}
                      >
                        <img src={doorPanel} alt="" className="h-full w-full object-cover object-left cursor-pointer select-none" style={{ transform: "scaleX(-1)" }} />
                      </motion.div>
                    </div>

                    <img src={doorFrameLaptop || doorFrame} alt="" className="absolute inset-0 w-full h-full object-contain pointer-events-none z-10" />
                  </div>

                  {/* 3. Initial "Tap to Listen" Heads-up */}
                  {scene === "door" && !hasStartedAudio && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="absolute top-[24%] sm:top-[20%] md:top-[16%] left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 bg-gold-dark/95 border border-gold-light/40 px-5 py-2 rounded-full shadow-2xl text-cream text-[11px] sm:text-xs tracking-wider uppercase font-semibold cursor-pointer animate-pulse"
                      onClick={startAudioExperience}
                    >
                      <span>🔊</span> Tap anywhere to listen to the chatter!
                    </motion.div>
                  )}

                  {/* 4. Active Bengali Chatter Bubble */}
                  {scene === "door" && hasStartedAudio && (
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={phraseIndex}
                        initial={{ opacity: 0, y: 8, scale: 0.92 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.92 }}
                        transition={{ duration: 0.3 }}
                        onClick={playUlu}
                        className="absolute top-[24%] sm:top-[20%] md:top-[16%] left-1/2 -translate-x-1/2 z-30 flex flex-col items-center bg-cream/95 border border-gold/40 px-5 py-2.5 rounded-2xl shadow-2xl cursor-pointer select-none text-center max-w-[90vw]"
                      >
                        <span className="font-heading text-sm sm:text-base text-inkbrown font-bold tracking-wide">
                          {currentPhrase.bn}
                        </span>
                        <span className="text-[10px] sm:text-xs text-gold-dark font-medium tracking-wider mt-0.5">
                          {currentPhrase.en}
                        </span>
                      </motion.div>
                    </AnimatePresence>
                  )}

                  {/* 5. Option 2 Sarcastic Idle Prompt */}
                  {scene === "door" && showSarcasticHint && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, y: 15 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      onClick={handleDoorTap}
                      className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center cursor-pointer select-none text-center px-4 max-w-[92vw]"
                    >
                      <motion.div
                        animate={{ scale: [1, 1.03, 1] }}
                        transition={{ repeat: Infinity, duration: 1.4 }}
                        className="bg-amber-950/95 border-2 border-gold px-6 py-3 rounded-2xl shadow-2xl text-cream flex flex-col items-center gap-1 backdrop-blur-md"
                      >
                        <span className="text-xs sm:text-sm text-gold-light font-semibold leading-snug">
                          {SARCASTIC_HINT.main}
                        </span>
                        <span className="text-[10px] sm:text-xs text-cream/80 tracking-wide">
                          {SARCASTIC_HINT.sub}
                        </span>
                      </motion.div>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}