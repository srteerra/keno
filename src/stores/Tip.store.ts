import { create } from "zustand";
import { Tip } from "@/types/tip";

interface TipState {
  tip: Tip | null;
  showExamples: boolean;
}

interface TipActions {
  setTip: (tip: Tip) => void;
  clearTip: () => void;

  showExamplesToggle: () => void;
}

export const useTipStore = create<TipState & TipActions>((set, getState) => ({
  tip: null,
  setTip: (tip) => set({ tip }),
  clearTip: () => set({ tip: null }),

  showExamples: false,
  showExamplesToggle: () => set({ showExamples: !getState().showExamples }),
}));
