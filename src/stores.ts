import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export const useNavTriggerStore = create<NavTriggerStore>()(
  immer(
    devtools((set) => ({
      isPublish: true,
      open: false,
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
      changePublish: (newState: boolean) =>
        set((state) => {
          state.isPublish = newState;
        }),
      navOpen: () =>
        set((state) => {
          state.open = true;
        }),
      navClose: () =>
        set((state) => {
          state.open = false;
        }),
    })),
  ),
);

export const useBreadStore = create<BreadStore>()(
  immer(
    devtools((set) => ({
      crumb: "",
      setCrumb: (newPath: string) => {
        set((state) => {
          state.crumb = newPath;
        });
      },
    })),
  ),
);
