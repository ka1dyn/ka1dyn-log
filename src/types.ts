interface MarkdownFront {
  title: string;
  date: Date;
  category: string;
  lock: boolean;
  isPublish: boolean;
}

interface MarkdownData {
  content: string;
  front: MarkdownFront;
}

interface PostData {
  [key: string]: MarkdownData; // Key is slug
}

interface TreeObj {
  name: string;
  count: number;
  children: Record<string, TreeObj>;
  isLeaf: boolean;
  path?: string;
}
