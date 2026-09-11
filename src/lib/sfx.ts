"use client";

import { useUiStore } from "@/store/useUiStore";

export type SfxName = "blip" | "confirm" | "boot" | "error";

interface SfxDef {
  src: string;
  volume: number;
}

export const SFX: Record<SfxName, SfxDef> = {
  blip: { src: "/sfx/blip.wav", volume: 0.35 },
  confirm: { src: "/sfx/confirm.wav", volume: 0.45 },
  boot: { src: "/sfx/boot.wav", volume: 0.4 },
  error: { src: "/sfx/error.wav", volume: 0.4 },
};

type HowlerModule = typeof import("howler");

let howlerPromise: Promise<HowlerModule> | null = null;
const cache: Partial<Record<SfxName, import("howler").Howl>> = {};

/**
 * Fire-and-forget SFX playback. Respects the global mute flag and lazily
 * loads Howler + each sound on first use, so nothing ships in the initial
 * bundle and nothing plays before the user has opted in.
 */
export function playSfx(name: SfxName) {
  if (typeof window === "undefined") return;
  if (useUiStore.getState().muted) return;

  const def = SFX[name];
  if (!howlerPromise) howlerPromise = import("howler");

  howlerPromise
    .then((Howler) => {
      let howl = cache[name];
      if (!howl) {
        howl = new Howler.Howl({
          src: [def.src],
          volume: def.volume,
          preload: true,
          html5: false,
        });
        cache[name] = howl;
      }
      if (howl.state() === "loaded") {
        howl.play();
      } else {
        howl.once("load", () => howl.play());
      }
    })
    .catch(() => {
      /* Audio is a nice-to-have; never let it break the UI. */
    });
}
