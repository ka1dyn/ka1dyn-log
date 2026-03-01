"use client";

import PostCard from "@/components/PostCard";
import { Star } from "lucide-react";
import { useEffect, useRef } from "react";

interface CardInfo {
  slug: string;
  thumbnail: string;
  title: string;
  date: string;
  category: string;
  lock: boolean;
  description: string;
  content: string;
}

interface HomeCardsProps {
  cards: CardInfo[];
  recommended?: boolean;
}

export default function HomeCards({ cards, recommended }: HomeCardsProps) {
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries
        .filter((e) => e.isIntersecting)
        .forEach((entry, i) => {
          const el = entry.target as HTMLElement;
          el.style.transitionDuration = "800ms";
          el.style.transitionDelay = `${i * 150}ms`;
          el.setAttribute("data-visible", "true");
          el.addEventListener(
            "transitionend",
            () => {
              el.style.transitionDuration = "200ms";
              el.style.transitionDelay = "0ms";
            },
            { once: true },
          );
          observer.unobserve(el);
        });
    });

    cardRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {cards.map((card, idx) => (
        <div key={card.slug} className="relative w-full max-w-[400px]">
          {recommended && (
            <span className="absolute -top-3 left-4 z-10 flex items-center gap-1 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full shadow">
              <Star className="w-3 h-3 fill-primary-foreground" />
              추천
            </span>
          )}
          <PostCard
            ref={(el: HTMLAnchorElement | null) => {
              cardRefs.current[idx] = el;
            }}
            slug={card.slug}
            thumbnail={card.thumbnail}
            title={card.title}
            date={new Date(card.date)}
            category={card.category}
            lock={card.lock}
            description={card.description}
            content={card.content}
          />
        </div>
      ))}
    </>
  );
}
