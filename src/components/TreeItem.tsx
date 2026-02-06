"use client";

import { cn } from "@/lib/utils";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Leaf from "./Leaf";
import Folder from "./Folder";
import { useNavTriggerStore } from "@/stores";

export function TreeItem({
  tree,
  depth,
  isOpen,
}: {
  tree: TreeObj;
  depth: number;
  isOpen: boolean;
}) {
  const { name, count, children, isLeaf, path, isPublish } = tree;
  const [open, setOpen] = useState<boolean>(isOpen);

  const expand = useNavTriggerStore((state) => state.expand);
  const collapse = useNavTriggerStore((state) => state.collapse);

  useEffect(() => {
    if (expand == 0) return;

    setOpen(true);
  }, [expand]);

  useEffect(() => {
    if (collapse == 0) return;

    setOpen(false);
  }, [collapse]);

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
    <div className={cn("flex flex-col gap-0.5 select-none mb-0.5 text-sm")}>
      {isLeaf ? (
        <Leaf name={name} path={path} isPublish={isPublish || false} />
      ) : (
        <Folder
          name={name}
          count={count}
          depth={depth}
          open={open}
          nodeClick={nodeClick}
        />
      )}

      {!isLeaf && (
        <div
          className={cn(
            "ml-2",
            depth !== 1 &&
              `relative before:content-[''] before:h-full before:w-0.5 before:absolute before:top-0 before:left-0 
            before:bg-transparent group-hover:before:bg-secondary/50 before:translate-x-1.5`,
            open ? "block" : "hidden",
          )}
        >
          {SubTree}
        </div>
      )}
    </div>
  );
}
