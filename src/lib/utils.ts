import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function dateFormat(date: Date) {
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export const getTocData = (source: string) => {
  const headings = source.split("\n").filter((str) => str.match(/^#+/));

  const orderCntArr = [0, 0, 0, 0];

  return headings.map((str) => {
    const match = str.match(/^#+/) as RegExpMatchArray;

    const depth = match[0].length || 0;
    orderCntArr[depth] += 1;
    const headingText = str.replace(/^#+/, "").trim();

    let orderTxt = "";
    if (depth === 1) {
      orderCntArr[2] = 0;
      orderCntArr[3] = 0;
      orderTxt = `${orderCntArr[1]}. `;
    } else if (depth === 2) {
      orderCntArr[3] = 0;
      orderTxt = `${orderCntArr[1]}.${orderCntArr[2]}. `;
    } else if (depth === 3) {
      orderTxt = `${orderCntArr[1]}.${orderCntArr[2]}.${orderCntArr[3]}. `;
    }

    return { orderTxt: orderTxt, depth: depth, text: headingText };
  });
};

export const generateTree = (posts: PostData) => {
  const tree: TreeObj = {
    name: "root",
    count: 0,
    children: {},
    isLeaf: false,
  };

  let slugs = Object.keys(posts);

  slugs.forEach((slug) => {
    const segments = slug.split("/").filter((segment) => Boolean(segment));

    let curObj = tree;
    curObj.count += 1;

    segments.forEach((segment, idx) => {
      if (!curObj.children[segment]) {
        curObj.children[segment] = {
          name: segment,
          count: 0,
          children: {},
          isLeaf: false,
        };
      }

      if (idx === segments.length - 1) {
        curObj.children[segment].isLeaf = true;
        curObj.children[segment].path = slug;
        curObj.children[segment].createdDate = posts[slug].front.date;
        curObj.children[segment].isPublish = posts[slug].front.isPublish;
      }

      curObj.children[segment].count += 1;
      curObj = curObj.children[segment];
    });
  });

  return tree;
};

export const replaceSrc = (src: string) => {
  let publicSrc = src;
  if (src.startsWith("images/")) {
    publicSrc = `/content-${src}`;
  } else if (src.includes("images/")) {
    const fileName = src.split("images/").pop();
    publicSrc = `/content-images/${fileName}`;
  }

  return publicSrc;
};
