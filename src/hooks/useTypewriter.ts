"use client";

import { useEffect, useState } from "react";

interface TypewriterOptions {
  /** Milliseconds between characters. */
  speed?: number;
  /** Delay before typing begins. */
  startDelay?: number;
  /** When false the animation is paused and the text stays empty. */
  enabled?: boolean;
}

/**
 * Character-by-character reveal, mirroring the dialog boxes of classic
 * console RPGs. Resets whenever `text` changes. Returns the visible slice
 * and whether the full string has been typed.
 */
export function useTypewriter(
  text: string,
  { speed = 28, startDelay = 200, enabled = true }: TypewriterOptions = {}
) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!enabled) {
      setDisplayed("");
      setDone(false);
      return;
    }

    setDisplayed("");
    setDone(false);

    let index = 0;
    let typeTimer: number | undefined;

    const startTimer = window.setTimeout(() => {
      typeTimer = window.setInterval(() => {
        index += 1;
        setDisplayed(text.slice(0, index));
        if (index >= text.length) {
          if (typeTimer) window.clearInterval(typeTimer);
          setDone(true);
        }
      }, speed);
    }, startDelay);

    return () => {
      window.clearTimeout(startTimer);
      if (typeTimer) window.clearInterval(typeTimer);
    };
  }, [text, speed, startDelay, enabled]);

  return { displayed, done };
}
