"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="reading-progress-bar fixed left-0 right-0 top-0 z-[60] h-[3px] origin-left"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}
