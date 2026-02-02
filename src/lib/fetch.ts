import path from "path";
import { readFileSync, statSync } from "fs";
import matter from "gray-matter";
import { glob } from "glob";

const fetchPosts = async (contentPath: string) => {
  const vaultPath = process.env.VAULT;
  const projectPath = process.cwd();
  const fullPath = `${path.dirname(projectPath)}${vaultPath}${contentPath}`;

  // Get Markdown file paths
  const mdFiles = await glob(`${fullPath}/**/*.md`);

  // Get data from each posts
  const posts: PostData = {};

  mdFiles.forEach((postPath) => {
    // Get slug
    const slug = path
      .join(`/posts${contentPath}`, postPath.slice(fullPath.length))
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

    const newFront: MarkdownFront = {
      title: front.title || postPath.split("/").slice(-1)[0].replace(".md", ""),
      date: front.date || new Date(fileCreationDate),
      category: front.category || "basic",
      lock: front.lock || false,
    };

    // Front validation
    const categoryList = new Set(["basic", "function", "trouble"]);

    // if (!categoryList.has(front.category)) {
    //   throw new Error(`category error: ${front.category} in file ${postPath}.`);
    // }

    if (!categoryList.has(newFront.category)) {
      console.warn(
        `category warning: ${newFront.category} in file ${postPath}.`,
      );
    }

    posts[slug] = {
      content,
      front: newFront,
    };
  });

  return posts;
};

// debug
// fetchPosts()

export { fetchPosts };
