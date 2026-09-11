interface PixelCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  interactive?: boolean;
}

/** Bordered card with a hard pixel drop-shadow. */
export function PixelCard({
  children,
  className = "",
  interactive = false,
  ...rest
}: PixelCardProps) {
  return (
    <div
      {...rest}
      className={`relative rounded-lg border-2 border-void-line bg-void-raised/70 p-6 ${
        interactive
          ? "transition-transform duration-150 hover:-translate-y-1 hover:border-accent"
          : ""
      } ${className}`}
      style={{ boxShadow: "4px 4px 0 0 rgba(0,0,0,0.45)" }}
    >
      {children}
    </div>
  );
}
