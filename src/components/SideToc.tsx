"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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
  const filteredTocData = useMemo(() => {
    return tocData.filter((el) => {
      const { depth } = el;
      return depth !== 3;
    });
  }, [tocData]);

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
      const curScrollIdx = getScrollIdx(window.scrollY);
      if (prevScroll !== curScrollIdx) setScrollIdx(curScrollIdx);
    };

    // Calculate each scroll breakpoint
    const breakPoint: number[] = [0];

    console.log(filteredTocData);

    filteredTocData.forEach((toc) => {
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

    console.log(breakPoint);

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn(
        "sticky top-40 left-0 flex flex-col gap-1.5 text-sm text-muted-foreground pl-3 font-pretendard border-l-2 border-accent/30",
        "transition-all duration-400 ease-out opacity-100",
        scrollIdx === 0 && "opacity-0",
      )}
    >
      {filteredTocData.map((toc, idx) => {
        const { orderTxt, depth, text } = toc;

        if (depth === 3) return;

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
