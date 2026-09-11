import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        void: {
          DEFAULT: "#0a0c12",
          raised: "#12151f",
          panel: "#0e1119",
          line: "#232838",
        },
        ink: {
          DEFAULT: "#eef0f6",
          dim: "#a8adc2",
          faint: "#6b7189",
        },
        accent: "var(--accent)",
        "accent-2": "var(--accent-2)",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        pixel: ["var(--font-pixel)"],
      },
      boxShadow: {
        ki: "0 0 0 1px rgba(255,255,255,0.04), 0 20px 50px -24px var(--accent-soft)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.4" },
        },
      },
      animation: {
        marquee: "marquee 32s linear infinite",
        "pulse-glow": "pulse-glow 1.6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
