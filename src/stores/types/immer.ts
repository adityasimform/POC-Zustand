import type { StateCreator } from "zustand";


export type WithImmer<S> = StateCreator<
  S,
  [['zustand/immer', never]],
  [],
  S
>;
