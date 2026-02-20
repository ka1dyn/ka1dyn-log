import { fetchPosts, publishedPosts } from "./fetch";
import { writeFileSync, existsSync, mkdirSync } from "fs";
import path from "path";

const dir = path.join(process.cwd(), "src/generated");
const filePath = path.join(dir, "posts.json");

if (!existsSync(dir)) {
  mkdirSync(dir, { recursive: true });
}

const data = await fetchPosts("/blog");
writeFileSync(filePath, JSON.stringify(data, null, 2));

console.log("✅ 파일 저장 완료!");
