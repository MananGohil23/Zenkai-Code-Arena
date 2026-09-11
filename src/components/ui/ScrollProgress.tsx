"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Thin progress bar pinned to the very top of the viewport, tinted with the
 * active fighter's accent so the chosen colour scheme reads site-wide.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{
        scaleX,
        background: "linear-gradient(90deg, var(--accent-2), var(--accent))",
      }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left"
    />
  );
}
