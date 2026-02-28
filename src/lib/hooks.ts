"use client";

import { useState, useEffect } from "react";

export function useMediaQuery(
  query: string,
  changeFunc: Function = () => {},
  initTrigger: boolean = false,
) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (initTrigger) {
      changeFunc();
    }
  }, []);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      console.log("test");
      changeFunc();
      setMatches(media.matches);
    }

    const listener = () => {
      setMatches(media.matches);
    };
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
}
