"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

interface CategoryProps {
  name: string;
  className?: string;
  bgColor?: boolean;
}

export default function Category({
  name,
  className,
  bgColor = false,
}: CategoryProps) {
  const [isHovered, setIsHovered] = useState(false);

  let fontColor = "";
  switch (name) {
    case "일반":
      fontColor = "#3d3529";
      break;
    case "기능구현":
      fontColor = "#598156";
      break;
    case "트러블슈팅":
      fontColor = "#c25450";
      break;
    case "성능개선":
      fontColor = "#008779";
      break;

    default:
      fontColor = "#3d3529";
  }

  const setBgColor = bgColor && isHovered;

  return (
    <div
      className={cn(
        "px-2 py-1 bolder text-xs rounded-md w-fit border",
        className,
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        borderColor: `${fontColor}55`,
        backgroundColor: setBgColor ? `${fontColor}11` : "",
      }}
    >
      <span
        className="text-white"
        style={{
          color: fontColor,
        }}
      >
        {name}
      </span>
    </div>
  );
}
