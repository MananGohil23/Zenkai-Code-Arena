"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Users, School, Trophy } from "lucide-react";
import { STATS, EVENT } from "@/constants/content";
import { useCountUp } from "@/hooks/useCountUp";
import { SectionHeading } from "@/components/shared/SectionHeading";

const ICONS = { users: Users, school: School, trophy: Trophy };

function StatCard({
  label,
  value,
  suffix,
  icon,
  active,
  index,
}: {
  label: string;
  value: number;
  suffix?: string;
  icon: keyof typeof ICONS;
  active: boolean;
  index: number;
}) {
  const Icon = ICONS[icon];
  const display = useCountUp(value, active);
  const formatted =
    value >= 100000
      ? `₹${(display / 100000).toFixed(display === value ? 2 : 1)}L`
      : display.toLocaleString("en-IN");

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={active ? { opacity: 1, y: 0 } : {}}
      whileHover={{ 
        scale: 1.05, 
        y: -5, 
        boxShadow: "0 10px 40px -10px var(--accent-soft)",
        borderColor: "var(--accent)"
      }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative flex flex-col items-start gap-3 rounded-lg border border-void-line bg-void-raised/60 p-6 sm:p-8 cursor-default"
    >
      <div
        className="flex h-11 w-11 items-center justify-center rounded-md"
        style={{ background: "var(--accent-soft)" }}
      >
        <Icon size={20} style={{ color: "var(--accent)" }} />
      </div>
      <span className="font-display text-4xl sm:text-5xl font-bold text-ink tabular-nums">
        {formatted}
        {suffix ?? ""}
      </span>
      <span className="text-sm text-ink-dim">{label}</span>
    </motion.div>
  );
}

export function StatsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="stats" className="relative px-6 sm:px-10 py-24 sm:py-32" ref={ref}>
      <SectionHeading
        kicker="Tournament At a Glance"
        title={`${EVENT.shortName} is only as strong as the fighters who show up.`}
        description="Three seasons in, and the numbers keep climbing — just like everyone's power level."
      />

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-5">
        {STATS.map((stat, i) => (
          <StatCard key={stat.id} {...stat} active={inView} index={i} />
        ))}
      </div>
    </section>
  );
}
