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

  // Parallax 효과를 위한 아이콘 데이터
  const floatingIcons = [
    {
      Icon: BookOpen,
      top: "15%",
      left: "10%",
      factor: 0.03,
      size: 32,
      opacity: 0.3,
    },
    {
      Icon: Layers,
      top: "25%",
      right: "15%",
      factor: -0.05,
      size: 24,
      opacity: 0.25,
    },
    {
      Icon: Terminal,
      bottom: "20%",
      left: "20%",
      factor: 0.04,
      size: 28,
      opacity: 0.2,
    },
    {
      Icon: Code2,
      top: "40%",
      left: "45%",
      factor: -0.02,
      size: 20,
      opacity: 0.15,
    },
  ];

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* 1. 마우스 추적 Glow 효과 */}
      <div
        className="absolute transition-opacity duration-500 ease-in-out bg-primary/30 blur-[80px] rounded-full"
        style={{
          width: "200px",
          height: "200px",
          left: `${mousePos.x - 100}px`,
          top: `${mousePos.y - 100}px`,
          opacity: isHovering ? 1 : 0,
          pointerEvents: "none",
        }}
      />

      {/* 2. Parallax Floating 아이콘들 */}
      {floatingIcons.map((item, index) => {
        const { Icon, top, left, right, bottom, factor, size, opacity } = item;

        // 마우스 위치에 따른 오프셋 계산 (중심점 기준)
        const offsetX = isHovering
          ? (mousePos.x - (containerRef.current?.clientWidth || 0) / 2) * factor
          : 0;
        const offsetY = isHovering
          ? (mousePos.y - (containerRef.current?.clientHeight || 0) / 2) *
            factor
          : 0;

        return (
          <div
            key={index}
            className="absolute transition-transform duration-300 ease-out text-primary"
            style={{
              top,
              left,
              right,
              bottom,
              opacity,
              transform: `translate(${offsetX}px, ${offsetY}px)`,
            }}
          >
            <Icon size={size} />
          </div>
        );
      })}

      {/* 3. 배경 격자 또는 미세한 패턴 (선택 사항) */}
      <div className="absolute inset-0 bg-[radial-gradient(#88888833_1px,transparent_1px)] [background-size:40px_40px] opacity-[0.15]" />
    </div>
  );
}
