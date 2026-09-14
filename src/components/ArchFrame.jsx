// components/ArchFrame.jsx
import { motion } from "framer-motion";
import MarigoldShower from "./illustrations/MarigoldShower";
import weddingConfig from "../config/weddingConfig";

export default function ArchFrame({ revealed }) {
  const { archFrame, groomImage, brideImage, havanImage } = weddingConfig.visuals;
  return (
    <motion.img
      src={archFrame}
      alt=""
      aria-hidden="true"
      initial={{ opacity: 0, scale: 1.15 }}
      animate={revealed ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="fixed inset-0 w-full h-full object-fill sm:object-cover object-top sm:object-center z-0 pointer-events-none"
    />
    
  );
}