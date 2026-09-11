import { Swords, Layers, Trophy } from "lucide-react";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { DialogueBox } from "@/components/ui/DialogueBox";
import { PixelCard } from "@/components/ui/PixelCard";
import { TerminalCursor } from "@/components/ui/TerminalCursor";
import { ABOUT, EVENT } from "@/constants/content";

const HIGHLIGHTS = [
  { id: "format", icon: Swords, label: "ICPC-style", value: "Ranked by solves, then time penalty" },
  { id: "rounds", icon: Layers, label: "3 Rounds", value: "Prelims → Regionals → Grand Finals" },
  { id: "pool", icon: Trophy, label: "₹12L+ Pool", value: "Split across the top finalist squads" },
];

export function About() {
  return (
    <SectionWrapper id="about" className="px-6 py-24 sm:px-10 sm:py-32">
      <SectionHeading kicker="The Briefing" title={ABOUT.title} />

      <div className="mt-12 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <DialogueBox title={`> ${EVENT.shortName.toLowerCase()}.log`}>
          {ABOUT.paragraphs.map((paragraph, index) => (
            <p key={index} className="mb-4 last:mb-0">
              {paragraph}
            </p>
          ))}
          <TerminalCursor className="ml-1" />
        </DialogueBox>

        <div className="flex flex-col gap-4" data-reveal>
          {HIGHLIGHTS.map((item) => {
            const Icon = item.icon;
            return (
              <PixelCard key={item.id} interactive className="flex items-start gap-4">
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md"
                  style={{ background: "var(--accent-soft)" }}
                >
                  <Icon size={18} style={{ color: "var(--accent)" }} />
                </span>
                <div>
                  <p className="font-display text-lg font-bold text-ink">
                    {item.label}
                  </p>
                  <p className="mt-1 text-sm text-ink-dim">{item.value}</p>
                </div>
              </PixelCard>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
