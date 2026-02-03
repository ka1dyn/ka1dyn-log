"use client";

import { cn } from "@/lib/utils";
import React, { useCallback } from "react";
import { useRouter } from "next/navigation";

export function TreeItem({ tree, depth }: { tree: TreeObj; depth: number }) {
  const { name, count, children, isLeaf, path } = tree;
  const router = useRouter();

  const navClick = () => {
    if (isLeaf && path) {
      router.push(`/blog${path}`);
    }
  };

  const comPare = useCallback((a: TreeObj, b: TreeObj) => {
    if (a.isLeaf) {
      const createdA = a.createdDate?.getTime() || 0;
      const createdB = b.createdDate?.getTime() || 0;
      return createdA - createdB;
    }

    return a.name.localeCompare(b.name);
  }, []);

  return (
    <div className={cn("flex flex-col ml-3", isLeaf && "cursor-pointer")}>
      <div className="flex gap-2" onClick={navClick}>
        <span>{name}</span>
        <span>{count}</span>
      </div>

      {Object.values(children)
        .sort(comPare)
        .map((node) => (
          <React.Fragment key={node.name}>
            <TreeItem tree={node} depth={depth + 1} />
          </React.Fragment>
        ))}
    </div>
  );
}
