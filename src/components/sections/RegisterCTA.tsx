import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { CountdownTimer } from "@/components/sections/live-arena/CountdownTimer";
import { PixelButton } from "@/components/ui/PixelButton";
import { DragonBall } from "@/components/shared/DragonBall";
import { EVENT } from "@/constants/content";

export function RegisterCTA() {
  return (
    <SectionWrapper id="register" className="px-6 py-24 sm:px-10 sm:py-32">
      <div
        className="relative overflow-hidden rounded-2xl border-2 border-accent bg-void-panel/80 p-8 text-center sm:p-12"
        style={{ boxShadow: "0 0 60px -20px var(--accent-soft)" }}
      >
        <div className="pointer-events-none absolute -right-12 -top-12 opacity-20">
          <DragonBall stars={4} size={200} />
        </div>

        <p
          className="font-pixel relative text-[10px] tracking-wide"
          style={{ color: "var(--accent)" }}
        >
          FINAL CALL
        </p>
        <h2 className="relative mt-4 font-display text-4xl font-bold text-ink sm:text-5xl">
          Assemble your squad. Raise your power level.
        </h2>
        <p className="relative mx-auto mt-4 max-w-xl text-ink-dim">
          Registration closes two weeks before Prelims. Grab your team, pick a
          fighter, and lock in your slot before the arena fills up.
        </p>

        <div className="relative mt-8 flex flex-col items-center gap-8">
          <PixelButton href={EVENT.registerUrl}>
            Register Your Squad
          </PixelButton>
          <div className="w-full max-w-sm">
            <CountdownTimer />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
