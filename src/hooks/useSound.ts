"use client";

import { useCallback } from "react";
import { useUiStore } from "@/store/useUiStore";
import { playSfx, SfxName } from "@/lib/sfx";

/**
 * The single entry point components use for sound. Never call Howler
 * directly — this hook guarantees the global mute flag is honoured.
 */
export function useSound() {
  const muted = useUiStore((state) => state.muted);
  const toggleMuted = useUiStore((state) => state.toggleMuted);

  const play = useCallback((name: SfxName) => {
    playSfx(name);
  }, []);

  return { muted, play, toggleMuted };
}
