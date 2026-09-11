"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASE, REVEAL_START } from "@/lib/animations";

/**
 * Section-scoped GSAP reveal. Animates any `[data-reveal]` descendants
 * (staggered) or the container itself. Uses `gsap.context` so everything is
 * reverted on unmount, and falls back to a plain fade for reduced motion.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(el, { opacity: 1, y: 0 });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const targets = el.querySelectorAll("[data-reveal]");
      gsap.from(targets.length ? targets : el, {
        opacity: 0,
        y: 32,
        duration: 0.7,
        ease: EASE.smooth,
        stagger: 0.08,
        scrollTrigger: {
          trigger: el,
          start: REVEAL_START,
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return ref;
}
