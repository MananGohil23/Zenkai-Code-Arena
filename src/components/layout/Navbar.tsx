"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUiStore } from "@/store/useUiStore";
import { useSound } from "@/hooks/useSound";
import { EVENT } from "@/constants/content";
import { DragonBall } from "@/components/shared/DragonBall";

const LINKS = [
  { id: "about", label: "About" },
  { id: "timeline", label: "Rounds" },
  { id: "tracks", label: "Format" },
  { id: "prizes", label: "Prizes" },
  { id: "faq", label: "FAQ" },
  { id: "team", label: "Team" },
];

export function Navbar() {
  const introSeen = useUiStore((state) => state.introSeen);
  const activeSection = useUiStore((state) => state.activeSection);
  const setActiveSection = useUiStore((state) => state.setActiveSection);
  const { play } = useSound();

  useEffect(() => {
    if (!introSeen) return;
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("main section[id]")
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [introSeen, setActiveSection]);

  return (
    <AnimatePresence>
      {introSeen && (
        <motion.header
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 top-0 z-50 border-b-2 border-black/60 bg-void/85 backdrop-blur"
        >
          <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
            <a
              href="#hero"
              onClick={() => play("blip")}
              className="flex items-center gap-2"
            >
              <DragonBall stars={4} size={26} />
              <span className="font-pixel text-[9px] tracking-wide text-ink sm:text-[11px]">
                {EVENT.shortName}
              </span>
            </a>

            <ul className="hidden items-center gap-1 md:flex">
              {LINKS.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <li key={link.id}>
                    <a
                      href={`#${link.id}`}
                      onMouseEnter={() => play("blip")}
                      className="rounded px-3 py-2 font-pixel text-[9px] tracking-wide transition-colors"
                      style={{
                        color: isActive ? "var(--accent)" : undefined,
                      }}
                    >
                      <span className={isActive ? "" : "text-ink-faint"}>
                        {link.label}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>

            <a
              href="#register"
              onMouseEnter={() => play("blip")}
              onClick={() => play("confirm")}
              className="pixel-button rounded-md border-2 border-black/70 bg-accent px-4 py-2 font-pixel text-[9px] tracking-wide text-void"
            >
              Register
            </a>
          </nav>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
