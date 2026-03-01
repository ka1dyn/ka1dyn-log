export const BreakPointQuery = {
  SM: "(min-width: 40rem)", // 640px
  MD: "(min-width: 48rem)", // 768px
  LG: "(min-width: 64rem)", // 1024px
  XL: "(min-width: 80rem)", // 1280px
  XL2: "(min-width: 96rem)", //1536px
} as const;

export type BreakPointQuery =
  (typeof BreakPointQuery)[keyof typeof BreakPointQuery];
