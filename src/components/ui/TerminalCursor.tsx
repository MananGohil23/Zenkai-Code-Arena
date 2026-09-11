export function TerminalCursor({ className = "" }: { className?: string }) {
  return (
    <span className={`animate-blink ${className}`} aria-hidden="true">
      ▮
    </span>
  );
}
