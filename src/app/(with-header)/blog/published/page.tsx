import BreadCrumbUpdater from "@/components/BreadCrumbUpdater";
import PostCard from "@/components/PostCard";
import { publishedPosts } from "@/lib/fetch";

export default async function Page() {
  const published = await publishedPosts("/study");

  return (
    <div>
      <BreadCrumbUpdater path={"/Published"} />
      {Object.keys(published).map((slug) => {
        const info = published[slug];

        const { content, front } = info;
        const { title, date, category, lock } = front;

        return (
          <PostCard
            key={slug}
            slug={slug}
            title={title}
            date={date}
            category={category}
            lock={lock}
            description={content.slice(0, 50)}
          />
        );
      })}
    </div>
  );
}
