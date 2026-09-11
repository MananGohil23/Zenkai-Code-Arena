"use client";

import { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion";
import { TIMELINE } from "@/constants/content";
import { DragonBall } from "@/components/shared/DragonBall";
import { SectionHeading } from "@/components/shared/SectionHeading";

function AnimatedNumber({ value }: { value: number }) {
  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={value}
        initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
        transition={{ duration: 0.25 }}
        className="relative block font-display text-4xl font-extrabold tabular-nums sm:text-5xl"
        style={{ color: "var(--accent)" }}
      >
        {value.toLocaleString("en-IN")}
      </motion.span>
    </AnimatePresence>
  );
}

function ScouterHud({
  active,
  progress,
}: {
  active: number;
  progress: MotionValue<number>;
}) {
  const stage = TIMELINE[active];

  return (
    <div
      className="relative overflow-hidden rounded-xl border-2 border-void-line bg-void-panel/90 p-6"
      style={{
        boxShadow:
          "inset 0 0 0 2px rgba(255,255,255,0.03), 0 0 0 1px var(--accent-soft), 0 22px 50px -30px var(--accent-soft)",
      }}
    >
      <div
        className="scouter-scan pointer-events-none absolute inset-x-0 top-0 h-16"
        style={{
          background:
            "linear-gradient(180deg, transparent, var(--accent-soft), transparent)",
        }}
      />

      <div className="relative flex items-center justify-between">
        <span
          className="font-pixel text-[9px] tracking-wide"
          style={{ color: "var(--accent)" }}
        >
          SCOUTER
        </span>
        <span className="font-pixel flex items-center gap-1.5 text-[8px] text-ink-faint">
          <span
            className="animate-pulse-glow h-1.5 w-1.5 rounded-full"
            style={{ background: "var(--accent)" }}
          />
          SCANNING
        </span>
      </div>

      <p className="font-pixel relative mt-6 text-[8px] tracking-wide text-ink-faint">
        POWER LEVEL
      </p>
      <AnimatedNumber value={stage.powerLevel} />

      <p className="relative mt-3 font-display text-lg font-bold text-ink">
        {stage.title}
      </p>
      <p className="relative text-xs text-ink-dim">
        {stage.date} · {stage.format}
      </p>

      <div
        className="relative mt-5 h-1.5 w-full overflow-hidden rounded-full"
        style={{ background: "var(--accent-soft)" }}
      >
        <motion.div
          className="h-full origin-left rounded-full"
          style={{
            scaleX: progress,
            background: "linear-gradient(90deg, var(--accent-2), var(--accent))",
          }}
        />
      </div>

      <div className="relative mt-4 flex gap-2">
        {TIMELINE.map((stage, index) => (
          <span
            key={stage.id}
            className="h-1.5 flex-1 rounded-full transition-colors duration-300"
            style={{
              background: index <= active ? "var(--accent)" : "#232838",
            }}
          />
        ))}
      </div>
    </div>
  );
}

export function PowerLevelTimeline() {
  const listRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start center", "end center"],
  });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const index = Math.min(
      TIMELINE.length - 1,
      Math.max(0, Math.floor(value * TIMELINE.length))
    );
    setActive(index);
  });

  return (
    <section id="timeline" className="relative px-6 py-24 sm:px-10 sm:py-32">
      <SectionHeading
        kicker="Power Level Timeline"
        title="Four stages. Every one raises the stakes."
        description="Track your squad's path from sign-up to the Grand Finals stage — and watch the scouter climb."
      />

      <div className="mt-16 grid gap-12 lg:grid-cols-[minmax(0,300px)_1fr] lg:gap-16">
        <div className="h-max lg:sticky lg:top-28">
          <ScouterHud active={active} progress={scrollYProgress} />
        </div>

        <div ref={listRef} className="relative">
          {/* Static spine */}
          <div className="absolute bottom-2 left-7 top-2 w-px bg-void-line" />
          {/* Animated fill spine */}
          <motion.div
            className="absolute bottom-2 left-7 top-2 w-px origin-top"
            style={{
              scaleY: scrollYProgress,
              background: "linear-gradient(to bottom, var(--accent), var(--accent-2))",
            }}
          />

          <div className="flex flex-col gap-10">
            {TIMELINE.map((milestone, index) => {
              const reached = index <= active;
              const isCurrent = index === active;
              return (
                <motion.article
                  key={milestone.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="relative flex gap-5 sm:gap-6"
                >
                  <div className="relative z-10 flex w-14 shrink-0 justify-center pt-1">
                    <div
                      className="relative transition-all duration-500"
                      style={{
                        filter: reached ? "none" : "grayscale(1) brightness(0.5)",
                        opacity: reached ? 1 : 0.45,
                        transform: isCurrent ? "scale(1.12)" : "scale(1)",
                      }}
                    >
                      {isCurrent && (
                        <span
                          className="absolute inset-0 rounded-full"
                          style={{ boxShadow: "0 0 30px 6px var(--accent-soft)" }}
                        />
                      )}
                      <DragonBall stars={milestone.stars} size={54} />
                    </div>
                  </div>

                  <div
                    className="flex-1 rounded-lg border-2 p-5 transition-colors duration-500 sm:p-6"
                    style={{
                      borderColor: isCurrent ? "var(--accent)" : "#232838",
                      background: reached
                        ? "rgba(18,21,31,0.85)"
                        : "rgba(18,21,31,0.5)",
                      boxShadow: isCurrent
                        ? "0 0 44px -16px var(--accent-soft)"
                        : undefined,
                    }}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <span
                        className="font-pixel text-[9px] tracking-wide"
                        style={{ color: "var(--accent)" }}
                      >
                        {milestone.date}
                      </span>
                      <span className="font-pixel rounded border border-void-line px-2 py-1 text-[8px] tracking-wide text-ink-faint">
                        {milestone.format}
                      </span>
                    </div>

                    <h3 className="mt-2 font-display text-2xl font-bold text-ink">
                      {milestone.title}
                    </h3>
                    <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-dim">
                      {milestone.description}
                    </p>

                    <div className="mt-4 flex items-center gap-3">
                      <span className="font-pixel text-[8px] tracking-wide text-ink-faint">
                        POWER LEVEL
                      </span>
                      <span
                        className="font-display text-lg font-bold tabular-nums"
                        style={{
                          color: reached ? "var(--accent)" : "#6b7189",
                        }}
                      >
                        {milestone.powerLevel.toLocaleString("en-IN")}
                      </span>
                    </div>

                    <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-void-line">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: reached ? "100%" : "0%",
                          background:
                            "linear-gradient(90deg, var(--accent), var(--accent-2))",
                          transition: "width 0.6s ease",
                        }}
                      />
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
