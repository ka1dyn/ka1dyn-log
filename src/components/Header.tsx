"use client";

import { useBreadStore } from "@/stores";
import { BookOpen } from "lucide-react";
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
      const tooMany = crumbLength > 4;
      const skip = tooMany && idx >= 3 && idx <= crumbLength - 3;
      const ellapse = tooMany && idx === 2;

      if (skip) return;

      return (
        <React.Fragment key={idx}>
          <BreadcrumbItem>
            {ellapse ? (
              <BreadcrumbEllipsis />
            ) : finalSegment ? (
              <BreadcrumbPage>{segment}</BreadcrumbPage>
            ) : (
              <BreadcrumbLink>{segment}</BreadcrumbLink>
            )}
          </BreadcrumbItem>

          {!finalSegment && <BreadcrumbSeparator />}
        </React.Fragment>
      );
    });
  }, [crumbSegments]);

  return (
    <header
      className={`h-20 flex justify-between bg-card py-4 px-6 items-center`}
      style={{
        boxShadow: "var(--paper-shadow)",
      }}
    >
      <div className="flex gap-4">
        <div className="flex gap-2">
          <BookOpen />
          <div>Dev library</div>
        </div>
        <Breadcrumb>
          <BreadcrumbList>{RenderBreadCrumb}</BreadcrumbList>
        </Breadcrumb>
      </div>

      <div>github</div>
    </header>
  );
}
