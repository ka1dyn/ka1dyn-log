"use client";

import { useBreadStore, useNavTriggerStore } from "@/stores";
import { useEffect, useMemo, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";
import Link from "next/link";
import { TextAlignJustify } from "lucide-react";

export default function Header() {
  const [crumbSegments, setCrumbSegments] = useState<Array<string>>(["Home"]);
  const crumb = useBreadStore((state) => state.crumb);
  const [screenBreak, setScreenBreak] = useState<string>("sm");
  const navOpen = useNavTriggerStore((state) => state.navOpen);

  useEffect(() => {
    const checkScreen = () => {
      let curWidth = window.innerWidth;
      if (curWidth < 768) {
        setScreenBreak("sm");
      } else if (curWidth < 1280) {
        setScreenBreak("md");
      } else {
        setScreenBreak("xl");
      }
    };

    checkScreen();

    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  useEffect(() => {
    const segments = crumb.split("/").filter((segment) => Boolean(segment));

    setCrumbSegments(["Home", ...segments]);
  }, [crumb]);

  const RenderBreadCrumb = useMemo(() => {
    const crumbLength = crumbSegments.length;

    return crumbSegments.map((segment, idx) => {
      if (screenBreak === "sm") return;

      const finalSegment = idx === crumbLength - 1;

      if (screenBreak === "xl") {
        return (
          <React.Fragment key={idx}>
            <BreadcrumbItem>
              {finalSegment ? (
                <BreadcrumbPage className="text-sm p-2 text-foreground font-semibold">
                  {segment}
                </BreadcrumbPage>
              ) : (
                <BreadcrumbLink className="text-sm p-2 text-muted-foreground hover:text-muted-foreground">
                  {segment}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>

            {!finalSegment && <BreadcrumbSeparator />}
          </React.Fragment>
        );
      }

      const tooMany = crumbLength > 3;
      const skip = tooMany && idx >= 2 && idx <= crumbLength - 3;
      const ellapse = tooMany && idx === 1;

      if (skip) return;

      return (
        <React.Fragment key={idx}>
          <BreadcrumbItem>
            {ellapse ? (
              <BreadcrumbEllipsis className="text-sm p-2 text-muted-foreground hover:text-muted-foreground" />
            ) : finalSegment ? (
              <BreadcrumbPage className="text-sm p-2 text-foreground font-semibold">
                {segment}
              </BreadcrumbPage>
            ) : (
              <BreadcrumbLink className="text-sm p-2 text-muted-foreground hover:text-muted-foreground">
                {segment}
              </BreadcrumbLink>
            )}
          </BreadcrumbItem>

          {!finalSegment && <BreadcrumbSeparator />}
        </React.Fragment>
      );
    });
  }, [crumbSegments, screenBreak]);

  return (
    <header
      className={`sticky top-0 h-20 flex justify-between bg-card py-4 px-8 items-center border-b border-sidebar-borde z-15 shadow-md`}
    >
      <div className="flex gap-10">
        <div className="flex gap-5 items-center">
          <TextAlignJustify
            className="size-5 2xl:hidden cursor-pointer"
            onClick={() => navOpen()}
          />
          <Link
            className="-translate-y-px cursor-pointer font-semibold text-xl"
            href={"/"}
          >
            Dev Library
          </Link>
        </div>

        <Breadcrumb className="flex items-center">
          <BreadcrumbList>{RenderBreadCrumb}</BreadcrumbList>
        </Breadcrumb>
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
