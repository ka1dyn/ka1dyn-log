import fs from "fs";
import path from "path";

const srcDir = path.join(process.cwd(), "contents/images");
const destDir = path.join(process.cwd(), "public/content-images"); // 복사될 목적지

function copyRecursiveSync(src, dest) {
  if (!fs.existsSync(src)) {
    console.warn(`There is no original images folder: ${src}`);
    return;
  }

  // If there is no dest folder, creat folder
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();

  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest);
    }
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(
        path.join(src, childItemName),
        path.join(dest, childItemName),
      );
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

console.log("🚀 Image copy start!!");
copyRecursiveSync(srcDir, destDir);
console.log("✅ Image copy complete");
