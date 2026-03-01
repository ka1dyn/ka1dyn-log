"use client";

import { useMediaQuery } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import { useNavTriggerStore } from "@/stores";
import { NotebookText, StickyNote } from "lucide-react";
import Link from "next/link";

interface LeafProps {
  name: string;
  path?: string;
  isPublish: boolean;
}

export default function Leaf({ name, path, isPublish }: LeafProps) {
  const fullPath = path ? `/blog${path}` : "/";
  const xl2 = useMediaQuery("(min-width: 96rem)");
  const navClose = useNavTriggerStore((state) => state.navClose);

  return (
    <Link
      href={fullPath}
      onClick={() => !xl2 && navClose()}
      className="w-full rounded-lg flex items-center py-1.5 pl-2 hover:bg-accent/20 group/leaf relative"
    >
      {/* <div className="w-4"></div> */}
      <div className="ml-7 flex items-center gap-3">
        <NotebookText className="text-primary/50 w-4 h-4 shrink-0" />
        <div className="flex gap-2 items-center">
          <span className="font-medium text-foreground/80 group-hover/leaf:text-foreground">
            {name}
          </span>
        </div>

        <div
          className={cn(
            "absolute top-1/2 right-2 size-1 rounded-full -translate-y-1/2",
            isPublish ? "bg-muted-foreground/80" : "bg-muted-foreground/30",
          )}
        ></div>
      </div>
    </Link>
  );
}
