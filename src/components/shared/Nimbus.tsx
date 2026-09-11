import { useId } from "react";

interface NimbusProps {
  className?: string;
}

/**
 * The Flying Nimbus — a puffy yellow cloud with a tell-tale curl. Original
 * vector, used as the travelling marker on the tournament timeline.
 */
export function Nimbus({ className }: NimbusProps) {
  const gradientId = useId().replace(/[:]/g, "");

  return (
    <svg
      viewBox="0 0 200 120"
      className={className}
      role="img"
      aria-label="Flying Nimbus"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff3b0" />
          <stop offset="45%" stopColor="#ffd83d" />
          <stop offset="100%" stopColor="#f2a900" />
        </linearGradient>
      </defs>

      <g
        fill={`url(#${gradientId})`}
        stroke="#b97400"
        strokeWidth="3"
        strokeLinejoin="round"
      >
        <ellipse cx="44" cy="80" rx="30" ry="22" />
        <ellipse cx="82" cy="62" rx="40" ry="34" />
        <ellipse cx="126" cy="60" rx="42" ry="36" />
        <ellipse cx="166" cy="76" rx="28" ry="22" />
        <ellipse cx="100" cy="90" rx="72" ry="22" />
      </g>

      {/* The classic curl */}
      <path
        d="M170 46 c 16 -12 34 1 25 17 c -7 13 -27 9 -24 -6 c 2 -9 13 -11 15 -2"
        fill="none"
        stroke="#b97400"
        strokeWidth="4"
        strokeLinecap="round"
      />
      {/* Soft highlight */}
      <ellipse cx="112" cy="44" rx="20" ry="9" fill="#fffbe0" opacity="0.75" />
    </svg>
  );
}
