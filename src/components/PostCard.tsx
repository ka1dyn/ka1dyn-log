import { dateFormat } from "@/lib/utils";
import { Clock, FolderOpen } from "lucide-react";
import Link from "next/link";
import readingTime from "reading-time";
import Category from "./Category";

interface PostCardProps {
  slug: string;
  title: string;
  date: Date;
  category: string;
  lock: boolean;
  description: string;
  content: string;
}

export default function PostCard({
  slug,
  title,
  date,
  category,
  lock,
  description,
  content,
}: PostCardProps) {
  const formattedDate = dateFormat(date);

  const readTime = readingTime(content);
  const readMinute = Math.ceil(readTime.minutes);

  return (
    <Link
      href={`/blog${slug}`}
      className="relative h-[450px] w-full max-w-[420px] flex flex-col gap-2 rounded-l-lg rounded-r-sm overflow-hidden border border-sidebar-border/50 transition-all duration-200 ease-out hover:-translate-y-2 group shadow-lg hover:shadow-xl"
    >
      <div className="h-40 shrink-0"></div>
      <div className="h-full p-5 bg-card w-full">
        <div className="relative h-full flex flex-col">
          <div className="flex flex-col mb-6">
            <h2 className="font-semibold text-[1.3rem] mb-1">{title}</h2>
            <div className="text-sm flex gap-1 items-center pl-0.5">
              <FolderOpen className="w-3 h-3 text-primary" />
              <span className="text-muted-foreground/70 text-xs">{slug}</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">{description}</p>
          <div className="absolute bottom-10 right-0">
            <Category name={category} className="mb-2" />
          </div>

          <div className="absolute bottom-0 w-full text-xs text-foreground flex justify-between">
            <div className="absolute -top-4 left-0 w-16 h-px bg-primary/30"></div>
            <span>{formattedDate}</span>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-muted-foreground" />
              <span className="-translate-y-px">{readMinute}분</span>
            </div>
          </div>
        </div>
      </div>
      <div
        className="absolute -top-1 right-8 w-6 h-10 bg-primary/80 opacity-0 group-hover:opacity-100 transition-all duration-300"
        style={{
          clipPath: "polygon(0px 0px, 100% 0px, 100% 100%, 50% 85%, 0px 100%)",
          boxShadow: "rgba(0, 0, 0, 0.2) 0px 2px 4px",
        }}
      />
    </Link>
  );
}
