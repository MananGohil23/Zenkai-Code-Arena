"use client";

import { motion } from "framer-motion";
import { SPONSORS } from "@/constants/content";
import { SectionHeading } from "@/components/shared/SectionHeading";

const TIER_LABEL: Record<string, string> = {
  elite: "Elite Partner",
  "z-fighter": "Z-Fighter Partner",
  capsule: "Capsule Partner",
};

export function SponsorsSection() {
  return (
    <section id="sponsors" className="relative px-6 sm:px-10 py-24 sm:py-32">
      <SectionHeading
        kicker="Capsule Corp Approved Partners"
        title="Backed by teams who ship at Saiyan speed."
        align="center"
      />

      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          visible: { transition: { staggerChildren: 0.1 } },
          hidden: {},
        }}
        className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto"
      >
        {SPONSORS.map((s) => (
          <motion.div
            key={s.id}
            variants={{
              visible: { opacity: 1, y: 0 },
              hidden: { opacity: 0, y: 20 },
            }}
            transition={{ duration: 0.5 }}
            whileHover={{ 
              scale: 1.05, 
              y: -5, 
              boxShadow: "0 0 0 1px var(--accent-soft), 0 10px 30px -8px var(--accent-soft)",
              borderColor: "var(--accent)"
            }}
            className="group flex flex-col items-center justify-center gap-2 rounded-lg border border-void-line bg-void-raised/50 px-4 py-8 text-center cursor-default"
          >
            <span className="font-display text-base font-bold text-ink">
              {s.name}
            </span>
            <span className="text-[10px] tracking-wide text-ink-faint">
              {TIER_LABEL[s.tier]}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
