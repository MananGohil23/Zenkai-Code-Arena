"use client";

import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { DragonBall } from "@/components/shared/DragonBall";
import { useSound } from "@/hooks/useSound";
import { TEAM } from "@/constants/content";

export function Team() {
  const { play } = useSound();

  return (
    <SectionWrapper id="team" className="px-6 py-24 sm:px-10 sm:py-32">
      <SectionHeading
        kicker="Organizing Crew"
        title="The squad behind the arena."
        description="Hover a fighter to call them up."
        align="center"
      />

      <div className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-5 sm:grid-cols-3">
        {TEAM.map((member) => {
          const initials = member.name
            .split(" ")
            .map((word) => word[0])
            .join("");
          return (
            <button
              key={member.id}
              type="button"
              data-reveal
              onMouseEnter={() => play("blip")}
              onFocus={() => play("blip")}
              onClick={() => play("confirm")}
              className="group relative rounded-lg border-2 border-void-line bg-void-raised/70 p-6 text-center transition-transform duration-150 hover:-translate-y-1 hover:border-accent"
              style={{ boxShadow: "4px 4px 0 0 rgba(0,0,0,0.45)" }}
            >
              <DragonBall
                stars={1}
                size={18}
                className="absolute right-3 top-3 opacity-0 transition-opacity group-hover:opacity-100"
              />
              <span
                className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full font-display text-2xl font-bold text-void"
                style={{
                  background: `linear-gradient(135deg, ${member.accentFrom}, ${member.accentTo})`,
                }}
              >
                {initials}
              </span>
              <p className="font-display text-lg font-bold text-ink">
                {member.name}
              </p>
              <p className="font-pixel mt-2 text-[8px] tracking-wide text-ink-faint">
                {member.role}
              </p>
              <span
                className="font-pixel mt-3 block text-[8px] tracking-widest opacity-0 transition-opacity group-hover:opacity-100"
                style={{ color: "var(--accent)" }}
              >
                ► SELECT
              </span>
            </button>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
