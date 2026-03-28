import { create } from "zustand";

export type ToastType = "success" | "error" | "info" | "warning";
export type ToastVertical = "top" | "middle" | "bottom";
export type ToastHorizontal = "start" | "center" | "end";

export interface ToastPosition {
  vertical?: ToastVertical;
  horizontal?: ToastHorizontal;
}

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  position?: ToastPosition;
}

interface ToastState {
  toasts: Toast[];
  add: (toast: Toast) => void;
  remove: (id: string) => void;
}

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  add: (toast) => set((state) => ({ toasts: [...state.toasts, toast] })),
  remove: (id) =>
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}));
