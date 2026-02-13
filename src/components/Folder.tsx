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
        "w-full rounded-r-lg flex items-center py-1.5",
        mainFolder
          ? "px-3 py-3 border-l-6 transition-all duration-200 inset-shadow-2xs shadow-sm border-primary/40 hover:border-primary"
          : "pl-2 hover:bg-accent/20",
      )}
      onClick={nodeClick}
    >
      <div className="flex items-center gap-3">
        {!mainFolder && (
          <ChevronRight
            className={cn("text-primary w-4 h-4 shrink-0", open && "rotate-90")}
          />
        )}

        {open ? (
          <FolderOpen
            className={cn(
              "text-primary w-4 h-4 shrink-0",
              mainFolder && "w-5 h-5",
            )}
          />
        ) : (
          <FolderDefault
            className={cn(
              "text-primary w-4 h-4 shrink-0",
              mainFolder && "w-5 h-5",
            )}
          />
        )}
        <div className="flex gap-2 items-center">
          <span className="font-medium">{name}</span>
          <span className="font-light text-xs">{count}권</span>
        </div>
      </div>
    </div>
  );
}
