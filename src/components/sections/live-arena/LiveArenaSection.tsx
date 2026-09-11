import { SectionHeading } from "@/components/shared/SectionHeading";
import { RegistrationCounter } from "@/components/sections/live-arena/RegistrationCounter";
import { CountdownTimer } from "@/components/sections/live-arena/CountdownTimer";
import { GuessTheSaiyan } from "@/components/sections/live-arena/GuessTheSaiyan";

export function LiveArenaSection() {
  return (
    <section id="live-arena" className="relative px-6 sm:px-10 py-24 sm:py-32">
      <SectionHeading
        kicker="Live Arena"
        title="The tournament is already moving."
        description="A live pulse on registrations, a clock ticking down to the Finals, and a scouter game to warm up your reflexes."
      />

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
        <RegistrationCounter />
        <CountdownTimer />
        <GuessTheSaiyan />
      </div>
    </section>
  );
}
