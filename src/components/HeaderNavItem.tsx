"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function HeaderNavItem({
  path,
  children,
}: {
  path: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <Link
      className={cn(
        "cursor-pointer p-1 mx-4 font-semibold text-sm",
        pathname === path
          ? "text-foreground font-semibold border-b border-foreground"
          : "text-muted-foreground font-medium",
      )}
      href={path}
    >
      {children}
    </Link>
  );
}
