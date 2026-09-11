import Image from "next/image";
import { GALLERY } from "@/constants/content";
import { SectionHeading } from "@/components/shared/SectionHeading";

function PhotoCard({
  caption,
  gradientFrom,
  gradientTo,
  imageSrc,
}: {
  caption: string;
  gradientFrom: string;
  gradientTo: string;
  imageSrc?: string;
}) {
  return (
    <div className="relative shrink-0 w-72 sm:w-80 rounded-lg overflow-hidden border border-void-line shadow-ki">
      {imageSrc ? (
        <div className="relative h-48 sm:h-52 w-full">
          <Image src={imageSrc} alt={caption} fill className="object-cover" sizes="(max-width: 640px) 288px, 320px" />
        </div>
      ) : (
        <div
          className="h-48 sm:h-52"
          style={{
            background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
          }}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-void/90 via-transparent to-transparent" />
      <p className="absolute bottom-3 left-4 right-4 text-sm text-ink font-medium">
        {caption}
      </p>
    </div>
  );
}

export function GalleryMarquee() {
  const doubled = [...GALLERY, ...GALLERY];

  return (
    <section id="gallery" className="relative py-24 sm:py-32">
      <div className="px-6 sm:px-10">
        <SectionHeading
          kicker="From Past Arenas"
          title="Every season leaves a few good stories."
          description="A look back at the fighters, whiteboards, and finals-night nerves."
        />
      </div>

      <div className="relative mt-12 overflow-hidden scrollbar-none">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-void to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-void to-transparent z-10" />
        <div className="flex gap-5 w-max animate-marquee px-6 sm:px-10">
          {doubled.map((photo, i) => (
            <PhotoCard key={`${photo.id}-${i}`} {...photo} />
          ))}
        </div>
      </div>
    </section>
  );
}
