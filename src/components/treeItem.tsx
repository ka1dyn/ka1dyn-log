import { cn } from "@/lib/utils";
import React from "react";

export function TreeItem({ tree, depth }: { tree: TreeObj; depth: number }) {
  const { name, count, children, isLeaf } = tree;

  return (
    <div className={cn("flex flex-col ml-3", isLeaf && "cursor-pointer")}>
      <div className="flex gap-2">
        <span>{name}</span>
        <span>{count}</span>
      </div>

      {Object.values(children).map((node) => (
        <React.Fragment key={node.name}>
          <TreeItem tree={node} depth={depth + 1} />
        </React.Fragment>
      ))}
    </div>
  );
}
