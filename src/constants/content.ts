import {
  StatItem,
  TimelineMilestone,
  GalleryPhoto,
  FaqItem,
  Sponsor,
  SaiyanGuess,
  RuleTrack,
  PrizeTier,
  TeamMember,
} from "@/types";

export const EVENT = {
  name: "ZENKAI CODE ARENA",
  shortName: "Zenkai",
  tagline: "India's Premier ICPC-Style Coding Tournament",
  description:
    "Every fighter hits a wall. The ones worth remembering break through it. Zenkai Code Arena is a three-round, ICPC-style contest for teams who'd rather solve the unsolved problem than the easy one — algorithmic gauntlets, live power-level leaderboards, and a finals stage built for whoever's still standing.",
  finalsDateISO: "2026-12-13T09:00:00+05:30",
  finalsDateLabel: "December 13, 2026",
  city: "Mumbai, India",
  venue: "DJSCE Grounds, Vile Parle",
  contactEmail: "arena@zenkaicode.dev",
  contactPhone: "+91 98200 00000",
  registerUrl: "#register",
};

export const ABOUT = {
  title: "Transmission from the Lookout",
  paragraphs: [
    "Zenkai Code Arena is a three-round, ICPC-style team contest for coders who want their algorithms stress-tested against the sharpest squads in the country. You get a shared problem set, a live leaderboard, and a clock that does not care how clever you think you are.",
    "Each round raises the ceiling: an online prelims gauntlet, on-site regionals across four cities, then a single Grand Finals stage in Mumbai. Teams of three solve, debug, and optimize — ranked by problems solved, then by time penalty.",
    "It doesn't matter whether you main C++, Java, Python, or JavaScript. Bring your strongest three, pick your fighter's aura, and see how high your power level actually climbs.",
  ],
};

export const RULE_TRACKS: RuleTrack[] = [
  {
    id: "eligibility",
    icon: "users",
    title: "Team & Eligibility",
    points: [
      "Exactly three fighters per squad",
      "Open to enrolled UG / PG students",
      "Mixed-college teams welcome",
      "One roster per fighter across all squads",
    ],
  },
  {
    id: "format",
    icon: "laptop",
    title: "Contest Format",
    points: [
      "ICPC-style: shared problem set, ranked by solves then penalty",
      "Prelims: 3 hours online, 8 ascending-difficulty problems",
      "Regionals: on-site, whiteboard + live debugging rounds",
      "Grand Finals: 5 hours, 32 teams, one stage",
    ],
  },
  {
    id: "tools",
    icon: "clock",
    title: "Languages & Tools",
    points: [
      "C++, Java, Python and JavaScript supported",
      "Standard library only — no external packages",
      "Whiteboard segments are language-agnostic",
      "Personal editors allowed on-site, offline only",
    ],
  },
  {
    id: "conduct",
    icon: "shield",
    title: "Fair Play",
    points: [
      "Plagiarism and collusion detection on every submission",
      "Disqualification plus a one-year ban for violations",
      "Devices checked before each on-site round",
      "Judge decisions are final",
    ],
  },
];

export const PRIZES: PrizeTier[] = [
  {
    id: "champions",
    place: "1st Place",
    reward: "₹5,00,000",
    perks: [
      "The Zenkai Cup",
      "Fast-track interviews with sponsor partners",
      "Finals-stage feature spot",
    ],
    highlight: true,
  },
  {
    id: "runner-up",
    place: "2nd Place",
    reward: "₹3,00,000",
    perks: ["Zenkai silver trophy", "Sponsor swag kit", "Mentorship access"],
  },
  {
    id: "third",
    place: "3rd Place",
    reward: "₹1,50,000",
    perks: ["Zenkai bronze trophy", "Sponsor swag kit"],
  },
  {
    id: "finalists",
    place: "Top Finalists",
    reward: "₹2,50,000 pool",
    perks: ["Certificates for all finalists", "Travel support for regionals"],
  },
];

