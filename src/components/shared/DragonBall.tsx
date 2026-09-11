"use client";

import { useId } from "react";

interface DragonBallProps {
  stars?: number;
  size?: number;
  className?: string;
}

const LAYOUTS: Record<number, [number, number][]> = {
  1: [[0.5, 0.5]],
  2: [
    [0.36, 0.5],
    [0.64, 0.5],
  ],
  3: [
    [0.5, 0.34],
    [0.34, 0.63],
    [0.66, 0.63],
  ],
  4: [
    [0.37, 0.38],
    [0.63, 0.38],
    [0.37, 0.64],
    [0.63, 0.64],
  ],
  5: [
    [0.5, 0.5],
    [0.31, 0.34],
    [0.69, 0.34],
    [0.31, 0.66],
    [0.69, 0.66],
  ],
  6: [
    [0.34, 0.37],
    [0.5, 0.37],
    [0.66, 0.37],
    [0.34, 0.65],
    [0.5, 0.65],
    [0.66, 0.65],
  ],
  7: [
    [0.5, 0.5],
    [0.5, 0.29],
    [0.32, 0.4],
    [0.68, 0.4],
    [0.32, 0.62],
    [0.68, 0.62],
    [0.5, 0.73],
  ],
};

function starPoints(cx: number, cy: number, outer: number, inner: number) {
  const points: string[] = [];
  for (let i = 0; i < 10; i += 1) {
    const radius = i % 2 === 0 ? outer : inner;
    const angle = -Math.PI / 2 + (i * Math.PI) / 5;
    points.push(
      `${(cx + Math.cos(angle) * radius).toFixed(2)},${(
        cy +
        Math.sin(angle) * radius
      ).toFixed(2)}`
    );
  }
  return points.join(" ");
}

/**
 * A stylised wish-granting orb — orange sphere, red stars — used as the
 * "Poké Ball" equivalent throughout the Dragon Ball themed experience.
 */
export function DragonBall({ stars = 4, size = 64, className }: DragonBallProps) {
  const gradientId = useId().replace(/[:]/g, "");
  const layout = LAYOUTS[stars] ?? LAYOUTS[4];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      role="img"
      aria-label={`${stars}-star dragon ball`}
    >
      <defs>
        <radialGradient id={gradientId} cx="34%" cy="28%" r="78%">
          <stop offset="0%" stopColor="#ffe9a8" />
          <stop offset="38%" stopColor="#ffc247" />
          <stop offset="74%" stopColor="#f78b1c" />
          <stop offset="100%" stopColor="#cf6306" />
        </radialGradient>
      </defs>
      <circle
        cx="50"
        cy="50"
        r="47"
        fill={`url(#${gradientId})`}
        stroke="#b45606"
        strokeWidth="2.5"
      />
      <ellipse cx="34" cy="26" rx="17" ry="10" fill="rgba(255,255,255,0.5)" />
      {layout.map(([x, y], i) => (
        <polygon
          key={i}
          points={starPoints(x * 100, y * 100, 9.5, 4)}
          fill="#d61f26"
          stroke="#9c1116"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      ))}
    </svg>
  );
}
