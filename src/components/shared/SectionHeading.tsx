interface SectionHeadingProps {
  kicker?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  kicker,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div className={align === "center" ? "text-center mx-auto max-w-2xl" : "max-w-2xl"}>
      {kicker && (
        <p
          className="font-display text-sm tracking-wide mb-2"
          style={{ color: "var(--accent)" }}
        >
          {kicker}
        </p>
      )}
      <h2 className="font-display text-4xl sm:text-5xl font-bold leading-[1.05] text-ink">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-ink-dim text-base sm:text-lg leading-relaxed text-ink/70">
          {description}
        </p>
      )}
    </div>
  );
}
