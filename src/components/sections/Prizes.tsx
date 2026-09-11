import { Crown } from "lucide-react";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { PRIZES } from "@/constants/content";

export function Prizes() {
  return (
    <SectionWrapper id="prizes" className="px-6 py-24 sm:px-10 sm:py-32">
      <SectionHeading
        kicker="Spoils of War"
        title="A prize pool worth breaking your limits for."
        description="Over ₹12,00,000 split across the top finalist squads, plus interviews and goodies."
        align="center"
      />

      <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-5 sm:grid-cols-2">
        {PRIZES.map((tier) => (
          <div
            key={tier.id}
            data-reveal
            className={`relative rounded-lg border-2 p-6 transition-transform duration-150 hover:-translate-y-1 ${
              tier.highlight ? "border-accent" : "border-void-line"
            }`}
            style={{
              background: tier.highlight
                ? "linear-gradient(180deg, var(--accent-soft), rgba(10,12,18,0.6))"
                : "rgba(18,21,31,0.7)",
              boxShadow: tier.highlight
                ? "0 0 40px -12px var(--accent-soft), 4px 4px 0 0 rgba(0,0,0,0.45)"
                : "4px 4px 0 0 rgba(0,0,0,0.45)",
            }}
          >
            {tier.highlight && (
              <span className="font-pixel absolute -top-3 left-6 rounded-sm bg-accent px-2 py-1 text-[8px] tracking-wide text-void">
                CHAMPION
              </span>
            )}
            <div className="flex items-center gap-3">
              {tier.highlight && (
                <Crown size={20} style={{ color: "var(--accent)" }} />
              )}
              <p className="font-pixel text-[10px] tracking-wide text-ink-dim">
                {tier.place}
              </p>
            </div>
            <p
              className="mt-3 font-display text-4xl font-extrabold text-ink"
              style={{ color: tier.highlight ? "var(--accent)" : undefined }}
            >
              {tier.reward}
            </p>
            <ul className="mt-4 flex flex-col gap-2">
              {tier.perks.map((perk) => (
                <li key={perk} className="flex items-start gap-2 text-sm text-ink-dim">
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ background: "var(--accent)" }}
                  />
                  {perk}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
