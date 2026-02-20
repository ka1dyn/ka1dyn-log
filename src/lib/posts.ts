import postData from "@/generated/posts.json";

const posts = postData as PostData;

let slugs = Object.keys(posts);
const publishedSlugs = slugs.filter((slug) => posts[slug].front.isPublish);

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
  return newPosts;
}

export function getAllSeries() {
  return seriesInfo;
}
