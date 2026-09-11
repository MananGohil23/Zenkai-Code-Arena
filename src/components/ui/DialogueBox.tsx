import { TerminalCursor } from "@/components/ui/TerminalCursor";

interface DialogueBoxProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  showCursor?: boolean;
}

/**
 * Game-textbox-style container reused for About, FAQ and callouts. The thin
 * inner border + glow mimics a retro console dialogue frame.
 */
export function DialogueBox({
  title,
  children,
  className = "",
  showCursor = false,
}: DialogueBoxProps) {
  return (
    <div
      className={`relative rounded-xl border-2 border-void-line bg-void-panel/90 p-6 sm:p-8 ${className}`}
      style={{
        boxShadow:
          "inset 0 0 0 2px rgba(255,255,255,0.03), 0 0 0 1px var(--accent-soft), 0 18px 44px -26px var(--accent-soft)",
      }}
    >
      <div className="pointer-events-none absolute inset-1.5 rounded-lg border border-white/5" />
      {title && (
        <p
          className="font-pixel relative mb-4 text-[10px] tracking-wide"
          style={{ color: "var(--accent)" }}
        >
          {title}
        </p>
      )}
      <div className="font-terminal relative text-lg leading-relaxed text-ink-dim sm:text-xl">
        {children}
        {showCursor && <TerminalCursor className="ml-1" />}
      </div>
    </div>
  );
}
