import { cn } from "@/lib/utils";

interface LineProps {
  name?: string;
  isDefault?: boolean;
  className?: string;
}

export default function Line({ name, isDefault = true, className }: LineProps) {
  return (
    <div className={cn("flex items-center gap-2 my-6", className)}>
      {isDefault ? (
        <>
          <div className="flex-1 h-px bg-linear-to-r from-transparent via-border to-transparent"></div>
        </>
      ) : (
        <>
          <div className="flex-1 h-px bg-linear-to-r from-transparent via-border to-transparent "></div>
          <div className="text-xs text-muted-foreground">{name}</div>
          <div className="flex-1 h-px bg-linear-to-r from-transparent via-border to-transparent"></div>
        </>
      )}
    </div>
  );
}
