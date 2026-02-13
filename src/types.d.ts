interface MarkdownFront {
  title: string;
  date: Date;
  category: string;
  lock: boolean;
  isPublish: boolean;
  description: string;
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
  createdDate?: Date;
  isPublish?: boolean;
}

// Store types
type NavTriggerStore = {
  expand: number;
  collapse: number;
  isPublish: boolean;
  triggerExpand: () => void;
  triggerCollapse: () => void;
  changePublish: (newState: boolean) => void;
};

type BreadStore = {
  crumb: string;
  setCrumb: (newPath: string) => void;
};
