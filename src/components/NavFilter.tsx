"use client";

import { useNavTriggerStore } from "@/stores";
import { ChevronsDownUp, ChevronsUpDown } from "lucide-react";
import { useShallow } from "zustand/shallow";

export default function NavFilter() {
  const { triggerExpand, triggerCollapse, changePublish } = useNavTriggerStore(
    useShallow((state) => ({
      triggerExpand: state.triggerExpand,
      triggerCollapse: state.triggerCollapse,
      changePublish: state.changePublish,
    })),
  );

  return (
    <div className="pl-1 flex items-center justify-between text-sm text-primary">
      <div className="flex gap-4">
        <div
          className="text-sm text-foreground font-semibold"
          onClick={() => changePublish(true)}
        >
          출판글
        </div>
        <div
          className="text-sm text-primary font-medium"
          onClick={() => changePublish(false)}
        >
          개인 서랍
        </div>
      </div>

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
