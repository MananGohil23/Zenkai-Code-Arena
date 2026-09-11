"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useSound } from "@/hooks/useSound";

/**
 * Persistent, opt-in sound control. Defaults to muted, so no audio plays
 * until the visitor explicitly turns SFX on.
 */
export function MuteToggle() {
  const { muted, play, toggleMuted } = useSound();

  return (
    <button
      type="button"
      aria-label={muted ? "Unmute sound effects" : "Mute sound effects"}
      onClick={() => {
        toggleMuted();
        play("blip");
      }}
      className="fixed bottom-4 right-4 z-[10050] flex items-center gap-2 rounded-md border-2 border-black/60 bg-void-panel/90 px-3 py-2 text-[10px] text-ink-dim backdrop-blur transition-colors hover:text-ink"
    >
      {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
      <span className="font-pixel hidden sm:inline">
        {muted ? "SFX OFF" : "SFX ON"}
      </span>
    </button>
  );
}
