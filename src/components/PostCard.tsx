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
    <div className="relative w-full h-[350px] transform-3d rotate-x-[-10deg] rotate-y-[-20deg]">
      {/* 앞면 (1) */}
      <div className="absolute inset-0 flex items-center justify-center bg-slate-200 border border-slate-400 translate-z-[20px]">
        1 (앞면)
      </div>

      {/* 오른쪽 옆면 (2) */}
      <div
        className="absolute top-0 right-0 h-full w-[40px] flex items-center justify-center bg-blue-300 border border-blue-400 
        transform-[rotateY(90deg)_translateZ(20px)]"
      >
        2 (옆면)
      </div>

      {/* 윗면 (3) */}
      <div
        className="absolute top-0 left-0 w-full h-[40px] flex items-center justify-center bg-blue-300 border border-blue-400
        transform-[rotateX(90deg)_translateZ(20px)]
        "
      >
        3 (윗면)
      </div>

      {/* 밑면 (4) */}
      <div
        className="absolute bottom-0 w-full h-[40px] flex items-center justify-center bg-blue-300 border border-blue-400
        transform-[rotateX(-90deg)_translateZ(20px)]
        "
      >
        4 (밑면)
      </div>

      {/* <div className="-translate-z-12 rotate-y-18 bg-sky-300/75">2</div> */}
      {/* <div className="translate-x-12 rotate-y-90 bg-sky-300/75">3</div> */}
      {/* <div className="-translate-x-12 -rotate-y-90 bg-sky-300/75">4</div> */}
      {/* <div className="-translate-y-12 rotate-x-90 bg-sky-300/75">5</div> */}
      {/* <div className="translate-y-12 -rotate-x-90 bg-sky-300/75">6</div> */}
    </div>
  );

  // return (
  //   <Link
  //     href={`/blog${slug}`}
  //     className="h-[350px] flex gap-2 shadow-sm rounded-l-lg rounded-r-sm overflow-hidden border border-sidebar-border/50 transition-all duration-200 eas-out hover:shadow-lg hover:-translate-y-2 group"
  //   >
  //     <div className="relative w-4 bg-primary shrink-0"></div>
  //     <div className="p-5 bg-card w-full">
  //       <div className="relative h-full flex flex-col">
  //         <Category category={category} className="mb-4" />
  //         <div className="flex flex-col mb-6">
  //           <h2 className="font-semibold text-xl mb-2">{title}</h2>
  //           <div className="text-sm flex gap-2 items-center pl-0.5">
  //             <FolderOpen className="w-4 h-4 text-primary" />
  //             <span className="text-xs">{slug}</span>
  //           </div>
  //         </div>
  //         <p className="text-sm text-muted-foreground">{description}</p>
  //         <div className="absolute bottom-0 w-full text-xs text-foreground flex justify-between">
  //           <div className="absolute -top-4 left-0 w-16 h-px bg-primary/30"></div>
  //           <span>{formattedDate}</span>
  //           <div className="flex items-center gap-1">
  //             <Clock className="w-3 h-3 text-muted-foreground" />
  //             <span className="-translate-y-px">{readMinute}분</span>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </Link>
  // );
}
