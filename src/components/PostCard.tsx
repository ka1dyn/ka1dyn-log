import Link from "next/link";

interface PostCardProps {
  slug: string;
  title: string;
  date: Date;
  category: string;
  lock: boolean;
  description: string;
}

export default function PostCard({
  slug,
  title,
  date,
  category,
  lock,
  description,
}: PostCardProps) {
  return (
    <Link href={`/blog${slug}`}>
      <span>title: {title}</span>
      <span>date: {date.getTime()}</span>
      <span>category: {category}</span>
      <span>description: {description}</span>
    </Link>
  );
}
