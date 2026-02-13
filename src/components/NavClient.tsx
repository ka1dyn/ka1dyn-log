"use client";

import { TreeItem } from "./TreeItem";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { BookMarked, BookOpen } from "lucide-react";
import Line from "./Line";
import NavFilter from "./NavFilter";
import Link from "next/link";
import { cn, generateTree } from "@/lib/utils";
import { publishedPosts } from "@/lib/fetch";
import { useNavTriggerStore } from "@/stores";

interface NavClientProps {
  data: {
    blogPosts: PostData;
    blogPublished: PostData;
  };
}

export default function NavClient({ data }: NavClientProps) {
  const { blogPosts, blogPublished } = data;
  const publishedCount = Object.keys(blogPublished).length;

  const isPublish = useNavTriggerStore((state) => state.isPublish);

  // Overflow detector
  const [overflow, setOverflow] = useState<boolean>(false);

  const target = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    const el = target.current;
    if (!el) return;

    const checkOverFlow = () => {
      const hasOverflow = el.scrollHeight > el.clientHeight;

      setOverflow(hasOverflow);
    };

    checkOverFlow();

    const observer = new ResizeObserver(() => checkOverFlow());
    observer.observe(el);
  }, [target.current]);

  const totalTree = useMemo(() => generateTree(blogPosts), [blogPosts]);
  const publishTree = useMemo(
    () => generateTree(blogPublished),
    [blogPublished],
  );

  const renderTree = useMemo(() => {
    const currentTree = isPublish ? publishTree : totalTree;
    const keyPrefix = isPublish ? "publish" : "total";

    return Object.values(currentTree.children).map((subNodes) => (
      <TreeItem
        tree={subNodes}
        depth={1}
        isOpen={true}
        key={`${keyPrefix}-${subNodes.name}`}
      />
    ));
  }, [isPublish, publishTree, totalTree]);

  return (
    <aside
      className="top-0 flex flex-col justify-between h-screen shrink-0 w-0 lg:w-80 bg-card font-noto-serif overflow-hidden border-r border-sidebar-border"
      style={{
        backgroundImage:
          "repeating-linear-gradient(0deg, transparent, transparent 20px, rgba(139, 115, 85, 0.02) 20px, rgba(139, 115, 85, 0.02) 21px)",
      }}
    >
      <div className="relative flex-1 flex flex-col min-h-0 gap-2 z-5">
        <div
          className="w-full pb-1 px-4 pt-6"
          style={{
            boxShadow: overflow ? "var(--paper-shadow-down" : "",
          }}
        >
          <section className="flex items-center gap-3 mb-4 ml-1">
            <BookMarked className="text-primary" />
            <h2 className="text-lg font-semibold">서재</h2>
          </section>

          <Line isDefault={false} name="집필 공간" />

          <section className="w-full flex justify-center gap-2 text-sm mt-5">
            <Link href="/" className="w-20 text-center">
              홈
            </Link>
            <Link href="/introduce" className="w-20 text-center">
              소개
            </Link>
            <Link href="/blog/series" className="w-20 text-center">
              모음집
            </Link>
          </section>

          <Line isDefault={false} name="책장" />

          <Link
            href="/blog/published"
            className={cn(
              "relative group/publish w-full rounded-r-lg flex items-center mb-6 bg-linear-to-r from-primary hover:opacity-95 to-primary/90 border-secondary-foreground/60 hover:border-accent-foreground overflow-hidden",
              "px-3 py-3 border-l-6 transition-all duration-200 inset-shadow-2xs shadow-md",
            )}
          >
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/publish:translate-x-full transition-transform duration-700"></div>
            <div className="flex items-center gap-3 text-md text-primary-foreground">
              <BookOpen className="w-5 h-5" />
              <div className="flex gap-2 items-center">
                <span className="font-semibold">출판 도서 목록</span>
                <span className="font-medium text-xs">{publishedCount}편</span>
              </div>
            </div>
          </Link>

          <NavFilter />
        </div>

        <section
          ref={target}
          className="px-4 z-5 min-h-0 overflow-y-auto scrollbar-hide"
        >
          {renderTree}
        </section>
      </div>

      <div
        className="w-full h-30 text-center text-xs text-muted-foreground z-20"
        style={{
          boxShadow: overflow ? "var(--paper-shadow-up)" : "",
        }}
      >
        <Line />
        "지식은 나누면 배가 된다"
      </div>
    </aside>
  );
}
