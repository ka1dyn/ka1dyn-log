import { fetchPosts, publishedPosts } from "@/lib/fetch";
import { TreeItem } from "./TreeItem";
import Link from "next/link";
import { BookOpen, BookMarked, Bookmark } from "lucide-react";
import Line from "./Line";
import React from "react";

export default async function Nav() {
  const posts = await fetchPosts("/test");
  const published = await publishedPosts("/test");

  const publishedCount = Object.keys(published).length;

  let slugs = Object.keys(posts);

  const pathTree: TreeObj = {
    name: "root",
    count: 0,
    children: {},
    isLeaf: false,
  };

  slugs.forEach((slug) => {
    const segments = slug.split("/").filter((segment) => Boolean(segment));

    let curObj = pathTree;
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

  return (
    <aside
      className="h-screen shrink-0 w-0 md:w-80 bg-card overflow-auto font-noto-serif"
      style={{
        boxShadow: "var(--paper-shadow)",
        backgroundImage:
          "repeating-linear-gradient(0deg, transparent, transparent 20px, rgba(139, 115, 85, 0.02) 20px, rgba(139, 115, 85, 0.02) 21px)",
      }}
    >
      <div className="py-6 px-4">
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

        <div className="group">
          {/* <TreeItem tree={pathTree} depth={0} isOpen={true} /> */}
          {Object.values(pathTree.children).map((subNodes) => (
            <React.Fragment key={subNodes.name}>
              <TreeItem tree={subNodes} depth={1} isOpen={true} />
            </React.Fragment>
          ))}
        </div>
      </div>
    </aside>
  );
}
