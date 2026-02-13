"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";

interface PageTocItemProps {
  depth: number;
  text: string;
}

export default function PageTocItem({ depth, text }: PageTocItemProps) {
  const textId = text
    .toString() // 1. 문자열로 변환
    .toLowerCase() // 2. 소문자로 변환
    .trim() // 3. 앞뒤 공백 제거
    .replace(/\s+/g, "-") // 4. 공백을 -로 교체
    .replace(/[^\w\-가-힣]+/g, "") // 5. 알파벳, 숫자, 대시, 한글 외 특수문자 제거
    .replace(/\-\-+/g, "-") // 6. 연속된 대시(--)를 하나로 축소
    .replace(/^-+/, "") // 7. 시작 부분 대시 제거
    .replace(/-+$/, ""); // 8. 끝 부분 대시 제거

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const targetElement = document.getElementById(textId);

    if (!targetElement) return;

    // Disable basic link operation
    e.preventDefault();
    const elementPosition = targetElement.getBoundingClientRect().top;
    const finalPosition = elementPosition - 150;

    const mainDiv = document.getElementById("main") as HTMLDivElement;

    mainDiv.scrollTo({
      top: finalPosition,
      behavior: "smooth",
    });
  };

  return (
    <div
      className={cn(
        depth === 1 && "",
        depth === 2 && "ml-2",
        depth === 3 && "ml-4",
        "cursor-pointer",
      )}
    >
      <div onClick={handleClick}>{text}</div>
    </div>
  );
}
