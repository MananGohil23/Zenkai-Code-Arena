"use client";

import { useEffect, useState } from "react";
import { Clock3 } from "lucide-react";
import { EVENT } from "@/constants/content";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  done: boolean;
}

function getTimeLeft(): TimeLeft {
  const target = new Date(EVENT.finalsDateISO).getTime();
  const diff = target - Date.now();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds, done: false };
}

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="font-display text-2xl sm:text-3xl font-bold tabular-nums text-ink">
        {value.toString().padStart(2, "0")}
      </span>
      <span className="text-[10px] uppercase tracking-wide text-ink-faint">
        {label}
      </span>
    </div>
  );
}

export function CountdownTimer() {
  const [time, setTime] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setTime(getTimeLeft());
    const interval = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="relative flex h-full flex-col justify-between rounded-lg border border-void-line bg-void-raised/60 p-6 sm:p-7 min-h-[220px]"
      style={{ boxShadow: "0 0 0 1px var(--accent-soft), 0 0 40px -18px var(--accent-soft)" }}
    >
      <div className="flex items-center justify-between">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-md"
          style={{ background: "var(--accent-soft)" }}
        >
          <Clock3 size={18} style={{ color: "var(--accent)" }} />
        </div>
        <span className="text-[10px] text-ink-faint">{EVENT.finalsDateLabel}</span>
      </div>

      {time === null ? (
        <div className="flex-1 flex items-center">
          <span className="text-sm text-ink-faint">Reading the clock&hellip;</span>
        </div>
      ) : time.done ? (
        <div>
          <span className="font-display text-2xl font-bold text-ink">
            The Finals have begun
          </span>
          <p className="mt-1 text-sm text-ink-dim">Every squad&apos;s power level is on the line.</p>
        </div>
      ) : (
        <div className="flex items-center justify-between gap-2">
          <Unit value={time.days} label="Days" />
          <Unit value={time.hours} label="Hrs" />
          <Unit value={time.minutes} label="Min" />
          <Unit value={time.seconds} label="Sec" />
        </div>
      )}

      <p className="text-[11px] text-ink-faint">Countdown to the Grand Finals stage</p>
    </div>
  );
}
