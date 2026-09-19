// components/HouseIntro.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import weddingConfig from "../config/weddingConfig";

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
    ganesh,
  } = weddingConfig.visuals;

  const [scene, setScene] = useState("house");
  const [isAssetsLoaded, setIsAssetsLoaded] = useState(false);

  // Preload visuals
  useEffect(() => {
    const assets = [
      houseBg,
      houseBgLaptop,
      taxi,
      doorFrame,
      doorFrameLaptop,
      doorPanel,
      ganesh,
    ].filter(Boolean);

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

  // Transition from House Zoom scene to Door scene
  useEffect(() => {
    if (!isAssetsLoaded) return;
    const timer = setTimeout(() => setScene("door"), 4500);
    return () => clearTimeout(timer);
  }, [isAssetsLoaded]);

  // Handle single click anywhere on screen
  const handleOpenDoor = () => {
    if (scene !== "door") return;
    setScene("opening");

    // Play subtle door opening sound
    try {
      const creakAudio = new Audio("/audio/door-creak.mp3");
      creakAudio.volume = 0.7;
      creakAudio.play().catch(() => {});
    } catch {}

    // Reveal main app and trigger music
    setTimeout(() => onOpen(), 900);
    setTimeout(() => setScene("revealed"), 1600);
  };

  return (
    <AnimatePresence>
      {scene !== "revealed" && (
        <motion.div
          key="house-intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          onClick={handleOpenDoor}
          className="fixed inset-0 z-[100] overflow-hidden bg-[#2a1c12] cursor-pointer"
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
                    <source
                      media="(min-width: 768px)"
                      srcSet={houseBgLaptop || houseBg}
                    />
                    <img
                      src={houseBg}
                      alt="Wedding House"
                      className="w-full h-full object-cover object-center"
                    />
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

                {/* Mobile View */}
                <div
                  className="relative h-full max-h-screen w-auto md:hidden flex items-center justify-center z-10 pointer-events-none"
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
                      style={{
                        transformOrigin: "left center",
                        transformStyle: "preserve-3d",
                      }}
                      animate={
                        scene === "opening"
                          ? { rotateY: -115, x: 0 }
                          : { rotateY: [-1.5, 2, -1.5], x: [-1, 1, -1] }
                      }
                      transition={
                        scene === "opening"
                          ? { duration: 1.2, ease: [0.4, 0, 0.2, 1] }
                          : { repeat: Infinity, duration: 0.22, ease: "linear" }
                      }
                    >
                      <img
                        src={doorPanel}
                        alt=""
                        className="h-full w-full object-cover object-right select-none"
                      />
                    </motion.div>

                    <motion.div
                      className="w-1/2 h-full overflow-hidden"
                      style={{
                        transformOrigin: "right center",
                        transformStyle: "preserve-3d",
                      }}
                      animate={
                        scene === "opening"
                          ? { rotateY: 115, x: 0 }
                          : { rotateY: [1.5, -2, 1.5], x: [1, -1, 1] }
                      }
                      transition={
                        scene === "opening"
                          ? { duration: 1.2, ease: [0.4, 0, 0.2, 1] }
                          : { repeat: Infinity, duration: 0.22, ease: "linear" }
                      }
                    >
                      <img
                        src={doorPanel}
                        alt=""
                        className="h-full w-full object-cover object-left select-none"
                        style={{ transform: "scaleX(-1)" }}
                      />
                    </motion.div>
                  </div>

                  <img
                    src={doorFrame}
                    alt=""
                    className="absolute inset-0 w-full h-full object-contain pointer-events-none z-10"
                  />
                </div>

                {/* Desktop View */}
                <div
                  className="relative hidden md:flex items-center justify-center w-full h-full max-h-[92vh] max-w-screen-2xl z-10 pointer-events-none"
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
                      style={{
                        transformOrigin: "left center",
                        transformStyle: "preserve-3d",
                      }}
                      animate={
                        scene === "opening"
                          ? { rotateY: -115, x: 0 }
                          : { rotateY: [-1.5, 2, -1.5], x: [-1, 1, -1] }
                      }
                      transition={
                        scene === "opening"
                          ? { duration: 1.2, ease: [0.4, 0, 0.2, 1] }
                          : { repeat: Infinity, duration: 0.22, ease: "linear" }
                      }
                    >
                      <img
                        src={doorPanel}
                        alt=""
                        className="h-full w-full object-cover object-right select-none"
                      />
                    </motion.div>

                    <motion.div
                      className="w-1/2 h-full overflow-hidden"
                      style={{
                        transformOrigin: "right center",
                        transformStyle: "preserve-3d",
                      }}
                      animate={
                        scene === "opening"
                          ? { rotateY: 115, x: 0 }
                          : { rotateY: [1.5, -2, 1.5], x: [1, -1, 1] }
                      }
                      transition={
                        scene === "opening"
                          ? { duration: 1.2, ease: [0.4, 0, 0.2, 1] }
                          : { repeat: Infinity, duration: 0.22, ease: "linear" }
                      }
                    >
                      <img
                        src={doorPanel}
                        alt=""
                        className="h-full w-full object-cover object-left select-none"
                        style={{ transform: "scaleX(-1)" }}
                      />
                    </motion.div>
                  </div>

                  <img
                    src={doorFrameLaptop || doorFrame}
                    alt=""
                    className="absolute inset-0 w-full h-full object-contain pointer-events-none z-10"
                  />
                </div>

                {/* Elegant Tap Message */}
                {scene === "door" && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center pointer-events-none text-center px-4"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                      className="bg-gold-dark/95 border border-gold-light/50 px-6 py-2.5 rounded-full shadow-2xl text-cream text-xs sm:text-sm tracking-[0.2em] uppercase font-semibold flex items-center gap-2 backdrop-blur-sm"
                    >
                      <span>✨</span> Tap anywhere to open <span>✨</span>
                    </motion.div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}