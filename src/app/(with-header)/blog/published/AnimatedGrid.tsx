"use client";

import PostCard from "@/components/PostCard";
import { useMediaQuery } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { BreakPointQuery } from "@/enums";

interface AnimatedGridProps {
  slugs: string[];
  published: { [key: string]: any };
}

const POSTS_PER_PAGE = 6;

export default function AnimatedGrid({ slugs, published }: AnimatedGridProps) {
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const md = useMediaQuery(BreakPointQuery.MD);

  const totalPages = Math.ceil(slugs.length / POSTS_PER_PAGE);

  const getCurrentPageSlugs = () => {
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    const endIndex = startIndex + POSTS_PER_PAGE;
    return slugs.slice(startIndex, endIndex);
  };

  useEffect(() => {
    if (slugs.length === 0) return;
    setCurrentPage(1);
  }, [slugs]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  useEffect(() => {
    if (getCurrentPageSlugs().length === 0) return;

    const observer = new IntersectionObserver((entries) => {
      const visibleEntries = entries.filter((entry) => entry.isIntersecting);

      visibleEntries.forEach((entry, index) => {
        const card = entry.target as HTMLDivElement;
        card.style.transitionDuration = "1000ms";
        card.style.transitionDelay = `${index * 200}ms`;
        card.setAttribute("data-visible", "true");

        card.addEventListener(
          "transitionend",
          (e) => {
            card.style.transitionDuration = "200ms";
            card.style.transitionDelay = "0ms";
          },
          { once: true },
        );

        observer.unobserve(card);
      });
    });

    cardRefs.current.forEach((el) => {
      if (!el) return;
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, [slugs, currentPage]);

  const Pagination = () => {
    const getPageNumbers = () => {
      if (md) {
        if (totalPages <= 5) {
          return Array.from({ length: totalPages }, (_, i) => i + 1);
        }
        if (currentPage <= 3) {
          return [1, 2, 3, "...", totalPages];
        }
        if (currentPage > totalPages - 3) {
          return [1, "...", totalPages - 2, totalPages - 1, totalPages];
        }
        return [
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages,
        ];
      }

      if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
      }

      if (currentPage <= 4) {
        return [1, 2, 3, 4, 5, "...", totalPages];
      }

      if (currentPage > totalPages - 4) {
        return [
          1,
          "...",
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        ];
      }

      return [
        1,
        "...",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        totalPages,
      ];
    };

    const pages = getPageNumbers();

    return (
      <div className="flex justify-center items-center space-x-2 mt-8">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 cursor-pointer disabled:opacity-50 disabled:cursor-default"
        >
          {"<"}
        </button>
        {pages.map((page, index) =>
          typeof page === "number" ? (
            <button
              key={index}
              onClick={() => setCurrentPage(page)}
              className={cn(
                "px-3 py-2 text-foreground cursor-pointer font-extralight",
                currentPage === page && "font-bold",
              )}
            >
              {page}
            </button>
          ) : (
            <span key={index} className="px-3 py-2">
              {page}
            </span>
          ),
        )}
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-4 py-2 cursor-pointer disabled:opacity-50 disabled:cursor-default"
        >
          {">"}
        </button>
      </div>
    );
  };

  return (
    <div className="flex flex-col w-full gap-5">
      <div
        className={cn(
          "grid w-fit mx-auto justify-center justify-items-center grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-12",
        )}
        key={slugs.join(",") + currentPage}
      >
        {getCurrentPageSlugs().map((slug, idx) => {
          const info = published[slug];
          const { front } = info;
          const { title, date, category, lock, description, thumbnail } = front;

          return (
            <PostCard
              ref={(card: HTMLAnchorElement | null) => {
                cardRefs.current[idx] = card;
              }}
              key={slug}
              thumbnail={thumbnail}
              slug={slug}
              title={title}
              date={new Date(date)}
              category={category}
              lock={lock}
              description={description}
              content={info.content}
            />
          );
        })}
      </div>
      {totalPages > 1 && <Pagination />}
    </div>
  );
}
