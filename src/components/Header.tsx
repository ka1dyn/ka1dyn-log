"use client";

import { useNavTriggerStore } from "@/stores";

import Link from "next/link";
import { TextAlignJustify } from "lucide-react";
import { useShallow } from "zustand/shallow";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import HeaderNavItem from "./HeaderNavItem";

export default function Header() {
  const { open, navOpen, navClose } = useNavTriggerStore(
    useShallow((state) => ({
      open: state.open,
      navOpen: state.navOpen,
      navClose: state.navClose,
    })),
  );

  return (
    <header
      className={`sticky top-0 h-20 w-full flex justify-between bg-card py-4 px-8 items-center border-b border-sidebar-border z-40 shadow-md overflow-hidden overscroll-none`}
    >
      <div className="flex gap-15">
        <div className="flex gap-5 items-center">
          <TextAlignJustify
            className="size-5 cursor-pointer"
            onClick={() => (open ? navClose() : navOpen())}
          />
          <Link
            className="-translate-y-px cursor-pointer font-semibold text-xl"
            href={"/"}
          >
            Dev Library
          </Link>
        </div>
        <div className="translate-y-px flex items-center">
          <HeaderNavItem path={"/"}>Home</HeaderNavItem>
          <HeaderNavItem path={"/blog/published"}>Posts</HeaderNavItem>
          <HeaderNavItem path={"/daily"}>Daily</HeaderNavItem>
        </div>
      </div>

      <div className="flex gap-8 mr-3">
        {/* <div>Portfolio</div> */}
        <Link href="https://github.com/ka1dyn" target="_blank">
          Github
        </Link>
      </div>
    </header>
  );
}
