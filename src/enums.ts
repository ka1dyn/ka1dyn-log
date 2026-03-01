export const BreakPointQuery = {
  SM: "(max-width: 40rem)", // 640px
  MD: "(max-width: 48rem)", // 768px
  LG: "(max-width: 64rem)", // 1024px
  XL: "(max-width: 80rem)", // 1280px
  XL2: "(max-width: 96rem)", //1536px
} as const;

export type BreakPointQuery =
  (typeof BreakPointQuery)[keyof typeof BreakPointQuery];
