import { fetchPosts } from "@/lib/fetch";
import remarkGfm from "remark-gfm";
import { MDXRemote } from "next-mdx-remote-client/rsc";

export async function generateStaticParams() {
  const posts = await fetchPosts("/test");

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

  const posts = await fetchPosts("/test");

  const { content, front } = posts[path];
  const { title, date, category, lock } = front;

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
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="bg-blue-500">{title}</div>
      {/* <div>date: {date}</div> */}
      <div>category: {category}</div>
      <div>lock: {lock}</div>
      <div>created_date: {date.toISOString()}</div>

      {/* <p>content: {content}</p> */}
      <div className="prose">
        <MDXRemote
          source={content}
          components={mdxComponents}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              format: "md",
            },
          }}
        />
      </div>
    </div>
  );
}
