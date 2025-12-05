import { fetchPosts } from "@/lib/fetch"
import { MDXRemote } from "next-mdx-remote-client/rsc"

export async function generateStaticParams() {
  const posts = await fetchPosts()

  const slugs = Object.keys(posts)

  return slugs.map((slug) => {
    const slugPieces = slug
      .replace(".md", "")
      .split("/")
      .filter((el) => Boolean(el))

    return {
      slug: slugPieces,
    }
  })
}

export const dynamicParams = false

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>
}) {
  const { slug } = await params
  const path = `/${slug.join("/")}`

  const posts = await fetchPosts()
  const { content, front } = posts[path]
  const { title, date, category, lock } = front

  console.log(date)

  return (
    <div>
      <div className="bg-blue-500">{title}</div>
      {/* <div>date: {date}</div> */}
      <div>category: {category}</div>
      <div>lock: {lock}</div>

      {/* <p>content: {content}</p> */}
      <div className="prose">
        <MDXRemote source={content} />
      </div>
    </div>
  )
}
