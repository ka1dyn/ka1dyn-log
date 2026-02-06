import { fetchPosts, publishedPosts } from "@/lib/fetch";
import { TreeItem } from "./TreeItem";
import React from "react";
import StickyWrapper from "./StickyWrapper";

export default async function Nav() {
  const posts = await fetchPosts("/test");
  const published = await publishedPosts("/test");

  const publishedCount = Object.keys(published).length;

  // Matk pathTree
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
      className="h-screen shrink-0 w-0 md:w-80 bg-card font-noto-serif overflow-scroll scrollbar-hide"
      style={{
        boxShadow: "var(--paper-shadow)",
        backgroundImage:
          "repeating-linear-gradient(0deg, transparent, transparent 20px, rgba(139, 115, 85, 0.02) 20px, rgba(139, 115, 85, 0.02) 21px)",
      }}
    >
      <div className="relative flex flex-col gap-2">
        <StickyWrapper className="z-5" />

        <div className="px-4 z-5">
          <div className="group">
            {/* <TreeItem tree={pathTree} depth={0} isOpen={true} /> */}
            {Object.values(pathTree.children).map((subNodes) => (
              <React.Fragment key={subNodes.name}>
                <TreeItem tree={subNodes} depth={1} isOpen={true} />
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
