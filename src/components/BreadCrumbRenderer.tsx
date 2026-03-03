"use client";

import React, { useEffect, useMemo, useState } from "react";

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useBreadStore } from "@/stores";

export default function BreadCrumbRenderer() {
  const [crumbSegments, setCrumbSegments] = useState<Array<string>>(["Root"]);
  const [screenBreak, setScreenBreak] = useState<string>("sm");
  const crumb = useBreadStore((state) => state.crumb);

  useEffect(() => {
    const segments = crumb.split("/").filter((segment) => Boolean(segment));

    setCrumbSegments(["Root", ...segments]);
  }, [crumb]);

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
    <Breadcrumb className="flex items-center">
      <BreadcrumbList>{RenderBreadCrumb}</BreadcrumbList>
    </Breadcrumb>
  );
}
