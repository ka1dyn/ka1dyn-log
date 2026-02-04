"use client";

import { cn } from "@/lib/utils";
import React, { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

export function TreeItem({
  tree,
  depth,
  isOpen,
}: {
  tree: TreeObj;
  depth: number;
  isOpen: boolean;
}) {
  const { name, count, children, isLeaf, path } = tree;
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(isOpen);

  const navClick = () => {
    if (isLeaf && path) {
      router.push(`/blog${path}`);
    }
  };

  const comPare = useCallback((a: TreeObj, b: TreeObj) => {
    // Folder first
    if (a.isLeaf !== b.isLeaf) {
      return a.isLeaf ? 1 : -1;
    }

    // If file, sort by created date
    if (a.isLeaf) {
      const createdA = a.createdDate?.getTime() || 0;
      const createdB = b.createdDate?.getTime() || 0;
      return createdA - createdB;
    }

    // If folder, sort by name string
    return a.name.localeCompare(b.name);
  }, []);

  const SubTree = useMemo(() => {
    return Object.values(children)
      .sort(comPare)
      .map((node) => {
        const newDepth = depth + 1;
        let isOpen = false;

        if (newDepth <= 1) {
          isOpen = true;
        }

        return (
          <React.Fragment key={node.name}>
            <TreeItem tree={node} depth={depth + 1} isOpen={isOpen} />
          </React.Fragment>
        );
      });
  }, [comPare, children]);

  const nodeClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    setOpen(!open);
  };

  return (
    <div
      className={cn(
        "flex flex-col ml-3 cursor-pointer",
        isLeaf && "cursor-pointer",
      )}
      onClick={nodeClick}
    >
      <div className="flex gap-2" onClick={navClick}>
        <span>{name}</span>
        <span>{count}</span>
      </div>

      <div className={cn(open ? "block" : "hidden")}>{SubTree}</div>
    </div>
  );
}
