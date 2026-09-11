/**
 * Canonical site URL used for metadata, robots and sitemap.
 * Set NEXT_PUBLIC_SITE_URL in Vercel (e.g. https://zenkai.example.com);
 * falls back to the Vercel deployment URL, then localhost in dev.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000");
