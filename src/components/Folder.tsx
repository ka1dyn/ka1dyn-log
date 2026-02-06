import { cn } from "@/lib/utils";
import {
  ChevronRight,
  Folder as FolderDefault,
  FolderOpen,
} from "lucide-react";

interface FolderProps {
  name: string;
  count: number;
  depth: number;
  open: boolean;
  nodeClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export default function Folder({
  name,
  count,
  depth,
  open,
  nodeClick,
}: FolderProps) {
  const mainFolder = depth === 1;

  return (
    <div
      className={cn(
        "w-full rounded-lg flex items-center py-1.5",
        mainFolder
          ? "rounded-r-lg px-3 py-3 bg-linear-to-r from-card to-accent/30 border-l-4 transition-all duration-200 hover:shadow-md border-primary/60 hover:border-primary"
          : "pl-2 hover:bg-accent/20",
      )}
      onClick={nodeClick}
    >
      <div className="flex items-center gap-3">
        {!mainFolder && (
          <ChevronRight
            className={cn("text-primary w-4 h-4", open && "rotate-90")}
          />
        )}

        {open ? (
          <FolderOpen
            className={cn("text-primary w-4 h-4", mainFolder && "w-5 h-5")}
          />
        ) : (
          <FolderDefault
            className={cn("text-primary w-4 h-4", mainFolder && "w-5 h-5")}
          />
        )}
        <div className="flex gap-2 items-center">
          <span className="font-medium">{name}</span>
          <span className="font-light text-xs">{count}편</span>
        </div>
      </div>
    </div>
  );
}
