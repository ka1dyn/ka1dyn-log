import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export const useNavTriggerStore = create<NavTriggerStore>()(
  immer(
    devtools((set) => ({
      expand: 0,
      collapse: 0,
      triggerExpand: () =>
        set(
          (state) => {
            state.expand += 1;
          },
          undefined,
          "navTrigger/expand",
        ),
      triggerCollapse: () =>
        set(
          (state) => {
            state.collapse += 1;
          },
          undefined,
          "navTrigger/collapse",
        ),
    })),
  ),
);
