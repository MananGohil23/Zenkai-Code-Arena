"use client";

import { useSound } from "@/hooks/useSound";

interface PixelButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: (event: React.MouseEvent) => void;
  variant?: "primary" | "ghost";
  className?: string;
  type?: "button" | "submit";
  "aria-label"?: string;
}

/**
 * Chunky, bordered, press-animated button. Plays a hover blip and a confirm
 * chime (both routed through the global mute flag).
 */
export function PixelButton({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
  type = "button",
  "aria-label": ariaLabel,
}: PixelButtonProps) {
  const { play } = useSound();

  const base =
    "pixel-button inline-flex items-center justify-center gap-2 rounded-md border-2 px-5 py-3 font-pixel text-[10px] tracking-wide";
  const styles =
    variant === "primary"
      ? "border-black/70 bg-accent text-void"
      : "border-void-line bg-void-raised/80 text-ink hover:text-accent";

  const handleClick = (event: React.MouseEvent) => {
    play("confirm");
    onClick?.(event);
  };

  const shared = {
    className: `${base} ${styles} ${className}`,
    onClick: handleClick,
    onMouseEnter: () => play("blip"),
  };

  if (href) {
    return (
      <a href={href} {...shared}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} aria-label={ariaLabel} {...shared}>
      {children}
    </button>
  );
}
