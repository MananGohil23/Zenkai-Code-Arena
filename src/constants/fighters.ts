import { FighterTheme, FighterId } from "@/types";

export const FIGHTERS: Record<FighterId, FighterTheme> = {
  goku: {
    id: "goku",
    name: "Goku",
    epithet: "The Saiyan Raised on Earth",
    accent: "#ff7a1a",
    accent2: "#2f6fed",
    accentSoft: "rgba(255, 122, 26, 0.46)",
    themeName: "Saiyan Spirit",
    auraDescription: "Orange gi, cobalt undertones — a fighter's spirit that never stops climbing.",
    quote: "A good challenge gets the blood pumping. Let's see what you've got.",
  },
  vegeta: {
    id: "vegeta",
    name: "Vegeta",
    epithet: "Prince of All Saiyans",
    accent: "#f5c518",
    accent2: "#2a3f9e",
    accentSoft: "rgba(245, 197, 24, 0.44)",
    themeName: "Prince's Pride",
    auraDescription: "Navy armor, royal gold trim — precision and pride in equal measure.",
    quote: "I don't compete to take part. I compete to win.",
  },
  piccolo: {
    id: "piccolo",
    name: "Piccolo",
    epithet: "Namekian Guardian",
    accent: "#9b6bff",
    accent2: "#12a06f",
    accentSoft: "rgba(155, 107, 255, 0.44)",
    themeName: "Namekian Vigil",
    auraDescription: "Deep violet and dark jade — a calm, calculating power.",
    quote: "Strength without strategy is just noise.",
  },
  gohan: {
    id: "gohan",
    name: "Gohan",
    epithet: "The Scholar Warrior",
    accent: "#ff8c3d",
    accent2: "#9b4bff",
    accentSoft: "rgba(255, 140, 61, 0.44)",
    themeName: "Scholar's Resolve",
    auraDescription: "Amber and violet in balance — a fighter who studies as hard as he trains.",
    quote: "Sometimes the sharpest mind wins the fight before it starts.",
  },
};

export const FIGHTER_ORDER: FighterId[] = ["goku", "vegeta", "piccolo", "gohan"];

export const DEFAULT_FIGHTER: FighterId = "goku";

export const fighterThemeSrc = (id: FighterId) => `/audio/${id}.wav`;
