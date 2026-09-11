import { motion } from "framer-motion";

interface EnergySphereProps {
  stars: number;
  size?: number;
}

/**
 * An original abstract energy-orb glyph used purely as a numbered stage
 * marker. Deliberately avoids the real orange-with-red-stars dragon ball
 * design — this is a radial-gradient sphere with a ring of small dots
 * indicating the stage number.
 */
export function EnergySphere({ stars, size = 56 }: EnergySphereProps) {
  const dots = Array.from({ length: stars });
  return (
    <motion.div
      animate={{ 
        boxShadow: [
          "0 0 20px -2px var(--accent-soft), inset 0 0 10px rgba(0,0,0,0.25)",
          "0 0 35px 5px var(--accent-soft), inset 0 0 10px rgba(0,0,0,0.25)",
          "0 0 20px -2px var(--accent-soft), inset 0 0 10px rgba(0,0,0,0.25)"
        ]
      }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      className="relative flex items-center justify-center rounded-full shrink-0"
      style={{
        width: size,
        height: size,
        background:
          "radial-gradient(circle at 35% 30%, var(--accent-2), var(--accent) 70%)",
      }}
    >
      <div className="flex gap-1 items-center justify-center">
        {dots.map((_, i) => (
          <span
            key={i}
            className="rounded-full bg-void"
            style={{ width: size * 0.09, height: size * 0.09 }}
          />
        ))}
      </div>
    </motion.div>
  );
}
