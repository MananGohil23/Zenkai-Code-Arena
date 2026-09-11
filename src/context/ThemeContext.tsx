"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { FighterId } from "@/types";
import { FIGHTERS, DEFAULT_FIGHTER } from "@/constants/fighters";

const STORAGE_KEY = "zenkai:fighter";

interface ThemeContextValue {
  fighterId: FighterId;
  fighter: (typeof FIGHTERS)[FighterId];
  setFighter: (id: FighterId) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function applyCssVars(id: FighterId) {
  const theme = FIGHTERS[id];
  const root = document.documentElement;
  root.style.setProperty("--accent", theme.accent);
  root.style.setProperty("--accent-2", theme.accent2);
  root.style.setProperty("--accent-soft", theme.accentSoft);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [fighterId, setFighterId] = useState<FighterId>(DEFAULT_FIGHTER);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = window.sessionStorage.getItem(STORAGE_KEY);
    if (stored && stored in FIGHTERS) {
      setFighterId(stored as FighterId);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    applyCssVars(fighterId);
  }, [fighterId, hydrated]);

  const setFighter = useCallback((id: FighterId) => {
    setFighterId(id);
    window.sessionStorage.setItem(STORAGE_KEY, id);
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({
      fighterId,
      fighter: FIGHTERS[fighterId],
      setFighter,
    }),
    [fighterId, setFighter]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useFighterTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useFighterTheme must be used inside ThemeProvider");
  return ctx;
}
