interface MarkdownFront {
  title: string
  date: Date
  category: string
  lock: boolean
}

interface MarkdownData {
  content: string
  front: MarkdownFront
}

interface PostData {
  [key: string]: MarkdownData // Key is slug
}
