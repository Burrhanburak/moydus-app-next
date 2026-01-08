"use client";

import { motion } from "framer-motion";

export default function PatternBackground() {
  return (
    <motion.div
      className="absolute inset-0 z-0 pointer-events-none"
      initial={{ scale: 1, opacity: 0 }}
      animate={{ scale: 1, opacity: 0.8 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 1,
      }}
      style={{
        backgroundImage: "url('/pattern.png')",
        backgroundSize: "65px auto",
        backgroundPosition: "left top",
        backgroundRepeat: "repeat",
        mixBlendMode: "screen",
        willChange: "transform",
      }}
    />
  );
}
