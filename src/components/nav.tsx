import { fetchPosts, publishedPosts } from "@/lib/fetch";
import { TreeItem } from "./TreeItem";
import Link from "next/link";

export default async function Nav() {
  const posts = await fetchPosts("/study");
  const published = await publishedPosts("/study");

  const publishedCount = Object.keys(published).length;

  let slugs = Object.keys(posts);

  const pathTree: TreeObj = {
    name: "root",
    count: 0,
    children: {},
    isLeaf: false,
  };

  slugs.forEach((slug) => {
    const segments = slug.split("/");

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
      }

      curObj.children[segment].count += 1;
      curObj = curObj.children[segment];
    });
  });

  return (
    <div className="h-screen w-0 md:w-64 bg-amber-50 overflow-auto">
      <Link href="/blog/published" className="ml-3">
        posts {publishedCount}
      </Link>
      <div className="">
        <TreeItem tree={pathTree} depth={0} />
      </div>
    </div>
  );
}
