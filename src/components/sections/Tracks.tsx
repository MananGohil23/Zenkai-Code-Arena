import { Users, Clock, Laptop, Shield } from "lucide-react";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { PixelCard } from "@/components/ui/PixelCard";
import { RULE_TRACKS } from "@/constants/content";

const ICONS = {
  users: Users,
  clock: Clock,
  laptop: Laptop,
  shield: Shield,
} as const;

export function Tracks() {
  return (
    <SectionWrapper id="tracks" className="px-6 py-24 sm:px-10 sm:py-32">
      <SectionHeading
        kicker="Format & Rules"
        title="Know the rules before you enter the ring."
        description="Team setup, contest structure, languages and fair play — all in one scannable readout."
      />

      <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {RULE_TRACKS.map((track) => {
          const Icon = ICONS[track.icon];
          return (
            <PixelCard key={track.id} interactive data-reveal>
              <div className="flex items-center gap-3">
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-md"
                  style={{ background: "var(--accent-soft)" }}
                >
                  <Icon size={18} style={{ color: "var(--accent)" }} />
                </span>
                <h3 className="font-display text-xl font-bold text-ink">
                  {track.title}
                </h3>
              </div>
              <ul className="mt-4 flex flex-col gap-2.5">
                {track.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-2 text-sm text-ink-dim"
                  >
                    <span
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ background: "var(--accent)" }}
                    />
                    {point}
                  </li>
                ))}
              </ul>
            </PixelCard>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
