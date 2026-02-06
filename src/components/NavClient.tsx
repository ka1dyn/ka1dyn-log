"use client";

import { TreeItem } from "./TreeItem";
import React, { RefObject, useEffect, useMemo, useRef, useState } from "react";
import { BookMarked, BookOpen } from "lucide-react";
import Line from "./Line";
import NavFilter from "./NavFilter";
import Link from "next/link";

interface NavClientProps {
  data: {
    posts: PostData;
    published: PostData;
  };
}

export default function NavClient({ data }: NavClientProps) {
  const { posts, published } = data;

  const publishedCount = Object.keys(published).length;

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
  let slugs = Object.keys(posts);

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
          curObj.children[segment].createdDate = posts[slug].front.date;
        }

        curObj.children[segment].count += 1;
        curObj = curObj.children[segment];
      });
    });

    return tree;
  }, [data]);

  return (
    <aside
      className="relative flex flex-col justify-between h-screen shrink-0 w-0 md:w-80 bg-card font-noto-serif"
      style={{
        boxShadow: "var(--paper-shadow)",
        backgroundImage:
          "repeating-linear-gradient(0deg, transparent, transparent 20px, rgba(139, 115, 85, 0.02) 20px, rgba(139, 115, 85, 0.02) 21px)",
      }}
    >
      <div className="relative flex-1 flex flex-col min-h-0 gap-2 z-5">
        <div
          className="w-full pb-2 px-4 pt-6"
          style={{
            boxShadow: overflow ? "var(--paper-shadow-down" : "",
          }}
        >
          <section className="flex items-center gap-3 mb-4">
            <BookMarked className="text-primary" />
            <h2 className="text-lg font-semibold">서재</h2>
          </section>

          <Line isDefault={false} name="출판 글" />

          <section className="flex flex-col items-center">
            <Link
              href="/blog/published"
              className="flex justify-center items-center gap-2 bg-primary text-primary-foreground w-full h-12 rounded-lg font-medium"
            >
              <BookOpen className="w-5 h-5" />
              <span>전체 글 보기</span>
            </Link>
          </section>

          <Line isDefault={false} name="모음집" />

          <section className="flex flex-col gap-2 text-sm">
            <div className="flex flex-col gap-1">
              <span>프로젝트</span>
              <div className="flex flex-col gap-1 ml-2 text-sm">
                <div>test1</div>
                <div>test2</div>
                <div>test2</div>
              </div>
            </div>
            <div>생각</div>
            <div>독서</div>
          </section>

          <Line isDefault={false} name="공부 서랍" />

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
