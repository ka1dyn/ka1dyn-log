import BreadCrumbUpdater from "@/components/BreadCrumbUpdater";
import { getDailyPosts } from "@/lib/posts";
import DailyPostItem from "@/components/DailyPostItem";
import { dateFormat } from "@/lib/utils";

export default function Page() {
  const { dailyPosts, dailySortedSlugs } = getDailyPosts();

  const count = dailySortedSlugs.length;
  const recentUpdated =
    count === 0
      ? "-"
      : dateFormat(new Date(dailyPosts[dailySortedSlugs[0]].front.date));

  return (
    <div className="flex flex-col">
      <BreadCrumbUpdater path={"/Daily"} />

      <div className="flex flex-col gap-6 mb-6">
        <div className="flex flex-col items-center md:items-start">
          <h1 className="text-3xl mb-2 font-semibold">
            <span className="-translate-y-0.5">일상 글</span>
          </h1>
          <p className="hidden text-foreground md:block">
            평소의 생각이나 일상을 담은 글 목록입니다
          </p>
        </div>
        <div className="gap-4 text-sm items-center font-light hidden md:flex">
          <span>
            총 <span className="font-bold">{count}편</span>
          </span>
          <div className="h-2/3 w-px bg-primary/30"></div>
          <span>최근 업데이트: {recentUpdated}</span>
        </div>
      </div>

      <div className="flex flex-col gap-2 mt-4">
        {dailySortedSlugs.length > 0 ? (
          dailySortedSlugs.map((slug) => {
            const post = dailyPosts[slug];
            return (
              <DailyPostItem
                key={slug}
                slug={slug}
                title={post.front.title}
                description={post.front.description}
                date={post.front.date}
                content={post.content}
              />
            );
          })
        ) : (
          <div className="py-20 text-center text-muted-foreground bg-card/50 rounded-xl border border-border/50">
            아직 등록된 일상글이 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}
