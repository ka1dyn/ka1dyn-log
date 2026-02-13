import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function dateFormat(date: Date) {
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export const getTocData = (source: string) => {
  const headings = source.split("\n").filter((str) => str.match(/^#+/));

  return headings.map((str) => {
    const match = str.match(/^#+/) as RegExpMatchArray;

    const depth = match[0].length || 0;
    const headingText = str.replace(/^#+/, "").trim();

    return { depth: depth, text: headingText };
  });
};