export const TEAM: TeamMember[] = [
  { id: "t1", name: "Aarav Mehta", role: "Convenor", accentFrom: "#ff7a1a", accentTo: "#2f6fed" },
  { id: "t2", name: "Ishita Rao", role: "Contest Head", accentFrom: "#f5c518", accentTo: "#1a2a6c" },
  { id: "t3", name: "Kabir Shah", role: "Tech Lead", accentFrom: "#8b5cf6", accentTo: "#0f4c3a" },
  { id: "t4", name: "Meera Nair", role: "Logistics", accentFrom: "#ff8c3d", accentTo: "#8b3ff0" },
  { id: "t5", name: "Rohan Gupta", role: "Sponsorships", accentFrom: "#22c55e", accentTo: "#0f766e" },
  { id: "t6", name: "Sara Khan", role: "Design & Web", accentFrom: "#ec4899", accentTo: "#7c3aed" },
]

export const STATS: StatItem[] = [
  { id: "fighters", label: "Registered Fighters", value: 4820, icon: "users" },
  { id: "institutes", label: "Institutes Represented", value: 214, icon: "school" },
  { id: "prizepool", label: "Prize Pool", value: 1200000, suffix: "+", icon: "trophy" },
];

export const TIMELINE: TimelineMilestone[] = [
  {
    id: "registration",
    stars: 1,
    date: "Sep 20, 2026",
    title: "Registration Opens",
    description:
      "Assemble your three-person squad and lock in your entry. Early registrants get first pick of prelim time slots.",
    powerLevel: 1200,
    format: "Online",
  },
  {
    id: "prelims",
    stars: 2,
    date: "Oct 25, 2026",
    title: "Prelims",
    description:
      "A 3-hour online gauntlet, 8 problems, ascending difficulty. Top 256 teams by power level advance to Regionals.",
    powerLevel: 9000,
    format: "Online",
  },
  {
    id: "regionals",
    stars: 3,
    date: "Nov 15, 2026",
    title: "Regionals",
    description:
      "On-site qualifiers across four regional arenas. Whiteboard interviews, live debugging rounds, and a sudden-death tiebreaker problem.",
    powerLevel: 90000,
    format: "On-site · 4 cities",
  },
  {
    id: "finals",
    stars: 4,
    date: "Dec 13, 2026",
    title: "Grand Finals",
    description:
      "32 teams, one stage, five hours on the clock. The champions take home the Zenkai Cup and the bragging rights that come with it.",
    powerLevel: 900000,
    format: "On-site · Mumbai",
  },
];

export const GALLERY: GalleryPhoto[] = [
  { id: "g1", caption: "Prelims war room, 2025 cohort", gradientFrom: "#1a2340", gradientTo: "#3a2a66" },
  { id: "g2", caption: "Regionals whiteboard round", gradientFrom: "#2a1a3a", gradientTo: "#5a2a2a" },
  { id: "g3", caption: "Finals stage, Mumbai leg", gradientFrom: "#0f2a3a", gradientTo: "#2a4a5a" },
  { id: "g4", caption: "Zenkai Cup handoff, 2025", gradientFrom: "#3a2a1a", gradientTo: "#5a4a1a" },
  { id: "g5", caption: "Scouter check-in desk", gradientFrom: "#1a3a2a", gradientTo: "#2a5a3a" },
  { id: "g6", caption: "Midnight debugging session", gradientFrom: "#2a1a4a", gradientTo: "#4a2a6a" },
  { id: "g7", caption: "The Eternal Dragon Awakes", gradientFrom: "#0f2a1a", gradientTo: "#1a4a2a", imageSrc: "/shenron.jpg" },
];

