import path from "path"
import { readFileSync } from "fs"
import matter from "gray-matter"
import { glob } from "glob"

const fetchPosts = async () => {
  const projectPath = process.cwd()
  const contentPath = `${path.dirname(projectPath)}/contents/kaidyn/publish`

  // Get Markdown file paths
  const mdFiles = await glob(`${contentPath}/**/*.md`)

  // Get data from each posts
  const posts: PostData = {}

  mdFiles.forEach((postPath) => {
    // Get slug
    const slug = path
      .join("/posts", postPath.slice(contentPath.length))
      .replace(".md", "")

    // Parsing files
    const file = readFileSync(postPath, { encoding: "utf-8" })
    const { content, data } = matter(file)
    const front = data as MarkdownFront

    // Front validation
    const categoryList = new Set(["memo", "study", "function", "trouble"])
    if (!categoryList.has(front.category)) {
      throw new Error(`category error: ${front.category} in file ${postPath}.`)
    }

    posts[slug] = {
      content,
      front,
    }
  })

  return posts
}

// debug
// fetchPosts()

export { fetchPosts }
