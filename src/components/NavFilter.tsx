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
    <div className="pl-1 flex items-center justify-between text-sm text-primary">
      <div className="text-sm text-foreground font-medium">공부 서랍</div>
      <div className="flex items-center gap-2 text-xs">
        <div
          className={`transition-transform active:scale-90 flex items-center gap-1 relative py-1 cursor-pointer`}
          onClick={() => triggerExpand()}
        >
          <ChevronsUpDown className="w-4 h-4" />
          <div>펼치기</div>
        </div>
        <div
          className={`transition-transform active:scale-90 flex items-center gap-1 relative py-1 cursor-pointer`}
          onClick={() => triggerCollapse()}
        >
          <ChevronsDownUp className="w-4 h-4" />
          <div>접기</div>
        </div>
      </div>
    </div>
  );
}
