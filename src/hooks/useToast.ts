import { useToastStore, type ToastType } from "@/stores/toast.store";

const TOAST_DURATION = 3500;

export const useToast = () => {
  const { add, remove } = useToastStore.getState();

  const show = (message: string, type: ToastType) => {
    const id = crypto.randomUUID();
    add({ id, message, type });
    setTimeout(() => remove(id), TOAST_DURATION);
  };

  return {
    success: (message: string) => show(message, "success"),
    error: (message: string) => show(message, "error"),
    info: (message: string) => show(message, "info"),
    warning: (message: string) => show(message, "warning"),
  };
};
