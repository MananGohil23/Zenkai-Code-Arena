"use client";

import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
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

const SCENES = ["/scenes/kame.webp", "/scenes/namek.webp", "/scenes/wasteland.webp"];

function SceneLayer({
  src,
  y,
  opacity,
}: {
  src: string;
  y: MotionValue<string>;
  opacity: MotionValue<number>;
}) {
  return (
    <motion.div style={{ y, opacity }} className="absolute inset-0">
      <div
        className="relative h-full w-full"
        style={{ transform: "scale(1.12)" }}
      >
        <Image
          src={src}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
    </motion.div>
  );
}

/**
 * Fixed, full-page backdrop built from three painted DBZ locales that
 * cross-fade and parallax as you scroll through the site, layered under a
 * darkening wash, blueprint grid, drifting accent glow and vignette.
 */
export function PageBackdrop() {
  const activeSection = useUiStore((state) => state.activeSection);
  const glow = GLOW_POSITIONS[activeSection] ?? GLOW_POSITIONS.hero;
  const { scrollYProgress } = useScroll();

  // Slow vertical drift per scene.
  const y0 = useTransform(scrollYProgress, [0, 1], ["0%", "-2%"]);
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "-3.5%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "-5%"]);

  // Overlapping cross-fades so scenes dissolve into each other.
  const o0 = useTransform(scrollYProgress, [0, 0.26, 0.42], [1, 1, 0]);
  const o1 = useTransform(scrollYProgress, [0.22, 0.42, 0.6, 0.76], [0, 1, 1, 0]);
  const o2 = useTransform(scrollYProgress, [0.6, 0.78, 1], [0, 1, 1]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <div className="absolute inset-0 bg-void" />

      <SceneLayer src={SCENES[0]} y={y0} opacity={o0} />
      <SceneLayer src={SCENES[1]} y={y1} opacity={o1} />
      <SceneLayer src={SCENES[2]} y={y2} opacity={o2} />

      {/* Colour-grade the scenes toward the active fighter's palette. */}
      <div
        className="mix-blend-hue absolute inset-0"
        style={{ background: "var(--accent)", opacity: 0.34 }}
      />
      <div
        className="mix-blend-soft-light absolute inset-0"
        style={{ background: "var(--accent)", opacity: 0.22 }}
      />

      {/* Darkening wash keeps section copy legible over the art. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,12,18,0.55) 0%, rgba(10,12,18,0.66) 45%, rgba(10,12,18,0.84) 100%)",
        }}
      />
      <div className="pixel-grid absolute inset-0 opacity-[0.05]" />

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
            "radial-gradient(ellipse at center, transparent 38%, rgba(0,0,0,0.62) 100%)",
        }}
      />
    </div>
  );
}
