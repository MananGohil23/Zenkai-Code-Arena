"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useAnimationControls } from "framer-motion";
import { Swords, RotateCcw, ScanLine } from "lucide-react";
import { SAIYAN_GUESSES } from "@/constants/content";
import { useSound } from "@/hooks/useSound";

const FIGURE_SRC: Record<string, string> = {
  Goku: "/figures/goku.webp",
  Vegeta: "/figures/vegeta.webp",
  Piccolo: "/figures/piccolo.webp",
  Gohan: "/figures/gohan.webp",
  Trunks: "/figures/trunks.webp",
  "Master Roshi": "/figures/master-roshi.webp",
  Krillin: "/figures/krillin.webp",
  Frieza: "/figures/frieza.webp",
};

const CORNERS = [
  "left-2 top-2 border-l-2 border-t-2",
  "right-2 top-2 border-r-2 border-t-2",
  "left-2 bottom-2 border-l-2 border-b-2",
  "right-2 bottom-2 border-r-2 border-b-2",
];

function randomIndex(exclude?: number) {
  if (SAIYAN_GUESSES.length <= 1) return 0;
  let i = Math.floor(Math.random() * SAIYAN_GUESSES.length);
  while (i === exclude) {
    i = Math.floor(Math.random() * SAIYAN_GUESSES.length);
  }
  return i;
}

export function GuessTheSaiyan() {
  const [index, setIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [guess, setGuess] = useState("");
  const [revealed, setRevealed] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [rounds, setRounds] = useState(0);
  const { play } = useSound();
  const shake = useAnimationControls();

  useEffect(() => {
    setIndex(randomIndex());
    setMounted(true);
  }, []);

  const current = SAIYAN_GUESSES[index];
  const figureSrc = FIGURE_SRC[current.answer] ?? "/figures/goku.webp";

  const datalistId = "saiyan-names";
  const names = useMemo(
    () => SAIYAN_GUESSES.map((g) => g.answer),
    []
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (revealed || !guess.trim()) return;

    const isCorrect =
      guess.trim().toLowerCase() === current.answer.toLowerCase();
    setCorrect(isCorrect);
    setRevealed(true);
    setRounds((r) => r + 1);
    if (isCorrect) {
      setScore((s) => s + 1);
      play("confirm");
    } else {
      play("error");
      shake.start({
        x: [0, -8, 8, -6, 6, 0],
        transition: { duration: 0.4 },
      });
    }
  };

  const nextRound = () => {
    setIndex((prev) => randomIndex(prev));
    setGuess("");
    setRevealed(false);
    setCorrect(false);
    play("blip");
  };

  return (
    <motion.div
      animate={shake}
      className="relative flex h-full min-h-[280px] flex-col rounded-lg border border-void-line bg-void-raised/60 p-5 sm:p-6"
      style={{
        boxShadow: "0 0 0 1px var(--accent-soft), 0 0 40px -18px var(--accent-soft)",
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-md"
            style={{ background: "var(--accent-soft)" }}
          >
            <Swords size={16} style={{ color: "var(--accent)" }} />
          </div>
          <div>
            <p className="font-pixel text-[9px] tracking-wide" style={{ color: "var(--accent)" }}>
              SCOUTER TARGET
            </p>
            <p className="text-[11px] text-ink-dim">Guess the Saiyan</p>
          </div>
        </div>
        <span className="font-pixel text-[9px] tabular-nums text-ink-faint">
          {score}/{rounds}
        </span>
      </div>

      {mounted && (
        <>
          {/* Silhouette stage */}
          <div className="relative mt-4 h-40 overflow-hidden rounded-md border border-void-line bg-[#070910] sm:h-44">
            <div className="pixel-grid absolute inset-0 opacity-[0.07]" />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 58% 52% at 50% 64%, var(--accent-soft), transparent 72%)",
              }}
            />
            {!revealed && (
              <div
                className="scouter-scan absolute inset-x-0 top-0 h-12"
                style={{
                  background:
                    "linear-gradient(180deg, transparent, var(--accent-soft), transparent)",
                }}
              />
            )}
            {CORNERS.map((cls) => (
              <span
                key={cls}
                className={`pointer-events-none absolute h-4 w-4 opacity-60 ${cls}`}
                style={{ borderColor: "var(--accent)" }}
              />
            ))}

            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35 }}
                className="absolute inset-0 flex items-end justify-center p-2"
              >
                <div className="relative h-[92%] w-[62%]">
                  <Image
                    src={figureSrc}
                    alt={revealed ? current.answer : "Mystery fighter silhouette"}
                    fill
                    sizes="(max-width: 768px) 40vw, 180px"
                    className="object-contain object-bottom"
                    style={{
                      filter: revealed
                        ? "drop-shadow(0 12px 16px rgba(0,0,0,0.6)) drop-shadow(0 0 24px var(--accent-soft))"
                        : "brightness(0) invert(1) opacity(0.92) drop-shadow(0 0 16px var(--accent-soft))",
                      transition: "filter 0.55s ease",
                    }}
                  />
                </div>
              </motion.div>
            </AnimatePresence>

            {revealed && (
              <motion.span
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-pixel absolute bottom-2 left-1/2 -translate-x-1/2 rounded border px-2 py-1 text-[9px] tracking-wide backdrop-blur"
                style={{
                  color: correct ? "#7dffa0" : "#ff9a9a",
                  borderColor: correct ? "#2f7d4a" : "#7d2f2f",
                  background: "rgba(7,9,16,0.75)",
                }}
              >
                {current.answer}
              </motion.span>
            )}
          </div>

          <div className="mt-4 flex-1">
            <AnimatePresence mode="wait">
              {!revealed ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-2"
                >
                  <p className="text-xs leading-snug text-ink-dim">
                    {current.hint}
                  </p>
                  <div className="flex gap-2">
                    <input
                      value={guess}
                      onChange={(e) => setGuess(e.target.value)}
                      list={datalistId}
                      placeholder="Type a name…"
                      autoComplete="off"
                      className="min-w-0 flex-1 rounded-md border border-void-line bg-void px-3 py-1.5 text-sm text-ink outline-none placeholder:text-ink-faint focus:border-accent"
                    />
                    <datalist id={datalistId}>
                      {names.map((name) => (
                        <option key={name} value={name} />
                      ))}
                    </datalist>
                    <button
                      type="submit"
                      className="font-pixel shrink-0 rounded-md border-2 border-black/70 px-3 py-1.5 text-[9px] tracking-wide text-void"
                      style={{ background: "var(--accent)" }}
                    >
                      LOCK IN
                    </button>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col gap-2"
                >
                  <p
                    className="flex items-center gap-1.5 text-sm font-display font-bold"
                    style={{ color: correct ? "#7dffa0" : "#ff9a9a" }}
                  >
                    <ScanLine size={14} />
                    {correct ? "Power level confirmed!" : "Signal misread."}
                  </p>
                  <p className="text-sm text-ink-dim">
                    That was{" "}
                    <span className="font-semibold text-ink">
                      {current.answer}
                    </span>
                    .
                  </p>
                  <button
                    onClick={nextRound}
                    onMouseEnter={() => play("blip")}
                    className="flex items-center gap-1.5 self-start rounded-md border border-void-line px-3 py-1.5 text-xs text-ink-dim transition-colors hover:border-accent hover:text-ink"
                  >
                    <RotateCcw size={12} />
                    Next Reading
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </>
      )}
    </motion.div>
  );
}
