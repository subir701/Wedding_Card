// components/ScratchCard.jsx
import { useEffect, useRef, useState, useCallback } from "react";
import confetti from "canvas-confetti";
import weddingConfig from "../config/weddingConfig";
import ScrollFade from "./ScrollFade";

export default function ScratchCard({ isCardRevealed = false, onCardRevealed }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const isDrawing = useRef(false);

  // Proportional sizing calibrated for dual-event display
  const [dims, setDims] = useState({ w: 350, h: 240 });

  const {
    weddingDate,
    weddingDay,
    weddingTime,
    receptionDate,
    receptionDay,
    receptionTime,
    venue,
  } = weddingConfig.scratchCardReveal;

  useEffect(() => {
    const updateSize = () => {
      const isMobile = window.innerWidth < 640;
      const w = isMobile
        ? Math.min(window.innerWidth * 0.82, 310)
        : Math.min(window.innerWidth * 0.8, 380);
      const h = isMobile ? 245 : 255;
      setDims({ w, h });
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const drawOverlay = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || isCardRevealed) return;
    const ctx = canvas.getContext("2d");

    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, "#A9861F");
    gradient.addColorStop(0.5, "#F4E5B2");
    gradient.addColorStop(1, "#D4AF37");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "rgba(59,43,32,0.85)";
    ctx.font = `600 ${Math.round(dims.w / 18)}px Poppins, sans-serif`;
    ctx.textAlign = "center";
    ctx.fillText("✨ Scratch to Reveal ✨", canvas.width / 2, canvas.height / 2);
  }, [dims, isCardRevealed]);

  useEffect(() => {
    drawOverlay();
  }, [drawOverlay]);

  const getPos = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: (clientX - rect.left) * (canvas.width / rect.width),
      y: (clientY - rect.top) * (canvas.height / rect.height),
    };
  };

  const scratch = (e) => {
    if (!isDrawing.current || isCardRevealed) return;
    if (e.stopPropagation) e.stopPropagation();

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const { x, y } = getPos(e);
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, Math.max(26, dims.w / 9.5), 0, Math.PI * 2);
    ctx.fill();
    checkRevealPercentage();
  };

  const checkRevealPercentage = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let cleared = 0;
    for (let i = 3; i < pixels.length; i += 4 * 30) {
      if (pixels[i] === 0) cleared++;
    }
    const total = pixels.length / (4 * 30);
    if (cleared / total > 0.28) {
      if (onCardRevealed) onCardRevealed();
      fireConfetti();
    }
  };

  const fireConfetti = () => {
    const rect = containerRef.current?.getBoundingClientRect();
    confetti({
      particleCount: 120,
      spread: 80,
      origin: {
        x: rect ? (rect.left + rect.width / 2) / window.innerWidth : 0.5,
        y: rect ? rect.top / window.innerHeight : 0.5,
      },
      colors: ["#D4AF37", "#E8B4B8", "#FFF8F0"],
    });
  };

  return (
    <ScrollFade className="w-full flex flex-col items-center justify-center px-6 py-6">
      <h2 className="section-title !text-3xl sm:!text-4xl md:!text-6xl mt-2 sm:mt-0">
        Our Big Days
      </h2>

      <p className="section-subtitle !text-[10px] sm:!text-xs max-w-[240px] sm:max-w-sm mx-auto !mb-3 sm:!mb-5 leading-relaxed">
        {isCardRevealed
          ? "Two special evenings, countless memories. Can't wait to celebrate with you!"
          : "Scratch the card to unveil our celebration dates"}
      </p>

      <div
        ref={containerRef}
        className="relative rounded-3xl overflow-hidden shadow-2xl border-2 sm:border-[3px] border-gold/40 mx-auto"
        style={{ width: dims.w, height: dims.h }}
      >
        {/* REVEAL CONTENT */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FFF9F2] via-[#FDF5E6] to-[#FAF0E1] flex flex-col items-center justify-between text-center py-4 px-4">
          
          {/* Event 1: Wedding */}
          <div className="flex flex-col items-center">
            <span className="text-[10px] tracking-[0.25em] uppercase font-semibold text-gold-dark/90 mb-0.5">
              Wedding Ceremony
            </span>
            <p className="font-serif text-lg sm:text-xl text-inkbrown font-medium tracking-wide">
              {weddingDate}
            </p>
            <p className="text-[11px] sm:text-xs text-inkbrown/70 tracking-wider font-light mt-0.5">
              {weddingDay} &bull; {weddingTime}
            </p>
          </div>

          {/* Minimalist Divider */}
          <div className="w-28 h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

          {/* Event 2: Reception */}
          <div className="flex flex-col items-center">
            <span className="text-[10px] tracking-[0.25em] uppercase font-semibold text-gold-dark/90 mb-0.5">
              Grand Reception
            </span>
            <p className="font-serif text-lg sm:text-xl text-inkbrown font-medium tracking-wide">
              {receptionDate}
            </p>
            <p className="text-[11px] sm:text-xs text-inkbrown/70 tracking-wider font-light mt-0.5">
              {receptionDay} &bull; {receptionTime}
            </p>
          </div>

          {/* Shared Venue Footer */}
          <div className="w-full pt-2 border-t border-gold/20">
            <p className="text-[10px] sm:text-[11px] text-inkbrown/80 font-normal tracking-wide px-2">
              📍 {venue}
            </p>
          </div>
        </div>

        {/* Scratch Canvas Overlay */}
        {!isCardRevealed && (
          <canvas
            ref={canvasRef}
            width={dims.w}
            height={dims.h}
            className="absolute inset-0 w-full h-full cursor-pointer touch-none z-20"
            onMouseDown={(e) => {
              isDrawing.current = true;
              scratch(e);
            }}
            onMouseMove={scratch}
            onMouseUp={() => (isDrawing.current = false)}
            onMouseLeave={() => (isDrawing.current = false)}
            onTouchStart={(e) => {
              e.stopPropagation();
              isDrawing.current = true;
              scratch(e);
            }}
            onTouchMove={(e) => {
              e.stopPropagation();
              scratch(e);
            }}
            onTouchEnd={(e) => {
              e.stopPropagation();
              isDrawing.current = false;
            }}
          />
        )}
      </div>

      {isCardRevealed && (
        <p className="mt-3 sm:mt-4 text-gold-dark font-heading text-xl sm:text-2xl text-center">
          See you there! ✨
        </p>
      )}
    </ScrollFade>
  );
}