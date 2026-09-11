"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useFighterTheme } from "@/context/ThemeContext";
import { FIGHTERS, DEFAULT_FIGHTER } from "@/constants/fighters";
import { FighterId } from "@/types";
import { EVENT } from "@/constants/content";
import { useTypewriter } from "@/hooks/useTypewriter";
import { useIntroGate } from "@/hooks/useIntroGate";
import { useSound } from "@/hooks/useSound";
import { playTheme } from "@/lib/music";
import { withAlpha } from "@/lib/color";
import { DragonBall } from "@/components/shared/DragonBall";

/** Shenron's opening monologue for the console readout. */
const INTRO_MESSAGES = [
  "Welcome, warrior. Your summons has been heard across the seven seas.",
  `The ${EVENT.name} is about to begin. Algorithms, aura and pure nerve.`,
  "Four Z-Fighters are ready. Each one fights with a different code and a different power.",
  "Choose the fighter whose spirit will power your run to the Grand Finals.",
];

const SELECTABLE: FighterId[] = ["goku", "vegeta", "piccolo", "gohan"];

const IMAGE_SRC: Record<FighterId, string> = {
  goku: "/figures/goku.webp",
  vegeta: "/figures/vegeta.webp",
  piccolo: "/figures/piccolo.webp",
  gohan: "/figures/gohan.webp",
};

/** Each fighter holds a different dragon ball, purely for flavour. */
const BALL_STARS: Record<FighterId, number> = {
  goku: 4,
  vegeta: 1,
  piccolo: 3,
  gohan: 2,
};

type Phase = "intro" | "selection" | "leaving";

