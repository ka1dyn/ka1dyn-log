import BreadCrumbUpdater from "@/components/BreadCrumbUpdater";
import Category from "@/components/Category";
import PostCard from "@/components/PostCard";
import { getAllSeries, getPublishedPosts } from "@/lib/posts";
import { cn, dateFormat } from "@/lib/utils";
import { Filter } from "lucide-react";
import Link from "next/link";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ category: string; series: string }>;
}) {
  let { category, series } = await searchParams;
  if (!category) category = "전체";
  if (!series) series = "전체";

  const published = getPublishedPosts();
  const seriesInfo = getAllSeries();

  console.log(published);

  console.log(seriesInfo);

  const slugs = Object.keys(published).filter((slug) => {
    const post = published[slug];
    const { front } = post;
    const { category: frontCategory, series: frontSeries } = front;

    const filterCategory = category === "전체" || category === frontCategory;
    const filterSeries = series === "전체" || front.series.includes(series);

    return filterCategory && filterSeries;
  });
  const publishedCount = slugs.length;

  slugs.sort((a, b) => b.localeCompare(a));
  const recentUpdated =
    slugs.length === 0
      ? "-"
      : dateFormat(new Date(published[slugs[0]].front.date));

  const isSeries = series !== "전체";

  return (
    <div className="flex flex-col">
      <BreadCrumbUpdater path={"/Published"} />

      <div className="flex flex-col items-center md:items-start mb-16">
        <div className="text-3xl mb-6 font-semibold">모음집</div>
        <div className="flex gap-3">
          {Object.entries(seriesInfo).map(([key, value]) => (
            <Link
              href={`/blog/published?series=${key}`}
              key={key}
              className="flex gap-1 bg-primary/20 transition-all duration-200 ease-out hover:bg-primary hover:text-primary-foreground border-sidebar-border px-3 py-[5px] rounded-full text-foreground text-md "
            >
              <span className="font-medium">{key}</span>
              <span>{`(${value})`}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="relative flex flex-col md:flex-row justify-between mb-8 md:mb-12">
        <div className="flex flex-col gap-6 md:m-0">
          <div className="flex flex-col items-center md:items-start">
            <h1 className="text-3xl mb-2 font-semibold">
              <span className="-translate-y-0.5">출판 글 목록</span>
            </h1>
            <p className="hidden text-foreground md:block">
              {isSeries ? (
                <span>
                  <span className="font-semibold underline underline-offset-1">
                    {series}
                  </span>{" "}
                  주제에 관련된 글 모음입니다
                </span>
              ) : (
                "서재에 보관된 모든 글을 둘러보세요"
              )}
            </p>
          </div>
          <div className="gap-4 text-sm items-center font-light hidden md:flex">
            <span>
              총 <span className="font-bold">{publishedCount}편</span>
            </span>
            <div className="h-2/3 w-px bg-primary/30"></div>
            <span>최근 업데이트: {recentUpdated}</span>
          </div>
        </div>
        <div className="flex-col items-center gap-2 hidden md:flex md:gap-3 md:items-end md:absolute md:bottom-0 md:right-0">
          <div className="flex items-center gap-1">
            <Filter className="w-4 h-4 text-primary" />
            <span className="text-foreground text-sm">카테고리 필터</span>
          </div>
          <div className="w-fit flex text gap-2 text-primary">
            <Link href={`/blog/published?series=${series}&category=전체`}>
              <Category name="전체" bgColor={true} className="cursor-pointer" />
            </Link>
            <Link href={`/blog/published?series=${series}&category=성능개선`}>
              <Category
                name="성능개선"
                bgColor={true}
                className="cursor-pointer"
              />
            </Link>
            <Link href={`/blog/published?series=${series}&category=문제해결`}>
              <Category
                name="문제해결"
                bgColor={true}
                className="cursor-pointer"
              />
            </Link>
            <Link href={`/blog/published?series=${series}&category=기능구현`}>
              <Category
                name="기능구현"
                bgColor={true}
                className="cursor-pointer"
              />
            </Link>
          </div>
        </div>
      </div>

      {/* Grid view */}
      <div className="flex w-full">
        <div
          className={cn(
            "grid w-fit mx-auto justify-center justify-items-center grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-12",
            // slugs.length === 1 && "md:grid-cols-1 xl:grid-cols-1 w-full",
            // slugs.length === 2 && "md:grid-cols-2 xl:grid-cols-2 w-full",
          )}
        >
          {slugs.map((slug) => {
            const info = published[slug];

            const { content, front } = info;
            const { title, date, category, lock, description, thumbnail } =
              front;

            return (
              <PostCard
                key={slug}
                thumbnail={thumbnail}
                slug={slug}
                title={title}
                date={new Date(date)}
                category={category}
                lock={lock}
                description={description}
                content={content}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
