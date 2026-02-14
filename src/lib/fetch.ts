import path from "path";
import { readFileSync, statSync } from "fs";
import matter from "gray-matter";
import { glob } from "glob";
import { cache } from "react";

const fetchPosts = cache(async (contentPath: string) => {
  const projectPath = process.cwd();

  // Get contents from submodule
  const fullPath = `${projectPath}/contents${contentPath}`;
  // Get Markdown file paths
  const mdFiles = await glob(`${fullPath}/**/*.md`);

  // Get data from each posts
  const posts: PostData = {};

  mdFiles.forEach((postPath) => {
    // Get slug
    const slug = path
      .join(``, postPath.slice(fullPath.length))
      .replace(".md", "");

    // Parsing files
    const file = readFileSync(postPath, { encoding: "utf-8" });
    const { content, data: front } = matter(file);

    // Add Empty values

    const stats = statSync(postPath); // Get metadata
    const fileCreationDate =
      stats.birthtime && stats.birthtime.getTime() !== 0
        ? stats.birthtime
        : stats.mtime;

    const categoryList = new Set([
      "일반",
      "기능구현",
      "트러블슈팅",
      "성능개선",
    ]);

    const newFront: MarkdownFront = {
      title: front.title || postPath.split("/").slice(-1)[0].replace(".md", ""),
      date: front.date || new Date(fileCreationDate),
      category: categoryList.has(front.category) ? front.category : "일반",
      lock: front.lock || false,
      isPublish: front.isPublish || false,
      description: front.description || content.slice(0, 80),
      series: front.series || [],
    };

    // Front validation

    // if (!categoryList.has(front.category)) {
    //   throw new Error(`category error: ${front.category} in file ${postPath}.`);
    // }

    // if (!categoryList.has(newFront.category)) {
    //   console.warn(
    //     `category warning: ${newFront.category} in file ${postPath}.`,
    //   );
    // }

    posts[slug] = {
      content,
      front: newFront,
    };
  });

  return posts;
});

const publishedPosts = cache(async (contentPath: string) => {
  const posts = await fetchPosts(contentPath);

  let slugs = Object.keys(posts);
  const publishedSlugs = slugs.filter((slug) => posts[slug].front.isPublish);

  const newPosts: PostData = {};

  publishedSlugs.forEach((slug) => {
    newPosts[slug] = posts[slug];
  });

  return newPosts;
});

// debug
// fetchPosts()

export { fetchPosts, publishedPosts };
