"use client";

import { useBreadStore } from "@/stores";
import { useEffect } from "react";

interface BreadCrumbUpdater {
  path: string;
}

export default function BreadCrumbUpdater({ path }: BreadCrumbUpdater) {
  const setCrumb = useBreadStore((state) => state.setCrumb);

  useEffect(() => {
    setCrumb(path);
  }, []);

  return <></>;
}
