"use client";

import { TreeItem } from "./TreeItem";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { BookMarked, BookOpen } from "lucide-react";
import Line from "./Line";
import NavFilter from "./NavFilter";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface NavClientProps {
  data: {
    studyPosts: PostData;
    studyPublished: PostData;
  };
}

export default function NavClient({ data }: NavClientProps) {
  const { studyPosts, studyPublished } = data;

  const publishedCount = Object.keys(studyPublished).length;

  // Overflow detector
  const [overflow, setOverflow] = useState<boolean>(false);

  const target = useRef<HTMLDivElement>(null!);
  useEffect(() => {
    const checkOverFlow = () => {
      const el = target.current;
      const hasOverflow = el.scrollHeight > el.clientHeight;

      setOverflow(hasOverflow);
    };

    const el = target.current;
    if (!el) return;

    checkOverFlow();

    const observer = new ResizeObserver(() => checkOverFlow());
    observer.observe(el);
  }, [target.current]);

  // Make pathTree
  let slugs = Object.keys(studyPosts);

  const pathTree = useMemo(() => {
    const tree: TreeObj = {
      name: "root",
      count: 0,
      children: {},
      isLeaf: false,
    };

    slugs.forEach((slug) => {
      const segments = slug.split("/").filter((segment) => Boolean(segment));

      let curObj = tree;
      curObj.count += 1;

      segments.forEach((segment, idx) => {
        if (!curObj.children[segment]) {
          curObj.children[segment] = {
            name: segment,
            count: 0,
            children: {},
            isLeaf: false,
          };
        }

        if (idx === segments.length - 1) {
          curObj.children[segment].isLeaf = true;
          curObj.children[segment].path = slug;
          curObj.children[segment].createdDate = studyPosts[slug].front.date;
          curObj.children[segment].isPublish = studyPosts[slug].front.isPublish;
        }

        curObj.children[segment].count += 1;
        curObj = curObj.children[segment];
      });
    });

    return tree;
  }, [data]);

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
          <section className="flex items-center gap-3 mb-4">
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
                <span className="font-semibold">출판 글 보기</span>
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
          <div className="group">
            {/* <TreeItem tree={tree} depth={0} isOpen={true} /> */}
            {Object.values(pathTree.children).map((subNodes) => (
              <React.Fragment key={subNodes.name}>
                <TreeItem tree={subNodes} depth={1} isOpen={true} />
              </React.Fragment>
            ))}
          </div>
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
