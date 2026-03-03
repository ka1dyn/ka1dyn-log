import { cn, dateFormat } from "@/lib/utils";
import Link from "next/link";
import { Clock } from "lucide-react";
import readingTime from "reading-time";

interface DailyPostItemProps {
  slug: string;
  title: string;
  description: string;
  date: string | Date;
  content: string;
}

export default function DailyPostItem({
  slug,
  title,
  description,
  date,
  content,
}: DailyPostItemProps) {
  const formattedDate = dateFormat(new Date(date));
  const readTime = readingTime(content);
  const readMinute = Math.ceil(readTime.minutes);

  return (
    <Link
      href={`/blog${slug}`}
      className={cn(
        "group flex flex-col py-6 border-b border-secondary",
        "transition-colors duration-200 ease-in-out hover:bg-primary/5",
        "px-4 -mx-4 rounded-xl",
      )}
    >
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
          {title}
        </h2>
        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
          {description}
        </p>
        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground/80 font-medium">
          <span>{formattedDate}</span>
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{readMinute}분 소요</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
