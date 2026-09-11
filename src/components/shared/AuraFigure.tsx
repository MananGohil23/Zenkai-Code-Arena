interface AuraFigureProps {
  color?: string;
  color2?: string;
  className?: string;
  auraIntensity?: "low" | "high";
}

/**
 * A generic fighting-stance silhouette with radiating energy-aura spikes.
 * Intentionally abstract: no specific hairstyle, clothing, or facial
 * features that would tie it to any one copyrighted character. Used both
 * for the fighter-select cards and the "Guess the Saiyan" silhouette game,
 * recolored per use.
 */
export function AuraFigure({
  color = "var(--accent)",
  color2 = "var(--accent-2)",
  className,
  auraIntensity = "low",
}: AuraFigureProps) {
  const spikeOpacity = auraIntensity === "high" ? 0.9 : 0.45;
  return (
    <svg
      viewBox="0 0 200 240"
      className={className}
      role="presentation"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="auraGrad" cx="50%" cy="38%" r="65%">
          <stop offset="0%" stopColor={color2} stopOpacity="0.55" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
        <linearGradient id="figureGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color2} />
          <stop offset="100%" stopColor={color} />
        </linearGradient>
      </defs>

      {/* aura burst */}
      <circle cx="100" cy="110" r="95" fill="url(#auraGrad)" />
      {Array.from({ length: 14 }).map((_, i) => {
        const angle = (i / 14) * Math.PI * 2;
        const inner = 60;
        const outer = 92 + (i % 3) * 10;
        const x1 = 100 + Math.cos(angle) * inner;
        const y1 = 110 + Math.sin(angle) * inner;
        const x2 = 100 + Math.cos(angle) * outer;
        const y2 = 110 + Math.sin(angle) * outer;
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={color}
            strokeWidth={2}
            strokeLinecap="round"
            opacity={spikeOpacity}
          />
        );
      })}

      {/* generic fighting-stance silhouette */}
      <g fill="url(#figureGrad)">
        <circle cx="100" cy="55" r="20" />
        <path d="M78 78 Q100 68 122 78 L130 150 Q100 165 70 150 Z" />
        <path d="M78 90 L45 120 L52 132 L84 108 Z" />
        <path d="M122 90 L158 105 L152 118 L118 106 Z" />
        <path d="M82 148 L74 220 L92 220 L98 160 Z" />
        <path d="M118 148 L128 216 L110 220 L102 160 Z" />
      </g>
    </svg>
  );
}
