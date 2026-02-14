import BreadCrumbUpdater from "@/components/BreadCrumbUpdater";
import Category from "@/components/Category";
import PostCard from "@/components/PostCard";
import { publishedPosts } from "@/lib/fetch";
import { cn, dateFormat } from "@/lib/utils";
import Link from "next/link";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ category: string; series: string }>;
}) {
  let { category, series } = await searchParams;
  if (!category) category = "전체";
  if (!series) series = "전체";

  const published = await publishedPosts("/blog");

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
    slugs.length === 0 ? "-" : dateFormat(published[slugs[0]].front.date);

  return (
    <div className="flex flex-col p-8">
      <BreadCrumbUpdater path={"/Published"} />

      <div className="relative flex justify-between mb-12">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col">
            <h1 className="text-3xl mb-2 font-semibold -translate-x-0.5">
              출판 도서 목록
            </h1>
            <p>서재에 보관된 모든 글을 둘러보세요</p>
          </div>
          <div className="flex gap-4 text-sm items-center font-light">
            <span>
              총 <span className="font-bold">{publishedCount}권</span>의 도서
            </span>
            <div className="h-2/3 w-px bg-primary/30"></div>
            <span>최근 업데이트: {recentUpdated}</span>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 flex flex-col gap-2">
          {/* <div className="text-end text-sm">카테고리</div> */}
          <div className="w-fit flex text-sm gap-2 text-primary">
            <Link href="/blog/published?category=성능개선">
              <Category
                name="성능개선"
                bgColor={true}
                className="cursor-pointer"
              />
            </Link>
            <Link href="/blog/published?category=트러블슈팅">
              <Category
                name="트러블슈팅"
                bgColor={true}
                className="cursor-pointer"
              />
            </Link>
            <Link href="/blog/published?category=기능구현">
              <Category
                name="기능구현"
                bgColor={true}
                className="cursor-pointer"
              />
            </Link>
            <Link href="/blog/published?category=전체">
              <Category name="전체" bgColor={true} className="cursor-pointer" />
            </Link>
          </div>
        </div>
      </div>

      {/* Grid view */}
      <div className="flex w-full">
        <div
          className={cn(
            "grid w-fit mx-auto justify-center justify-items-center grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-12",
            slugs.length === 1 && "md:grid-cols-1 xl:grid-cols-1 w-full",
            slugs.length === 2 && "md:grid-cols-2 xl:grid-cols-2 w-full",
          )}
        >
          {slugs.map((slug) => {
            const info = published[slug];

            const { content, front } = info;
            const { title, date, category, lock, description } = front;

            return (
              <PostCard
                key={slug}
                slug={slug}
                title={title}
                date={date}
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
