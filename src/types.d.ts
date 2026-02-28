interface MarkdownFront {
  title: string;
  date: string;
  category: string;
  lock: boolean;
  isPublish: boolean;
  description: string;
  series: Array<string>;
  thumbnail: string;
  recommended?: boolean;
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
  createdDate?: string;
  isPublish?: boolean;
}

// Store types
type NavTriggerStore = {
  expand: number;
  collapse: number;
  isPublish: boolean;
  open: boolean;
  triggerExpand: () => void;
  triggerCollapse: () => void;
  changePublish: (newState: boolean) => void;
  navOpen: () => void;
  navClose: () => void;
};

type BreadStore = {
  crumb: string;
  setCrumb: (newPath: string) => void;
};
