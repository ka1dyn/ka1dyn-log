"use client";

import { BookMarked, BookOpen } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Line from "./Line";
import NavFilter from "./NavFilter";
import Link from "next/link";

export default function StickyWrapper() {
  // For sticky observe
  const [isStuck, setIsStuck] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        console.log("set!", !entry.isIntersecting);
        setIsStuck(!entry.isIntersecting);
      },
      { threshold: [1] },
    );

    if (sentinelRef.current) {
      console.log("start observe");
      observer.observe(sentinelRef.current);
    }

    return () => observer.disconnect();
  }, [sentinelRef.current]);

  return (
    <>
      <div
        ref={sentinelRef}
        className="absolute top-0 left-0 h-px w-full z-5 bg-transparent"
      />
      <div
        className="sticky top-0 px-4 pt-6 bg-card pb-2 z-10"
        style={{
          boxShadow: isStuck ? "var(--paper-shadow-sticky)" : "",
        }}
      >
        <section className="flex items-center gap-3 mb-4">
          <BookMarked className="text-primary" />
          <h2 className="text-lg font-semibold">서재</h2>
        </section>

        <Line name="출판 글" />

        <section className="flex flex-col items-center">
          <Link
            href="/blog/published"
            className="flex justify-center items-center gap-2 bg-primary text-primary-foreground w-full h-12 rounded-lg font-medium"
          >
            <BookOpen className="w-5 h-5" />
            <span>전체 글 보기</span>
          </Link>
        </section>

        <Line name="공부 서랍" />

        <NavFilter />
      </div>
    </>
  );
}
