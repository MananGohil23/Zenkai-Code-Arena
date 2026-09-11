import type { Metadata } from "next";
import { Saira_Condensed, Manrope, Press_Start_2P, VT323 } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { CRTOverlay } from "@/components/ui/CRTOverlay";
import { MuteToggle } from "@/components/ui/MuteToggle";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { EVENT } from "@/constants/content";
import { SITE_URL } from "@/lib/site";

const display = Saira_Condensed({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const body = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const pixel = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-pixel",
  display: "swap",
});

const terminal = VT323({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-terminal",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${EVENT.name} — ${EVENT.tagline}`,
    template: `%s | ${EVENT.name}`,
  },
  description: EVENT.description,
  keywords: [
    "Zenkai Code Arena",
    "ICPC",
    "coding competition",
    "competitive programming",
    "hackathon",
    "Mumbai",
    "DJSCE",
    "algorithm contest",
  ],
  authors: [{ name: EVENT.name }],
  robots: { index: true, follow: true },
  openGraph: {
    title: `${EVENT.name} — ${EVENT.tagline}`,
    description: EVENT.description,
    url: SITE_URL,
    siteName: EVENT.name,
    type: "website",
    images: [{ url: "/dragon_ball_logo.jpg", width: 736, height: 414, alt: EVENT.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${EVENT.name} — ${EVENT.tagline}`,
    description: EVENT.description,
    images: ["/dragon_ball_logo.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${pixel.variable} ${terminal.variable}`}
    >
      <body className="bg-void font-body text-ink antialiased">
        <ThemeProvider>
          <SmoothScroll>
            <ScrollProgress />
            {children}
            <MuteToggle />
            <CRTOverlay />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
