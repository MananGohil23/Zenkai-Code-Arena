"use client";

import { useCallback } from "react";
import { useUiStore } from "@/store/useUiStore";

/**
 * Gates the boot sequence. Intentionally not persisted: a hard refresh
 * (or any fresh page load) drops the visitor back into the fighter-select
 * intro, while in-page navigation never re-triggers it.
 */
export function useIntroGate() {
  const introSeen = useUiStore((state) => state.introSeen);
  const setIntroSeen = useUiStore((state) => state.setIntroSeen);

  const completeIntro = useCallback(() => {
    setIntroSeen(true);
  }, [setIntroSeen]);

  return { showIntro: !introSeen, completeIntro };
}
