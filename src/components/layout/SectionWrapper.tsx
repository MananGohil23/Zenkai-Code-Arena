"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

interface SectionWrapperProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
}

/**
 * Standard section shell: an anchor target that gets the shared GSAP
 * scroll-reveal treatment. Wrap every major section in this so entrance
 * timing stays consistent site-wide.
 */
export function SectionWrapper({
  id,
  className = "",
  children,
}: SectionWrapperProps) {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section id={id} ref={ref} className={`relative ${className}`}>
      {children}
    </section>
  );
}
