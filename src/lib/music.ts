"use client";

import { useSyncExternalStore } from "react";
import { FighterId } from "@/types";
import { fighterThemeSrc } from "@/constants/fighters";

interface MusicState {
  playing: boolean;
  fighterId: FighterId | null;
}

const listeners = new Set<() => void>();
let audio: HTMLAudioElement | null = null;
let loadedSrc: string | null = null;
let state: MusicState = { playing: false, fighterId: null };

function setState(patch: Partial<MusicState>) {
  state = { ...state, ...patch };
  listeners.forEach((listener) => listener());
}

function ensureAudio() {
  if (typeof window === "undefined") return null;
  if (!audio) {
    audio = new Audio();
    audio.loop = true;
    audio.volume = 0.5;
    audio.preload = "auto";
    audio.addEventListener("play", () => setState({ playing: true }));
    audio.addEventListener("pause", () => setState({ playing: false }));
  }
  return audio;
}

/** Start a fighter's theme. Must be called from a user gesture (autoplay policy). */
export function playTheme(id: FighterId) {
  const el = ensureAudio();
  if (!el) return;

  const src = fighterThemeSrc(id);
  if (loadedSrc !== src) {
    el.src = src;
    el.load();
    loadedSrc = src;
  }
  setState({ fighterId: id });

  el.play()
    .then(() => setState({ playing: true }))
    .catch(() => setState({ playing: false }));
}

export function toggleTheme() {
  const el = ensureAudio();
  if (!el) return;
  if (el.paused) {
    el.play()
      .then(() => setState({ playing: true }))
      .catch(() => setState({ playing: false }));
  } else {
    el.pause();
    setState({ playing: false });
  }
}

export function stopTheme() {
  audio?.pause();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return state;
}

export function useThemeMusic() {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}
