// components/ScratchCard.jsx
import { useEffect, useRef, useState, useCallback } from "react";
import confetti from "canvas-confetti";
import weddingConfig from "../config/weddingConfig";
import ScrollFade from "./ScrollFade";

export default function ScratchCard({ isCardRevealed = false, onCardRevealed }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const isDrawing = useRef(false);
  const [dims, setDims] = useState({ w: 340, h: 200 });
  const { date, time, venue, day } = weddingConfig.scratchCardReveal;

  useEffect(() => {
    const updateSize = () => {
      const isMobile = window.innerWidth < 640;
      const w = isMobile
        ? Math.min(window.innerWidth * 0.68, 270)
        : Math.min(window.innerWidth * 0.8, 340);
      setDims({ w, h: w * (200 / 340) });
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
    ctx.font = `600 ${Math.round(dims.w / 19)}px Poppins, sans-serif`;
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
    // Stop swipe gestures from bubbling up to App.jsx
    if (e.stopPropagation) e.stopPropagation();

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const { x, y } = getPos(e);
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    // Larger scratch radius so user clears it quickly
    ctx.arc(x, y, Math.max(26, dims.w / 10), 0, Math.PI * 2);
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
    // Lowered threshold to 28% for effortless reveal
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
    <ScrollFade className="w-full flex flex-col items-center justify-center px-6 py-8">
      <h2 className="section-title !text-3xl sm:!text-4xl md:!text-6xl mt-4 sm:mt-0">
        Our Big Day
      </h2>

      <p className="section-subtitle !text-[10px] sm:!text-xs max-w-[220px] sm:max-w-sm mx-auto !mb-4 sm:!mb-6 leading-relaxed">
        {isCardRevealed
          ? "Save the date to celebrate with us!"
          : "Scratch the card to unveil our wedding date"}
      </p>

      <div
        ref={containerRef}
        className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-gold/40 mx-auto"
        style={{ width: dims.w, height: dims.h }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-rosegold/30 to-gold/20 flex flex-col items-center justify-center text-center p-4">
          <p className="font-heading text-2xl sm:text-3xl text-gold-dark">{date}</p>
          <p className="text-xs sm:text-sm text-inkbrown/80 mt-1">{day} • {time}</p>
          <p className="text-xs sm:text-sm text-inkbrown/70 mt-2 px-4">{venue}</p>
        </div>

        {!isCardRevealed && (
          <canvas
            ref={canvasRef}
            width={dims.w}
            height={dims.h}
            className="absolute inset-0 w-full h-full cursor-pointer touch-none z-20"
            onMouseDown={(e) => { isDrawing.current = true; scratch(e); }}
            onMouseMove={scratch}
            onMouseUp={() => (isDrawing.current = false)}
            onMouseLeave={() => (isDrawing.current = false)}
            onTouchStart={(e) => { e.stopPropagation(); isDrawing.current = true; scratch(e); }}
            onTouchMove={(e) => { e.stopPropagation(); scratch(e); }}
            onTouchEnd={(e) => { e.stopPropagation(); isDrawing.current = false; }}
          />
        )}
      </div>

      {isCardRevealed && (
        <p className="mt-4 sm:mt-5 text-gold-dark font-heading text-xl sm:text-2xl text-center">
          See you there! ✨
        </p>
      )}
    </ScrollFade>
  );
}