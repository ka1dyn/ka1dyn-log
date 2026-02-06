import { fetchPosts, publishedPosts } from "@/lib/fetch";
import NavClient from "./NavClient";

export default async function NavDataContainer() {
  const studyPosts = await fetchPosts("/study");
  const studyPublished = await publishedPosts("/study");

  const data = {
    studyPosts,
    studyPublished,
  };

  return <NavClient data={data} />;
}
