"use client";

import { useNavTriggerStore } from "@/stores";
import { ChevronsDownUp, ChevronsUpDown } from "lucide-react";
import { useShallow } from "zustand/shallow";

export default function NavFilter() {
  const { triggerExpand, triggerCollapse } = useNavTriggerStore(
    useShallow((state) => ({
      triggerExpand: state.triggerExpand,
      triggerCollapse: state.triggerCollapse,
    })),
  );

  return (
    <div className="pl-2 flex gap-3 select-none cursor-pointer text-sm text-primary">
      <div
        className={`transition-transform active:scale-90 flex items-center gap-1 relative py-1
          after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-transparent hover:after:bg-accent/50`}
        onClick={() => triggerExpand()}
      >
        <ChevronsUpDown className="w-4 h-4" />
        <div>펼치기</div>
      </div>
      <div
        className={`transition-transform active:scale-90 flex items-center gap-1 relative py-1
          after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-transparent hover:after:bg-accent/50`}
        onClick={() => triggerCollapse()}
      >
        <ChevronsDownUp className="w-4 h-4" />
        <div>접기</div>
      </div>
    </div>
  );
}
