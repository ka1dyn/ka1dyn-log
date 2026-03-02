import postData from "@/generated/posts.json";

const compareDate = (a: string, b: string) => {
  const createdA = posts[a].front.date
    ? new Date(posts[a].front.date).getTime()
    : 0;
  const createdB = posts[b].front.date
    ? new Date(posts[b].front.date).getTime()
    : 0;

  return createdB - createdA;
};

const posts = postData as PostData;

let slugs = Object.keys(posts);
const publishedSlugs = slugs
  .filter((slug) => posts[slug].front.isPublish)
  .sort(compareDate);

// Get PublishedPosts
const newPosts: PostData = {};

publishedSlugs.forEach((slug) => {
  newPosts[slug] = posts[slug];
});

// Get series
const seriesInfo: { [key: string]: number } = {
  전체: 0,
};

publishedSlugs.forEach((slug) => {
  const seriesList = posts[slug].front.series;

  seriesInfo["전체"] += 1;

  seriesList.forEach((series) => {
    if (series in seriesInfo) {
      seriesInfo[series] += 1;
    } else {
      seriesInfo[series] = 1;
    }
  });
});

export function getPosts() {
  return posts;
}

export function getPublishedPosts() {
  return { published: newPosts, sortedSlugs: publishedSlugs };
}

export function getAllSeries() {
  return seriesInfo;
}
