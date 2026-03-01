"use client";

import { cn, textToId } from "@/lib/utils";
import Link from "next/link";

interface PageTocItemProps {
  depth: number;
  text: string;
  orderTxt: string;
}

export default function PageTocItem({
  depth,
  text,
  orderTxt,
}: PageTocItemProps) {
  const textId = textToId(text);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const targetElement = document.getElementById(textId);

    if (!targetElement) return;

    // Disable basic link operation
    e.preventDefault();
    const elementPosition = targetElement.offsetTop;
    const finalPosition = elementPosition;

    window.scrollTo({
      top: finalPosition,
      behavior: "smooth",
    });
  };

  return (
    <div
      className={cn(
        "cursor-pointer bg-card px-2 py-2.5 border-x border-b border-sidebar-border text-sm",
        depth === 1 && "bg-accent/30",
        depth === 2 && "bg-accent/10",
        depth === 3 && "",
      )}
      onClick={handleClick}
    >
      <div
        className={cn(
          "flex gap-2",
          depth === 1 && "",
          depth === 2 && "ml-4",
          depth === 3 && "ml-8",
        )}
      >
        <span>{orderTxt}</span>
        <span>{text}</span>
      </div>
    </div>
  );
}
