"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useUiStore } from "@/store/useUiStore";

/**
 * Buttery smooth scrolling (Lenis) wired into GSAP's ticker + ScrollTrigger,
 * so scroll-linked reveals stay in sync. Paused until the intro is dismissed
 * and disabled entirely for reduced-motion users.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const introSeen = useUiStore((state) => state.introSeen);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    lenisRef.current = lenis;

    lenis.on("scroll", () => ScrollTrigger.update());

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;
    if (introSeen) {
      lenis.start();
      ScrollTrigger.refresh();
    } else {
      lenis.stop();
    }
  }, [introSeen]);

  return <>{children}</>;
}
