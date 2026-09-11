export type FighterId = "goku" | "vegeta" | "piccolo" | "gohan";

export interface FighterTheme {
  id: FighterId;
  name: string;
  epithet: string;
  /** Primary accent used for headings, borders, glows, primary buttons */
  accent: string;
  /** Secondary accent used for gradients / hover states */
  accent2: string;
  /** Low-opacity accent used for ki-glow shadows */
  accentSoft: string;
  /** Name of this fighter's theme track */
  themeName: string;
  auraDescription: string;
  quote: string;
}

export interface StatItem {
  id: string;
  label: string;
  value: number;
  suffix?: string;
  icon: "users" | "school" | "trophy";
}

export interface TimelineMilestone {
  id: string;
  stars: number;
  date: string;
  title: string;
  description: string;
  /** DBZ-flavoured scouter readout for this stage. */
  powerLevel: number;
  format: string;
}

export interface GalleryPhoto {
  id: string;
  caption: string;
  gradientFrom: string;
  gradientTo: string;
  imageSrc?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface Sponsor {
  id: string;
  name: string;
  tier: "capsule" | "elite" | "z-fighter";
}

export interface SaiyanGuess {
  id: string;
  answer: string;
  hint: string;
}

export interface RuleTrack {
  id: string;
  icon: "users" | "clock" | "laptop" | "shield";
  title: string;
  points: string[];
}

export interface PrizeTier {
  id: string;
  place: string;
  reward: string;
  perks: string[];
  highlight?: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  accentFrom: string;
  accentTo: string;
}