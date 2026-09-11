/**
 * Shared motion language. Pixel/UI elements snap (`steps`), while large
 * section reveals glide — the contrast is what sells "retro game, modern
 * engineering".
 */
export const EASE = {
  /** Hard, quantised feel for pixel UI. */
  pixel: "steps(6)",
  /** Default micro-interaction ease. */
  snap: "power1.inOut",
  /** Large section reveal. */
  smooth: "power3.out",
} as const;

export const REVEAL = {
  opacity: 0,
  y: 32,
  duration: 0.7,
  ease: EASE.smooth,
  stagger: 0.08,
} as const;

export const REVEAL_START = "top 82%";