export function DragonLoader() {
  const { setFighter } = useFighterTheme();
  const { showIntro, completeIntro } = useIntroGate();
  const { play } = useSound();
  const [phase, setPhase] = useState<Phase>("intro");
  const [msgIndex, setMsgIndex] = useState(0);
  const [hovered, setHovered] = useState<FighterId | null>(null);

  const activeMessage = INTRO_MESSAGES[Math.min(msgIndex, INTRO_MESSAGES.length - 1)];
  const { displayed, done } = useTypewriter(activeMessage, {
    enabled: phase === "intro",
    speed: 20,
    startDelay: 450,
  });

  const preview = FIGHTERS[hovered ?? DEFAULT_FIGHTER];
  const selectorCount = SELECTABLE.length;

  const cardBasis = useMemo(
    () => (id: FighterId) => {
      if (hovered === null) return `${100 / selectorCount}%`;
      if (hovered === id) return "58%";
      return `${(100 - 58) / (selectorCount - 1)}%`;
    },
    [hovered, selectorCount]
  );

  // Keep the page from scrolling behind the full-screen experience.
  useEffect(() => {
    if (!showIntro) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [showIntro]);

  // Boot chime when the cutscene starts (silent until SFX is enabled).
  useEffect(() => {
    play("boot");
  }, [play]);

  // Play the monologue, then move on to fighter select.
  useEffect(() => {
    if (phase !== "intro" || !done) return;
    const timer = window.setTimeout(() => {
      if (msgIndex < INTRO_MESSAGES.length - 1) {
        setMsgIndex((index) => index + 1);
      } else {
        setPhase("selection");
      }
    }, 1000);
    return () => window.clearTimeout(timer);
  }, [done, msgIndex, phase]);

  if (!showIntro) return null;

  const commit = (id: FighterId) => {
    setFighter(id);
    playTheme(id);
    play("confirm");
    setPhase("leaving");
    window.setTimeout(completeIntro, 700);
  };

  return (
    <motion.div
      className="fixed inset-0 z-[9999] overflow-hidden"
      animate={{ opacity: phase === "leaving" ? 0 : 1 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      aria-modal="true"
      role="dialog"
    >
      <AnimatePresence mode="wait">
        {phase === "intro" ? (
          <motion.div
            key="intro"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="dragon-sky absolute inset-0" />
            <div className="cloud cloud-a" />
            <div className="cloud cloud-b" />

            <button
              type="button"
              onClick={() => {
                play("blip");
                setPhase("selection");
              }}
              className="font-pixel absolute right-4 top-4 z-30 rounded-full border border-[#c68a3e] bg-[#fff8ea]/90 px-3 py-2 text-[8px] tracking-wide text-[#8a5a1c] shadow-sm backdrop-blur transition-colors hover:bg-white sm:right-6 sm:top-6 sm:text-[10px]"
            >
              Skip Intro
            </button>

            <div className="relative z-10 flex h-full w-full items-center justify-center px-3 py-4">
              <div className="console-bezel relative flex h-[min(94vh,720px)] w-[min(96vw,1040px)] flex-col rounded-[1.8rem] p-3 sm:rounded-[2.2rem] sm:p-5">
                <div className="flex items-center justify-between px-1 pb-2 sm:px-2 sm:pb-3">
                  <div className="flex items-center gap-2">
                    <DragonBall stars={4} size={20} />
                    <span className="font-pixel text-[7px] tracking-widest text-[#9a6417] sm:text-[10px]">
                      DRAGON RADAR
                    </span>
                  </div>
                  <span className="font-pixel text-[7px] tracking-widest text-[#9a6417] sm:text-[10px]">
                    PWR 9001
                  </span>
                </div>

                <div className="console-screen relative flex-1 overflow-hidden rounded-[1.2rem] sm:rounded-[1.5rem]">
                  <div className="cloud cloud-a" style={{ top: "14%" }} />
                  <div className="cloud cloud-b" style={{ top: "30%" }} />
                  <div className="absolute right-6 top-6 h-12 w-12 rounded-full bg-yellow-200/70 blur-md sm:right-10 sm:top-10 sm:h-20 sm:w-20" />

                  <div className="absolute bottom-0 left-1/2 z-10 w-[min(58vw,320px)] -translate-x-1/2">
                    <div className="relative h-[min(52vh,360px)] w-full">
                      <Image
                        src="/figures/master-roshi.webp"
                        alt="Master Roshi, keeper of the Dragon Radar"
                        fill
                        priority
                        sizes="(max-width: 640px) 58vw, 320px"
                        className="animate-bob object-contain object-bottom drop-shadow-[0_16px_20px_rgba(0,0,0,0.35)]"
                      />
                    </div>
                    <div className="ki-platform absolute -bottom-1 left-0 right-0 mx-auto h-5 w-[78%] rounded-[100%] sm:h-7" />
                  </div>
                </div>

                <div className="console-textbox relative mt-3 min-h-[116px] rounded-[1.2rem] px-4 py-4 sm:min-h-[150px] sm:rounded-[1.5rem] sm:px-8 sm:py-6">
                  <p className="font-pixel whitespace-pre-line text-[9px] leading-[1.9] text-[#4a3a2a] sm:text-[13px] sm:leading-[1.85]">
                    {displayed}
                    <span className="animate-blink ml-0.5">▮</span>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="selection"
            className="absolute inset-0 overflow-hidden bg-[#0a0c12]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div
              className="pointer-events-none absolute inset-0 transition-all duration-500"
              style={{
                background: `radial-gradient(ellipse 70% 55% at 50% 40%, ${preview.accentSoft}, transparent 72%)`,
              }}
            />
            <div className="star-field pointer-events-none absolute inset-0 opacity-25" />

            <div className="relative z-20 flex items-center justify-between px-5 py-4 sm:px-8 sm:py-6">
              <div className="flex items-center gap-3">
                <DragonBall stars={7} size={30} className="animate-float-ball" />
                <div>
                  <p
                    className="font-pixel text-[9px] tracking-wide sm:text-xs"
                    style={{ color: preview.accent }}
                  >
                    CHOOSE YOUR FIGHTER
                  </p>
                  <p className="mt-1 text-[11px] text-ink-dim sm:text-sm">
                    {EVENT.name} — the arena is waiting
                  </p>
                </div>
              </div>
              <span className="font-pixel hidden text-[9px] text-ink-faint sm:inline">
                HOVER TO INSPECT
              </span>
            </div>

            <div className="relative z-10 h-[calc(100%-88px)] sm:h-[calc(100%-104px)]">
              <div
                className="starter-strip flex h-full w-full"
                onMouseLeave={() => setHovered(null)}
              >
                {SELECTABLE.map((id) => {
                  const fighter = FIGHTERS[id];
                  const isHovered = hovered === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      onMouseEnter={() => {
                        setHovered(id);
                        play("blip");
                      }}
                      onFocus={() => setHovered(id)}
                      onClick={() => commit(id)}
                      aria-label={`Select ${fighter.name}`}
                      className="starter-card group relative flex h-full min-w-0 flex-col items-center overflow-hidden border-r border-white/5 last:border-r-0"
                      style={{
                        flexBasis: cardBasis(id),
                        background: `linear-gradient(180deg, ${withAlpha(
                          fighter.accent,
                          0.32
                        )} 0%, rgba(10,12,18,0.55) 40%, rgba(10,12,18,0.97) 100%)`,
                      }}
                    >
                      <span
                        className="pointer-events-none absolute inset-x-0 top-0 h-1"
                        style={{
                          background: `linear-gradient(90deg, ${fighter.accent}, ${fighter.accent2})`,
                        }}
                      />
                      <div
                        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
                        style={{
                          background: `radial-gradient(ellipse 64% 46% at 50% 58%, ${withAlpha(
                            fighter.accent,
                            isHovered ? 0.5 : 0.26
                          )}, transparent 72%)`,
                        }}
                      />

                      <span
                        className="font-pixel relative z-20 mt-5 whitespace-nowrap text-[8px] tracking-wide sm:mt-8 sm:text-[11px]"
                        style={{ color: fighter.accent }}
                      >
                        {fighter.name}
                      </span>
                      <span
                        className="font-pixel relative z-20 mt-1 hidden text-[7px] tracking-widest text-ink-faint transition-opacity duration-300 sm:block"
                        style={{ opacity: isHovered ? 1 : 0.55 }}
                      >
                        {fighter.themeName}
                      </span>

                      <div className="relative z-10 mt-auto h-[54%] w-full sm:h-[58%]">
                        <Image
                          src={IMAGE_SRC[id]}
                          alt={fighter.name}
                          fill
                          sizes="(max-width: 640px) 30vw, 40vw"
                          className="object-contain object-bottom"
                          style={{
                            transform: isHovered
                              ? "translateY(-10px) scale(1.1)"
                              : "translateY(0) scale(1)",
                            transition:
                              "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
                            filter: `drop-shadow(0 18px 22px rgba(0,0,0,0.6)) drop-shadow(0 0 ${
                              isHovered ? 30 : 16
                            }px ${withAlpha(fighter.accent, isHovered ? 0.7 : 0.38)})`,
                          }}
                        />
                      </div>

                      <div className="relative z-20 mb-6 mt-3 flex flex-col items-center gap-2">
                        <DragonBall
                          stars={BALL_STARS[id]}
                          size={isHovered ? 46 : 36}
                          className={isHovered ? "animate-spin-ball" : ""}
                        />
                        <span
                          className="font-pixel hidden text-[7px] tracking-wide sm:inline"
                          style={{ color: fighter.accent }}
                        >
                          {isHovered ? "SELECT" : "PICK"}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 flex justify-center px-4 pb-3">
              <AnimatePresence mode="wait">
                <motion.p
                  key={preview.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="max-w-2xl rounded-full border border-white/10 bg-black/60 px-4 py-2 text-center text-[10px] text-ink-dim backdrop-blur sm:text-xs"
                >
                  <span style={{ color: preview.accent }} className="font-semibold">
                    {preview.name}, {preview.epithet}.
                  </span>{" "}
                  <span className="italic">&ldquo;{preview.quote}&rdquo;</span>
                </motion.p>
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
