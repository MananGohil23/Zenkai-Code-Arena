"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Volume2, VolumeX, ChevronDown } from "lucide-react";
import { EVENT } from "@/constants/content";
import { DragonBall } from "@/components/shared/DragonBall";
import { useFighterTheme } from "@/context/ThemeContext";
import { useThemeMusic, toggleTheme } from "@/lib/music";

/** Rising ki motes, deterministic so SSR and client agree. */
const EMBERS = Array.from({ length: 18 }, (_, i) => ({
  left: (i * 53 + 7) % 100,
  bottom: (i % 6) * 7,
  delay: (i % 9) * 0.7,
  duration: 6 + (i % 5) * 1.3,
  size: 3 + (i % 4) * 2,
}));

interface ParallaxLayerProps {
  src: string;
  y: MotionValue<string>;
  priority?: boolean;
}

function ParallaxLayer({ src, y, priority }: ParallaxLayerProps) {
  return (
    <motion.div style={{ y }} className="absolute inset-0">
      <Image
        src={src}
        alt=""
        aria-hidden="true"
        fill
        priority={priority}
        sizes="100vw"
        className="object-cover object-bottom"
      />
    </motion.div>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { fighter } = useFighterTheme();
  const { playing } = useThemeMusic();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Each layer drifts at a different rate: far layers barely move, near
  // layers sweep away — the classic multi-plane parallax. The opaque sky
  // stays put so no gaps open up behind the transparent terrain layers.
  const mesasY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const mountainsY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const hillsY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const sandY = useTransform(scrollYProgress, [0, 1], ["0%", "44%"]);

  const ballY = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  // The two airborne fighters fly up and outward as you scroll.
  const gokuY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const gokuX = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const trunksY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const trunksX = useTransform(scrollYProgress, [0, 1], [0, 70]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-[100svh] flex-col overflow-hidden"
    >
      {/* --- Multi-plane parallax backdrop --- */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero/sky.png"
          alt=""
          aria-hidden="true"
          fill
          priority
          sizes="100vw"
          className="object-cover object-bottom"
        />
        <ParallaxLayer src="/hero/mesas.png" y={mesasY} />
        <ParallaxLayer src="/hero/mountains.png" y={mountainsY} />
        <ParallaxLayer src="/hero/hills.png" y={hillsY} />
        <ParallaxLayer src="/hero/sand.png" y={sandY} />
      </div>

      {/* Legibility + mood overlays */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(6,8,14,0.42) 0%, rgba(6,8,14,0.14) 28%, rgba(6,8,14,0.28) 52%, rgba(6,8,14,0.78) 82%, #0a0c12 100%)",
        }}
      />
      <motion.div
        className="absolute inset-0 z-10"
        animate={{ opacity: [0.55, 0.95, 0.55] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(ellipse 60% 45% at 50% 58%, var(--accent-soft), transparent 68%)",
        }}
      />
      <div className="star-field absolute inset-0 z-10 opacity-20" />

      {/* Embers */}
      <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
        {EMBERS.map((ember, i) => (
          <span
            key={i}
            className="ember"
            style={{
              left: `${ember.left}%`,
              bottom: `${ember.bottom}%`,
              width: ember.size,
              height: ember.size,
              animationDelay: `${ember.delay}s`,
              animationDuration: `${ember.duration}s`,
            }}
          />
        ))}
      </div>

      <motion.div
        style={{ y: ballY }}
        className="pointer-events-none absolute left-[7%] top-[24%] z-10 hidden sm:block"
      >
        <motion.div
          animate={{ y: [0, -16, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <DragonBall
            stars={4}
            size={76}
            className="drop-shadow-[0_0_28px_var(--accent-soft)]"
          />
        </motion.div>
      </motion.div>

      {/* --- Airborne fighters --- */}
      <motion.div
        style={{ y: gokuY, x: gokuX }}
        className="pointer-events-none absolute left-[2%] top-[14%] z-[15] w-28 sm:left-[5%] sm:top-[27%] sm:w-56 md:w-64"
      >
        <motion.div
          animate={{ y: [0, -16, 0], rotate: [-2.5, 1.5, -2.5] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
          className="relative"
        >
          <div
            className="absolute inset-0 -z-10 scale-110 rounded-full blur-2xl"
            style={{
              background:
                "radial-gradient(circle at 50% 55%, var(--accent-soft), transparent 68%)",
            }}
          />
          <Image
            src="/figures/flying-goku.webp"
            alt="Goku riding the Flying Nimbus"
            width={600}
            height={820}
            priority
            className="h-auto w-full"
            style={{
              filter:
                "drop-shadow(0 18px 22px rgba(0,0,0,0.5)) drop-shadow(0 0 30px var(--accent-soft))",
            }}
          />
        </motion.div>
      </motion.div>

      <motion.div
        style={{ y: trunksY, x: trunksX }}
        className="pointer-events-none absolute bottom-[12%] right-[2%] z-[15] w-20 sm:bottom-auto sm:right-[6%] sm:top-[44%] sm:w-32 md:w-40"
      >
        <motion.div
          animate={{ y: [0, 14, 0], rotate: [2, -2, 2] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.6,
          }}
          className="relative"
        >
          <div
            className="absolute inset-0 -z-10 scale-125 rounded-full blur-2xl"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, var(--accent-soft), transparent 70%)",
            }}
          />
          <Image
            src="/figures/trunks.webp"
            alt="Trunks lunging with his sword"
            width={454}
            height={561}
            priority
            className="h-auto w-full"
            style={{
              filter:
                "drop-shadow(0 16px 20px rgba(0,0,0,0.5)) drop-shadow(0 0 26px var(--accent-soft))",
            }}
          />
        </motion.div>
      </motion.div>

      {/* --- Foreground content --- */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-20 flex flex-1 flex-col"
      >
        <div className="flex items-center justify-between px-6 pt-24 sm:px-10">
          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-3 py-2 text-xs text-ink-dim backdrop-blur-sm transition-colors hover:border-accent hover:text-ink"
            aria-label={playing ? "Pause theme music" : "Play theme music"}
          >
            {playing ? <Volume2 size={14} /> : <VolumeX size={14} />}
            <span className="hidden sm:inline">
              {playing ? `${fighter.name} · ${fighter.themeName}` : "Play theme"}
            </span>
          </button>

          <span className="font-display text-sm tracking-wide text-ink-dim drop-shadow">
            {EVENT.city}
          </span>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-pixel mb-5 text-[10px] tracking-[0.25em] sm:text-xs"
            style={{ color: "var(--accent)" }}
          >
            {EVENT.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -4 }}
            animate={{ opacity: 1, scale: 1, rotate: -3 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="relative mb-7 h-16 w-44 overflow-hidden rounded-lg border-2 border-black/70 bg-[#fffdf7] p-1.5 shadow-[6px_6px_0_0_rgba(0,0,0,0.55)] sm:h-20 sm:w-56"
          >
            <Image
              src="/dragon_ball_logo.jpg"
              alt="Dragon Ball Z"
              fill
              priority
              className="object-contain"
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative font-display text-6xl font-extrabold leading-[0.9] tracking-tight sm:text-8xl md:text-9xl"
          >
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #fff3d6, var(--accent) 45%, var(--accent-2))",
                filter:
                  "drop-shadow(0 4px 0 rgba(0,0,0,0.45)) drop-shadow(0 0 44px var(--accent-soft))",
              }}
            >
              {EVENT.name}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-7 max-w-xl text-base leading-relaxed text-ink/90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] sm:text-lg"
          >
            {EVENT.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <a
              href="#register"
              className="pixel-button rounded-md border-2 border-black/70 px-7 py-3 font-pixel text-[10px] tracking-wide text-void"
              style={{ background: "var(--accent)" }}
            >
              Register Your Squad
            </a>
            <a
              href="#timeline"
              className="pixel-button rounded-md border-2 border-white/25 bg-black/40 px-7 py-3 font-pixel text-[10px] tracking-wide text-ink backdrop-blur-sm"
            >
              See the Roadmap
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-pixel text-[8px] tracking-wide text-ink-dim sm:text-[9px]"
          >
            <span>1,600+ FIGHTERS</span>
            <span className="text-accent">·</span>
            <span>370+ INSTITUTES</span>
            <span className="text-accent">·</span>
            <span>₹12L+ PRIZE POOL</span>
          </motion.div>
        </div>

        <motion.div
          className="flex justify-center pb-8"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="text-ink-dim" size={24} />
        </motion.div>
      </motion.div>
    </section>
  );
}
