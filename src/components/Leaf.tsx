import { NotebookText, StickyNote } from "lucide-react";
import { useRouter } from "next/navigation";

interface LeafProps {
  name: string;
  path?: string;
}

export default function Leaf({ name, path }: LeafProps) {
  const router = useRouter();

  const navClick = () => {
    if (path) {
      router.push(`/blog${path}`);
    } else {
      router.push("/");
    }
  };

  return (
    <div
      className="w-full rounded-lg flex items-center py-1.5 pl-2 hover:bg-accent/20 group/leaf relative"
      onClick={navClick}
    >
      {/* <div className="w-4"></div> */}
      <div className="ml-7 flex items-center gap-3">
        <NotebookText className="text-primary/50 w-4 h-4" />
        <div className="flex gap-2 items-center">
          <span className="font-medium text-foreground/80 group-hover/leaf:text-foreground">
            {name}
          </span>
        </div>

        <div className="absolute top-1/2 right-2 size-1 bg-muted-foreground/30 rounded-full -translate-y-1/2"></div>
      </div>
    </div>
  );
}
