"use client";

import { BreakPointQuery } from "@/enums";
import { useState, useEffect } from "react";

export function useMediaQuery(
  query: BreakPointQuery,
  changeFunc?: Function,
  initTrigger: boolean = false,
) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);

    if (media.matches !== matches) {
      setMatches(media.matches);
      if (initTrigger) {
        if (changeFunc) changeFunc();
      }
    }

    const listener = () => {
      setMatches(media.matches);
      if (changeFunc) changeFunc();
    };
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
}
