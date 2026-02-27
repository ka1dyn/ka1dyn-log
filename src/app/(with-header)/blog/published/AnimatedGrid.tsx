"use client";

import PostCard from "@/components/PostCard";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

interface AnimatedGridProps {
  slugs: string[];
  published: { [key: string]: any };
}

export default function AnimatedGrid({ slugs, published }: AnimatedGridProps) {
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    if (slugs.length === 0) return;
    const cards = cardRefs.current;

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
  }, [slugs]);

  return (
    <div
      className={cn(
        "grid w-fit mx-auto justify-center justify-items-center grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-12",
        // slugs.length === 1 && "md:grid-cols-1 xl:grid-cols-1 w-full",
        // slugs.length === 2 && "md:grid-cols-2 xl:grid-cols-2 w-full",
      )}
      key={slugs.join(",")}
    >
      {slugs.map((slug, idx) => {
        const info = published[slug];

        const { content, front } = info;
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
            content={content}
          />
        );
      })}
    </div>
  );
}
