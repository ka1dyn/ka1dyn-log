import { fetchPosts, publishedPosts } from "@/lib/fetch";
import NavClient from "./NavClient";

export default async function NavDataContainer() {
  const posts = await fetchPosts("/test");
  const published = await publishedPosts("/test");

  const data = {
    posts,
    published,
  };

  return <NavClient data={data} />;
}
