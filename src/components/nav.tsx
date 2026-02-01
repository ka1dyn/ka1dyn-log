import { fetchPosts } from "@/lib/fetch";
import { TreeItem } from "./treeItem";

export default async function Nav() {
  const posts = await fetchPosts("/contents/kaidyn/study");

  let slugs = Object.keys(posts);

  const pathTree: TreeObj = {
    name: "root",
    count: 0,
    children: {},
    isLeaf: false,
  };

  slugs = slugs.map((slug) => {
    return slug.slice(6);
  });

  slugs.forEach((slug) => {
    const segments = slug.split("/").slice(1);

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
    <div className="min-h-screen w-0 md:w-64 bg-amber-50 overflow-hidden">
      <div className="">
        <TreeItem tree={pathTree} depth={0} />
      </div>
    </div>
  );
}
