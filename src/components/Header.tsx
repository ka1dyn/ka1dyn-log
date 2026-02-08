"use client";

import { useBreadStore } from "@/stores";
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

export default function Header() {
  const [crumbSegments, setCrumbSegments] = useState<Array<string>>(["Home"]);
  const crumb = useBreadStore((state) => state.crumb);

  useEffect(() => {
    const segments = crumb.split("/").filter((segment) => Boolean(segment));

    setCrumbSegments(["Home", ...segments]);
  }, [crumb]);

  const RenderBreadCrumb = useMemo(() => {
    const crumbLength = crumbSegments.length;

    console.log(crumbSegments);

    return crumbSegments.map((segment, idx) => {
      const finalSegment = idx === crumbLength - 1;
      const tooMany = crumbLength > 3;
      const skip = tooMany && idx >= 2 && idx <= crumbLength - 3;
      const ellapse = tooMany && idx === 1;

      if (skip) return;

      return (
        <React.Fragment key={idx}>
          <BreadcrumbItem>
            {ellapse ? (
              <BreadcrumbEllipsis className="text-sm p-2 text-primary hover:text-primary" />
            ) : finalSegment ? (
              <BreadcrumbPage className="text-sm p-2 text-foreground font-semibold">
                {segment}
              </BreadcrumbPage>
            ) : (
              <BreadcrumbLink className="text-sm p-2 text-primary hover:text-primary">
                {segment}
              </BreadcrumbLink>
            )}
          </BreadcrumbItem>

          {!finalSegment && <BreadcrumbSeparator />}
        </React.Fragment>
      );
    });
  }, [crumbSegments]);

  return (
    <header
      className={`sticky top-0 h-20 flex justify-between bg-card py-4 px-8 items-center border-b border-sidebar-border`}
    >
      <div className="flex gap-10">
        <Link
          className="flex gap-3 items-center -translate-y-px cursor-pointer"
          href={"/"}
        >
          <div className="font-semibold text-xl">Dev Library</div>
        </Link>
        <Breadcrumb className="flex items-center">
          <BreadcrumbList>{RenderBreadCrumb}</BreadcrumbList>
        </Breadcrumb>
      </div>

      <div>github</div>
    </header>
  );
}
