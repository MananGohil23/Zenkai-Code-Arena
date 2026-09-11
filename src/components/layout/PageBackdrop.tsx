"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useUiStore } from "@/store/useUiStore";

/** Where the ambient accent glow drifts, per section. */
const GLOW_POSITIONS: Record<string, { left: string; top: string }> = {
  hero: { left: "50%", top: "10%" },
  about: { left: "20%", top: "34%" },
  stats: { left: "80%", top: "38%" },
  timeline: { left: "50%", top: "44%" },
  gallery: { left: "22%", top: "50%" },
  tracks: { left: "80%", top: "44%" },
  prizes: { left: "50%", top: "38%" },
  sponsors: { left: "22%", top: "52%" },
  "live-arena": { left: "78%", top: "48%" },
  faq: { left: "50%", top: "50%" },
  team: { left: "26%", top: "44%" },
  register: { left: "50%", top: "44%" },
};

/**
 * Fixed, full-page backdrop that gives every section a shared environment:
 * a dark horizon of the same desert layers used in the hero plus a drifting
 * accent glow that follows the section in view.
 */
export function PageBackdrop() {
  const activeSection = useUiStore((state) => state.activeSection);
  const glow = GLOW_POSITIONS[activeSection] ?? GLOW_POSITIONS.hero;

  const { scrollYProgress } = useScroll();
  const farY = useTransform(scrollYProgress, [0, 1], ["-2%", "-9%"]);
  const midY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const nearY = useTransform(scrollYProgress, [0, 1], ["0%", "-22%"]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #0a0c12 0%, #0c1020 42%, #0a0c12 100%)",
        }}
      />

      <motion.div
        style={{ y: farY }}
        className="absolute inset-x-0 bottom-0 h-[72vh] opacity-[0.07]"
      >
        <Image src="/hero/mountains.png" alt="" fill sizes="100vw" className="object-cover object-bottom" />
      </motion.div>
      <motion.div
        style={{ y: midY }}
        className="absolute inset-x-0 bottom-0 h-[58vh] opacity-[0.08]"
      >
        <Image src="/hero/hills.png" alt="" fill sizes="100vw" className="object-cover object-bottom" />
      </motion.div>
      <motion.div
        style={{ y: nearY }}
        className="absolute inset-x-0 bottom-0 h-[42vh] opacity-[0.09]"
      >
        <Image src="/hero/sand.png" alt="" fill sizes="100vw" className="object-cover object-bottom" />
      </motion.div>

      <div className="pixel-grid absolute inset-0 opacity-[0.035]" />

      <motion.div
        animate={{ left: glow.left, top: glow.top }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute h-[70vh] w-[70vh] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px]"
        style={{
          background: "radial-gradient(circle, var(--accent-soft), transparent 70%)",
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 42%, rgba(0,0,0,0.6) 100%)",
        }}
      />
    </div>
  );
}
