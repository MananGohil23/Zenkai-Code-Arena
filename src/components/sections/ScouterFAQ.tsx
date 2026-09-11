"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, Mail, Radio } from "lucide-react";
import { FAQS, EVENT } from "@/constants/content";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { DragonBall } from "@/components/shared/DragonBall";
import { useSound } from "@/hooks/useSound";

export function ScouterFAQ() {
  const [openId, setOpenId] = useState<string | null>(FAQS[0].id);
  const { play } = useSound();

  const toggle = (id: string) => {
    setOpenId((current) => (current === id ? null : id));
    play("blip");
  };

  return (
    <section id="faq" className="relative px-6 py-24 sm:px-10 sm:py-32">
      <SectionHeading
        kicker="Scouter Readout"
        title="Questions, answered at a glance."
        description="Scan the list below — tap a log entry to expand the full readout."
      />

      <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,320px)_1fr] lg:gap-12">
        {/* Scouter panel + contact fallback */}
        <aside className="h-max lg:sticky lg:top-28">
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

            <div className="relative flex items-center gap-2">
              <Radio
                size={14}
                className="animate-pulse-glow"
                style={{ color: "var(--accent)" }}
              />
              <span
                className="font-pixel text-[9px] tracking-wide"
                style={{ color: "var(--accent)" }}
              >
                READOUT ACTIVE
              </span>
            </div>

            <div className="relative mt-6 flex justify-center">
              <DragonBall stars={4} size={72} className="animate-float-ball" />
            </div>

            <p className="relative mt-6 font-display text-2xl font-bold text-ink">
              Still scanning for an answer?
            </p>
            <p className="relative mt-2 text-sm leading-relaxed text-ink-dim">
              If the readout doesn&apos;t cover it, the organizing crew is one
              transmission away.
            </p>

            <a
              href={`mailto:${EVENT.contactEmail}`}
              onMouseEnter={() => play("blip")}
              onClick={() => play("confirm")}
              className="pixel-button relative mt-6 inline-flex items-center gap-2 rounded-md border-2 border-black/70 px-5 py-3 font-pixel text-[10px] tracking-wide text-void"
              style={{ background: "var(--accent)" }}
            >
              <Mail size={14} />
              Email the crew
            </a>

            <p className="font-pixel relative mt-5 text-[8px] tracking-wide text-ink-faint">
              {EVENT.contactPhone}
            </p>
          </div>
        </aside>

        {/* Accordion */}
        <div className="flex flex-col gap-3">
          {FAQS.map((faq, index) => {
            const open = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="overflow-hidden rounded-lg border-2 transition-colors duration-300"
                style={{
                  borderColor: open ? "var(--accent)" : "#232838",
                  background: open
                    ? "rgba(18,21,31,0.92)"
                    : "rgba(18,21,31,0.6)",
                  boxShadow: open
                    ? "0 0 44px -18px var(--accent-soft)"
                    : undefined,
                }}
              >
                <button
                  type="button"
                  aria-expanded={open}
                  onClick={() => toggle(faq.id)}
                  onMouseEnter={() => play("blip")}
                  className="flex w-full items-center gap-4 px-4 py-4 text-left sm:px-5"
                >
                  <span
                    className="font-pixel shrink-0 text-[9px] tabular-nums transition-colors"
                    style={{ color: open ? "var(--accent)" : "#6b7189" }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`flex-1 font-display text-base font-semibold leading-snug transition-colors sm:text-lg ${
                      open ? "text-ink" : "text-ink/85"
                    }`}
                  >
                    {faq.question}
                  </span>
                  <span
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border-2 transition-colors"
                    style={{
                      borderColor: open ? "var(--accent)" : "#232838",
                      color: open ? "var(--accent)" : "#6b7189",
                    }}
                  >
                    {open ? <Minus size={14} /> : <Plus size={14} />}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-4 pb-5 pl-[3.3rem] text-sm leading-relaxed text-ink-dim sm:px-5 sm:pl-[3.6rem]">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
