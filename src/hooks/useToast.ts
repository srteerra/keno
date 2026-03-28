import {
  useToastStore,
  type ToastType,
  type ToastPosition,
} from "@/stores/toast.store";

const TOAST_DURATION = 3500;

export const useToast = () => {
  const { add, remove } = useToastStore.getState();

  const show = (message: string, type: ToastType, position?: ToastPosition) => {
    const id = crypto.randomUUID();
    add({ id, message, type, position });
    setTimeout(() => remove(id), TOAST_DURATION);
  };

  return {
    success: (message: string, position?: ToastPosition) =>
      show(message, "success", position),
    error: (message: string, position?: ToastPosition) =>
      show(message, "error", position),
    info: (message: string, position?: ToastPosition) =>
      show(message, "info", position),
    warning: (message: string, position?: ToastPosition) =>
      show(message, "warning", position),
  };
};
