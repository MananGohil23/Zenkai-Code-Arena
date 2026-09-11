"use client";

import { useEffect, useState } from "react";
import { Users, RadioTower } from "lucide-react";
import { STATS } from "@/constants/content";

const BASE = STATS.find((s) => s.id === "fighters")?.value ?? 4820;

export function RegistrationCounter() {
  const [count, setCount] = useState(BASE);
  const [pulsing, setPulsing] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const bump = Math.floor(Math.random() * 3) + 1;
      setCount((c) => c + bump);
      setPulsing(true);
      window.setTimeout(() => setPulsing(false), 400);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="relative flex flex-col justify-between rounded-lg border border-void-line bg-void-raised/60 p-6 sm:p-7 min-h-[220px]"
      style={{ boxShadow: "0 0 0 1px var(--accent-soft), 0 0 40px -18px var(--accent-soft)" }}
    >
      <div className="flex items-center justify-between">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-md"
          style={{ background: "var(--accent-soft)" }}
        >
          <Users size={18} style={{ color: "var(--accent)" }} />
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-ink-faint">
          <RadioTower size={12} className="animate-pulse-glow" style={{ color: "var(--accent)" }} />
          LIVE
        </div>
      </div>

      <div>
        <span
          className="font-display text-5xl font-bold tabular-nums text-ink transition-transform"
          style={{ transform: pulsing ? "scale(1.04)" : "scale(1)" }}
        >
          {count.toLocaleString("en-IN")}
        </span>
        <p className="mt-1 text-sm text-ink-dim">Fighters registered so far</p>
      </div>

      <p className="text-[11px] text-ink-faint">Auto-refreshes every few seconds</p>
    </div>
  );
}
