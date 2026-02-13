import { fetchPosts, publishedPosts } from "@/lib/fetch";
import NavClient from "./NavClient";

export default async function NavDataContainer() {
  const blogPosts = await fetchPosts("/study");
  const blogPublished = await publishedPosts("/study");

  const data = {
    blogPosts,
    blogPublished,
  };

  return <NavClient data={data} />;
}
