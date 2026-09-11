import { DragonLoader } from "@/components/sections/DragonLoader";
import { Navbar } from "@/components/layout/Navbar";
import { PageBackdrop } from "@/components/layout/PageBackdrop";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { StatsSection } from "@/components/sections/StatsSection";
import { PowerLevelTimeline } from "@/components/sections/PowerLevelTimeline";
import { GalleryMarquee } from "@/components/sections/GalleryMarquee";
import { Tracks } from "@/components/sections/Tracks";
import { Prizes } from "@/components/sections/Prizes";
import { ScouterFAQ } from "@/components/sections/ScouterFAQ";
import { SponsorsSection } from "@/components/sections/SponsorsSection";
import { LiveArenaSection } from "@/components/sections/live-arena/LiveArenaSection";
import { Team } from "@/components/sections/Team";
import { RegisterCTA } from "@/components/sections/RegisterCTA";
import { Footer } from "@/components/sections/Footer";

export default function HomePage() {
  return (
    <>
      <PageBackdrop />
      <DragonLoader />
      <Navbar />
      <main className="relative z-20">
        <Hero />
        <About />
        <StatsSection />
        <PowerLevelTimeline />
        <GalleryMarquee />
        <Tracks />
        <Prizes />
        <SponsorsSection />
        <LiveArenaSection />
        <ScouterFAQ />
        <Team />
        <RegisterCTA />
      </main>
      <Footer />
    </>
  );
}