export const FAQS: FaqItem[] = [
  {
    id: "eligibility",
    question: "Who can register for Zenkai Code Arena?",
    answer:
      "Any team of three currently enrolled undergraduate or postgraduate students from a recognized institute. Mixed-college teams are allowed, but each fighter can only be rostered on one team.",
  },
  {
    id: "format",
    question: "What's the contest format?",
    answer:
      "Three rounds: an online Prelims gauntlet, on-site Regionals across four cities, and a single Grand Finals stage in Mumbai. Prelims and Regionals are ICPC-style — shared problem set, ranked by problems solved then time penalty.",
  },
  {
    id: "languages",
    question: "Which languages are supported?",
    answer:
      "C++, Java, Python, and JavaScript for all rounds. Regionals whiteboard segments are language-agnostic — pseudocode is fine there.",
  },
  {
    id: "cost",
    question: "Is there a registration fee?",
    answer:
      "Prelims are free to enter. Teams that advance to Regionals get travel and stay support from Capsule Corp Approved Partners, detailed after qualification.",
  },
  {
    id: "team-size",
    question: "Can I compete solo?",
    answer:
      "Teams must have exactly three fighters for Prelims and Regionals. Solo entries can register provisionally and we'll help match you with a squad before the deadline.",
  },
  {
    id: "prizes",
    question: "What do winning teams get?",
    answer:
      "The Zenkai Cup, a combined prize pool north of ₹12,00,000 split across the top finalist teams, and fast-tracked interview slots with our sponsor partners.",
  },
  {
    id: "practice",
    question: "Is there practice material before Prelims?",
    answer:
      "Yes — a rated practice arena opens two weeks before Prelims with past years' problem sets and a live leaderboard so you can gauge your power level.",
  },
  {
    id: "code-of-conduct",
    question: "What happens if a team is caught cheating?",
    answer:
      "Immediate disqualification for the team, and a one-year ban from future Zenkai events. Every submission is checked against a plagiarism and collusion detector.",
  },
  {
    id: "venue",
    question: "Where is the Grand Finals held?",
    answer:
      "DJSCE Grounds, Vile Parle, Mumbai. Spectators are welcome — entry is free with online registration closer to the date.",
  },
  {
    id: "contact",
    question: "Who do I contact with more questions?",
    answer:
      "Reach the organizing crew at arena@zenkaicode.dev, or use the contact details in the footer below.",
  },
];

export const SPONSORS: Sponsor[] = [
  { id: "s1", name: "Capsule Corp Cloud", tier: "elite" },
  { id: "s2", name: "Kame Systems", tier: "elite" },
  { id: "s3", name: "Namek Analytics", tier: "z-fighter" },
  { id: "s4", name: "Ginyu Devtools", tier: "z-fighter" },
  { id: "s5", name: "Senzu Labs", tier: "capsule" },
  { id: "s6", name: "Instant Transmission Networks", tier: "capsule" },
  { id: "s7", name: "Hyperbolic Time Compute", tier: "z-fighter" },
  { id: "s8", name: "West City Robotics", tier: "capsule" },
];

export const SAIYAN_GUESSES: SaiyanGuess[] = [
  {
    id: "sg1",
    answer: "Goku",
    hint: "Raised on Earth, trained under a turtle hermit, power level always climbing.",
  },
  {
    id: "sg2",
    answer: "Vegeta",
    hint: "Once a prince of a lost world, refuses to accept second place.",
  },
  {
    id: "sg3",
    answer: "Piccolo",
    hint: "Green-skinned guardian, meditates before every fight, mentors more than he fights lately.",
  },
  {
    id: "sg4",
    answer: "Gohan",
    hint: "Studies as hard as he trains — usually seen with a book under one arm.",
  },
  {
    id: "sg5",
    answer: "Trunks",
    hint: "Came back from a future that never happened, carries a sword he rarely needs.",
  },
];

export const FOOTER_LINKS = {
  social: [
    { id: "x", label: "X / Twitter", href: "https://x.com" },
    { id: "instagram", label: "Instagram", href: "https://instagram.com" },
    { id: "linkedin", label: "LinkedIn", href: "https://linkedin.com" },
    { id: "discord", label: "Discord", href: "https://discord.com" },
  ],
  credits: "Organized by the DJSCE student technical council. Built by the Zenkai web crew.",
};
