import { fetchPosts } from "@/lib/fetch";
import { MDXRemote } from "next-mdx-remote-client/rsc";
import BreadCrumbUpdater from "@/components/BreadCrumbUpdater";
import { mdCustomOption, mdCustomStyle } from "./markdownOptions";
import { Calendar, List, Tag } from "lucide-react";
import { dateFormat, getTocData, replaceSrc } from "@/lib/utils";
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
      const publicSrc = replaceSrc(src);

      return <img src={publicSrc} alt={alt || "no image"} />;
    },
    ...mdCustomStyle,
  };

  return (
    <div className="w-full flex flex-col items-center">
      <BreadCrumbUpdater path={path} />

      <div className="w-full max-w-[90ch] text-foreground flex flex-col gap-10">
        <div
          className="w-full flex flex-col p-8 pb-5 bg-card gap-10 rounded-md"
          style={{
            boxShadow: "var(--paper-shadow)",
          }}
        >
          <div className="flex flex-col">
            <h1 className="text-4xl font-semibold mb-5">{title}</h1>
            <div className="flex gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-muted-foreground" />
                <Category name={category} className="text-sm" />
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="font-medium">{dateKR}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col mb-4">
            <div className="px-2 py-2 flex items-center gap-2">
              <List className="w-5 h-5 text-primary" />
              <span className="text-md font-semibold text-foreground">
                목차
              </span>
            </div>
            <div className="flex flex-col max-h-[350px] overflow-auto border-y border-sidebar-border">
              {tocData.map((data) => {
                const { orderTxt, depth, text } = data;

                return (
                  <React.Fragment key={text}>
                    <PageTocItem
                      depth={depth}
                      text={text}
                      orderTxt={orderTxt}
                    />
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>

        <div
          className="w-full p-8 bg-card gap-10 rounded-md font-pretendard"
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
    </div>
  );
}
