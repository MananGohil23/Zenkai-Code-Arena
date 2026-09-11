"use client";

import { create } from "zustand";

interface UiState {
  /** True once the boot/fighter-select intro has been completed or skipped. */
  introSeen: boolean;
  /** Sound is opt-in: retro SFX stay silent until the user unmutes. */
  muted: boolean;
  /** Id of the section currently in view, for Navbar highlighting. */
  activeSection: string;
  setIntroSeen: (value: boolean) => void;
  setMuted: (value: boolean) => void;
  toggleMuted: () => void;
  setActiveSection: (id: string) => void;
}

export const useUiStore = create<UiState>((set) => ({
  introSeen: false,
  muted: true,
  activeSection: "hero",
  setIntroSeen: (value) => set({ introSeen: value }),
  setMuted: (value) => set({ muted: value }),
  toggleMuted: () => set((state) => ({ muted: !state.muted })),
  setActiveSection: (id) => set({ activeSection: id }),
}));
