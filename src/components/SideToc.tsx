"use client";

import { useEffect, useRef, useState } from "react";
import SideTocItem from "./SideTocItem";
import { cn, textToId } from "@/lib/utils";

interface SideToc {
  tocData: {
    orderTxt: string;
    depth: number;
    text: string;
  }[];
}

export default function SideToc({ tocData }: SideToc) {
  const [scrollIdx, setScrollIdx] = useState<number>(0);
  const prevScrollIdx = useRef<number>(0);

  useEffect(() => {
    const getScrollIdx = (scroll: number) => {
      let ret = 0;
      breakPoint.forEach((point, idx) => {
        if (scroll >= point) ret = idx;
      });

      prevScrollIdx.current = ret;
      return ret;
    };

    const onScroll = (e: Event) => {
      const prevScroll = prevScrollIdx.current;
      const curScrollIdx = getScrollIdx(mainDiv!.scrollTop);
      if (prevScroll !== curScrollIdx) setScrollIdx(curScrollIdx);
    };

    // Get main div
    const mainDiv = document.getElementById("main");
    if (!mainDiv) return;

    // Calculate each scroll breakpoint
    const breakPoint: number[] = [0];

    tocData.forEach((toc) => {
      const { text } = toc;
      const textId = textToId(text);

      const tocDiv = document.getElementById(textId);
      if (!tocDiv) {
        breakPoint.push(breakPoint.at(-1) ?? 0);
        return;
      }

      const scrollPosition = tocDiv.offsetTop;
      breakPoint.push(scrollPosition);
    });

    mainDiv.addEventListener("scroll", onScroll);

    return () => mainDiv.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn(
        "sticky top-35 left-0 flex flex-col gap-2 text-sm text-muted-foreground pl-3 font-pretendard border-l-2 border-accent/30",
        "transition-all duration-400 ease-out opacity-100",
        scrollIdx === 0 && "opacity-0",
      )}
    >
      {tocData.map((toc, idx) => {
        const { orderTxt, depth, text } = toc;

        return (
          <SideTocItem
            depth={depth}
            text={text}
            key={orderTxt}
            highlight={scrollIdx - 1 === idx}
          />
        );
      })}
    </div>
  );
}
