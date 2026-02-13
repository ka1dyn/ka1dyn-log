import { fetchPosts, publishedPosts } from "@/lib/fetch";
import NavClient from "./NavClient";

export default async function NavDataContainer() {
  const blogPosts = await fetchPosts("/blog");
  const blogPublished = await publishedPosts("/blog");

  const data = {
    blogPosts,
    blogPublished,
  };

  return <NavClient data={data} />;
}
