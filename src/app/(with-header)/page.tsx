import BreadCrumbUpdater from "@/components/BreadCrumbUpdater";
import HomeCards from "./HomeCards";
import { getAllSeries, getPublishedPosts } from "@/lib/posts";
import { dateFormat } from "@/lib/utils";
import { BookOpen, Code2, Layers, Star, Terminal } from "lucide-react";
import Link from "next/link";

export default function Page() {
  const published = getPublishedPosts();
  const seriesInfo = getAllSeries();

  const slugs = Object.keys(published).sort((a, b) => b.localeCompare(a));
  const totalCount = slugs.length;
  const recentDate =
    slugs.length > 0
      ? dateFormat(new Date(published[slugs[0]].front.date))
      : "-";
  const seriesCount = Object.keys(seriesInfo).length - 1;

  const recentSlugs = slugs.slice(0, 3);
  const recommendedSlugs = slugs.filter((s) => published[s].front.recommended);

  return (
    <div className="flex flex-col w-full items-center">
      <BreadCrumbUpdater path={"/"} />

      {/* ── 1. Hero ── */}
      <section className="relative flex justify-center items-end bg-primary/5 w-full mb-20 py-6 h-[55vh] max-h-[650px] shrink-0">
        <div className="relative w-full max-w-6xl h-90 px-2 sm:px-8 mb-5 min-w-0 flex items-center justify-between gap-10">
          {/* 좌측 텍스트 */}
          <div className="w-80 flex flex-col h-full shrink-0">
            <div className="flex flex-col gap-8 z-10">
              <div className="flex flex-col gap-3">
                <h1 className="text-4xl font-bold tracking-tight">
                  Dev Library
                </h1>
                <p className="text-muted-foreground text-lg max-w-sm">
                  개발하며 배운 것들을 기록합니다
                </p>
              </div>
              <Link
                href="/blog/published"
                className="w-fit flex gap-1 bg-primary/20 transition-all duration-200 ease-out hover:bg-primary hover:text-primary-foreground border border-primary/20 px-4 py-2 rounded-lg font-medium"
              >
                글 목록 보기 →
              </Link>
            </div>

            {/* ── 2. 통계 배지 ── */}
            <div className="absolute bottom-0 flex gap-3 text-sm items-center font-light justify-center md:justify-start translate-x-1">
              <span>
                글 <span className="font-bold">{totalCount}편</span>
              </span>
              <div className="h-4 w-px bg-primary/30" />
              <span>
                <span className="font-bold">{seriesCount}</span>개 모음집
              </span>
              <div className="h-4 w-px bg-primary/30" />
              <span>업데이트: {recentDate}</span>
            </div>
          </div>

          {/* 우측 장식 */}
          <div className="w-full max-w-150 h-full hidden md:flex md:items-start">
            {/* 아이콘 군집 */}
            {/* <BookOpen className="absolute top-2 left-4 w-8 h-8 text-primary/50" />
            <Layers className="absolute top-6 right-8 w-6 h-6 text-primary/40" />
            <Terminal className="absolute bottom-10 left-10 w-7 h-7 text-primary/45" />
            <Code2 className="absolute top-16 left-28 w-5 h-5 text-primary/35" /> */}

            {/* 코드 스니펫 블록 */}
            <div className="flex items-center w-full h-full bg-primary/10 border border-primary/20 rounded-xl px-5 py-4 font-mono text-xs text-primary/70 leading-relaxed">
              <div className="leading-6">
                <span className="text-primary/50">const</span> blog = {"{"}
                <br />
                &nbsp;&nbsp;author:{" "}
                <span className="text-primary">&quot;ka1dyn&quot;</span>,
                <br />
                &nbsp;&nbsp;focus:{" "}
                <span className="text-primary">&quot;Frontend&quot;</span>,
                <br />
                &nbsp;&nbsp;github:{" "}
                <span className="text-primary">
                  &quot;https://github.com/ka1dyn&quot;
                </span>
                ,
                <br />
                &nbsp;&nbsp;portfolio:{" "}
                <span className="text-primary">&quot;Frontend&quot;</span>,
                <br />
                {"}"}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="flex justify-center w-full">
        <div className="w-6xl min-w-0 flex flex-col gap-20 px-2 sm:px-8">
          {/* ── 3. 추천 글 ── */}
          {/* {recommendedSlugs.length > 0 && (
          <section className="flex flex-col gap-6">
            <div className="flex flex-col items-center md:items-start gap-1">
              <h2 className="text-2xl font-semibold flex items-center gap-2">
                <Star className="w-5 h-5 text-primary fill-primary" />
                추천 글
              </h2>
              <p className="text-muted-foreground text-sm">
                꼭 한 번 읽어보길 추천하는 글이에요
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-fit mx-auto md:mx-0 justify-items-center">
              <HomeCards
                recommended
                cards={recommendedSlugs.slice(0, 2).map((slug) => ({
                  slug,
                  thumbnail: published[slug].front.thumbnail,
                  title: published[slug].front.title,
                  date: published[slug].front.date,
                  category: published[slug].front.category,
                  lock: published[slug].front.lock,
                  description: published[slug].front.description,
                  content: published[slug].content,
                }))}
              />
            </div>
          </section>
        )} */}

          {/* ── 4. 최근 글 ── */}
          <section className="flex flex-col gap-6 w-full">
            <div className="flex flex-col items-center gap-1 md:flex-row md:justify-between">
              <div>
                <h2 className="text-2xl font-semibold">최근 글</h2>
                <p className="text-muted-foreground text-sm mt-1">
                  서재에 새로 추가된 글이에요
                </p>
              </div>
              <Link
                href="/blog/published"
                className="text-sm text-primary hover:underline underline-offset-4 transition-all"
              >
                전체 글 보기 →
              </Link>
            </div>
            <div className="flex gap-8 w-full overflow-x-auto mx-auto md:mx-0 justify-items-center">
              <HomeCards
                cards={recentSlugs.map((slug) => ({
                  slug,
                  thumbnail: published[slug].front.thumbnail,
                  title: published[slug].front.title,
                  date: published[slug].front.date,
                  category: published[slug].front.category,
                  lock: published[slug].front.lock,
                  description: published[slug].front.description,
                  content: published[slug].content,
                }))}
              />
            </div>
          </section>

          {/* ── 5. 시리즈 ── */}
          {/* <section className="flex flex-col gap-6">
          <div className="flex flex-col items-center md:items-start gap-1">
            <h2 className="text-2xl font-semibold">모음집</h2>
            <p className="text-muted-foreground text-sm">
              주제별로 묶어둔 시리즈 글 모음이에요
            </p>
          </div>
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            {Object.entries(seriesInfo)
              .filter(([key]) => key !== "전체")
              .map(([key, value]) => (
                <Link
                  href={`/blog/published?series=${key}`}
                  key={key}
                  className="flex gap-1 bg-primary/20 transition-all duration-200 ease-out hover:bg-primary hover:text-primary-foreground border-sidebar-border px-4 py-2 rounded-full text-foreground"
                >
                  <span className="font-medium">{key}</span>
                  <span className="text-muted-foreground">{`(${value})`}</span>
                </Link>
              ))}
          </div>
        </section> */}
        </div>
      </div>
    </div>
  );
}
