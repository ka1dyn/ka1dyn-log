"use client";

import { useNavTriggerStore } from "@/stores";
import { useShallow } from "zustand/shallow";

export default function Overlay() {
  const { open, navClose } = useNavTriggerStore(
    useShallow((state) => ({
      open: state.open,
      navClose: state.navClose,
    })),
  );

  return (
    open && (
      <div
        className="fixed top-0 left-0 z-50 bg-black/80 2xl:hidden w-screen h-screen"
        onClick={() => navClose()}
      ></div>
    )
  );
}
