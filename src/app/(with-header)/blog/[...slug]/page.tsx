import { fetchPosts } from "@/lib/fetch";
import { MDXRemote } from "next-mdx-remote-client/rsc";
import BreadCrumbUpdater from "@/components/BreadCrumbUpdater";
import { mdCustomOption, mdCustomStyle } from "./markdownOptions";
import { Calendar, List, Tag } from "lucide-react";
import { dateFormat, getTocData } from "@/lib/utils";
import Category from "@/components/Category";
import PageTocItem from "@/components/PageTocItem";
import React from "react";

export async function generateStaticParams() {
  const posts = await fetchPosts("/blog");

  const slugs = Object.keys(posts);

  return slugs.map((slug) => {
    const slugPieces = slug
      .replace(".md", "")
      .split("/")
      .filter((el) => Boolean(el));

    return {
      slug: slugPieces,
    };
  });
}

export const dynamicParams = false;

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const decodedSlug = slug.map((segment) => decodeURIComponent(segment));

  const path = `/${decodedSlug.join("/")}`;

  const posts = await fetchPosts("/blog");

  const { content, front } = posts[path];
  const { title, date, category, lock } = front;

  const tocData = getTocData(content);
  const dateKR = dateFormat(date);

  const mdxComponents = {
    img: (props: any) => {
      const { src, alt } = props;

      // Image path change
      let optimizedSrc = src;
      if (src.startsWith("images/")) {
        optimizedSrc = `/content-${src}`;
      } else if (src.includes("images/")) {
        const fileName = src.split("images/").pop();
        optimizedSrc = `/content-images/${fileName}`;
      }

      return <img src={optimizedSrc} alt={alt || "no image"} />;
    },
    ...mdCustomStyle,
  };

  return (
    <div className="w-full flex flex-col items-center p-8">
      <BreadCrumbUpdater path={path} />

      <div className="w-[85ch] text-foreground flex flex-col gap-10">
        <div
          className="w-full flex flex-col px-5 pt-8 pb-5 bg-card gap-10 rounded-lg"
          style={{
            boxShadow: "var(--paper-shadow)",
          }}
        >
          <div className="flex flex-col">
            <h1 className="text-4xl font-semibold mb-5">{title}</h1>
            <div className="flex gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-muted-foreground" />
                <Category category={category} className="text-sm" />
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="font-medium">{dateKR}</span>
              </div>
            </div>
          </div>

          <div className="px-6 py-4 bg-accent/30 flex flex-col rounded-lg">
            <div className="flex items-center gap-2 mb-5">
              <List className="w-5 h-5 text-primary" />
              <span className="text-xl font-semibold text-foreground">
                목차
              </span>
            </div>
            <div className="flex flex-col gap-2">
              {tocData.map((data) => {
                const { depth, text } = data;

                return (
                  <React.Fragment key={text}>
                    <PageTocItem depth={depth} text={text} />
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>
        <div
          className="w-full px-5 py-8 bg-card gap-10 rounded-lg"
          style={{
            boxShadow: "var(--paper-shadow)",
          }}
        >
          <MDXRemote
            source={content}
            components={mdxComponents}
            options={mdCustomOption}
          />
        </div>
      </div>

      <div className="bg-blue-500">{title}</div>
      {/* <div>date: {date}</div> */}
      <div>category: {category}</div>
      <div>lock: {lock}</div>
      <div>created_date: {date.toISOString()}</div>

      {/* <p>content: {content}</p> */}
    </div>
  );
}
