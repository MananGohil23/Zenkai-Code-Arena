import { Mail, Phone, MapPin } from "lucide-react";
import { EVENT, FOOTER_LINKS } from "@/constants/content";

export function Footer() {
  return (
    <footer className="relative border-t border-void-line px-6 sm:px-10 py-16">
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-1 sm:grid-cols-[1.2fr_1fr_1fr] gap-10">
          <div>
            <p className="font-display text-sm tracking-wide" style={{ color: "var(--accent)" }}>
              Capsule Corp Contact
            </p>
            <h3 className="mt-2 font-display text-2xl font-bold text-ink">
              {EVENT.name}
            </h3>
            <p className="mt-3 max-w-sm text-sm text-ink-dim leading-relaxed">
              {FOOTER_LINKS.credits}
            </p>
          </div>

          <div>
            <p className="text-xs tracking-wide text-ink-faint mb-3">Get in touch</p>
            <ul className="flex flex-col gap-2.5 text-sm text-ink-dim">
              <li className="flex items-center gap-2">
                <Mail size={14} style={{ color: "var(--accent)" }} />
                <a href={`mailto:${EVENT.contactEmail}`} className="hover:text-ink transition-colors">
                  {EVENT.contactEmail}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={14} style={{ color: "var(--accent)" }} />
                <a href={`tel:${EVENT.contactPhone.replace(/\s+/g, "")}`} className="hover:text-ink transition-colors">
                  {EVENT.contactPhone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={14} style={{ color: "var(--accent)" }} />
                <span>{EVENT.venue}, {EVENT.city}</span>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs tracking-wide text-ink-faint mb-3">Follow the arena</p>
            <ul className="flex flex-col gap-2.5 text-sm text-ink-dim">
              {FOOTER_LINKS.social.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-ink transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-t border-void-line pt-6">
          <p className="text-xs text-ink-faint">
            &copy; {new Date().getFullYear()} {EVENT.name}. All power levels reserved.
          </p>
          <p className="text-xs text-ink-faint">
            Fan-made aesthetic homage — not affiliated with Toei Animation or Bird Studio.
          </p>
        </div>
      </div>
    </footer>
  );
}
