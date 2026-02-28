"use client";

import { useEffect, useRef, useState } from "react";
import { BookOpen, Code2, Layers, Terminal } from "lucide-react";

export default function HeroBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      console.log("test");
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePos({ x, y });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseenter", () => setIsHovering(true));
      container.addEventListener("mouseleave", () => setIsHovering(false));
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseenter", () => setIsHovering(true));
        container.removeEventListener("mouseleave", () => setIsHovering(false));
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden z-20"
      aria-hidden="true"
    >
      {/* 1. 마우스 추적 Glow 효과 */}
      <div
        className="absolute transition-opacity duration-500 ease-in-out bg-primary/10 blur-[80px] rounded-full"
        style={{
          width: "200px",
          height: "200px",
          left: `${mousePos.x - 100}px`,
          top: `${mousePos.y - 100}px`,
          opacity: isHovering ? 1 : 0,
          pointerEvents: "none",
        }}
      />

      {/* 3. 배경 격자 또는 미세한 패턴 (선택 사항) */}
      <div className="absolute inset-0 bg-[radial-gradient(#88888833_1px,transparent_1px)] bg-size-[40px_40px] opacity-[0.15]" />
    </div>
  );
}
