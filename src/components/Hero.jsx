import { motion } from "framer-motion";
import MarigoldShower from "./illustrations/MarigoldShower";
import weddingConfig from "../config/weddingConfig";

export default function Hero({ revealed }) {
  const { brideName, groomName } = weddingConfig.couple;
  const { groomImage, brideImage, havanImage } = weddingConfig.visuals;

  return (
    <section
      id="home"
      className="relative h-full w-full overflow-hidden flex flex-col items-center justify-between"
    >
      {/* Flower Shower Overlay */}
      <div className="absolute inset-0 pointer-events-none z-30">
        <MarigoldShower count={10} />
      </div>

      {/* Names & Tagline */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={revealed ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute top-[30%] sm:top-[26%] md:top-[22%] left-0 right-0 z-20 text-center px-4"
      >
        <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl text-gold-dark drop-shadow-sm leading-tight">
          {brideName} <span className="text-rosegold">&</span> {groomName}
        </h1>
        <p className="mt-1 sm:mt-2 text-[10px] sm:text-xs md:text-sm tracking-[0.3em] sm:tracking-[0.4em] uppercase text-inkbrown/80 font-medium">
          Are Getting Married
        </p>
      </motion.div>

      {/* Couple & Havan Cluster */}
      <div className="absolute bottom-[16%] sm:bottom-[14%] md:bottom-[12%] left-0 right-0 z-20 flex items-end justify-center space-x-2 sm:space-x-4 md:space-x-6 px-2">
        
        {/* Bride */}
        <motion.div
          initial={{ x: "-140%", opacity: 0 }}
          animate={revealed ? { x: "0%", opacity: 1 } : {}}
          transition={{ duration: 1.1, delay: 0.4, ease: "easeOut" }}
          className="h-[42vh] sm:h-[48vh] md:h-[52vh] w-auto flex justify-end z-10 flex-shrink-0"
        >
          <img
            src={brideImage}
            alt={`${brideName}, the bride`}
            className="h-full w-auto object-contain drop-shadow-xl"
          />
        </motion.div>

        {/* Sacred Havan Fire */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={revealed ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 1, duration: 0.8 }}
          className="w-[20vw] sm:w-[17vw] md:w-[14vw] max-w-[220px] translate-y-10 sm:translate-y-6 md:translate-y-8 flex justify-center z-20"
        >
          <img
            src={havanImage}
            alt="Sacred wedding fire"
            className="w-full h-auto object-contain drop-shadow-md"
          />
        </motion.div>

        {/* Groom */}
        <motion.div
          initial={{ x: "140%", opacity: 0 }}
          animate={revealed ? { x: "0%", opacity: 1 } : {}}
          transition={{ duration: 1.1, delay: 0.4, ease: "easeOut" }}
          className="h-[42vh] sm:h-[48vh] md:h-[52vh] w-auto flex justify-start z-10 flex-shrink-0"
        >
          <img
            src={groomImage}
            alt={`${groomName}, the groom`}
            className="h-full w-auto object-contain drop-shadow-xl"
          />
        </motion.div>

      </div>

    </section>
  );
}