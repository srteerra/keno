"use client";
import { useToastStore, type Toast } from "@/stores/toast.store";

const alertClass: Record<Toast["type"], string> = {
  success: "alert-success",
  error: "alert-error",
  info: "alert-info",
  warning: "alert-warning",
};

export const ToastContainer = () => {
  const toasts = useToastStore((state) => state.toasts);

  if (toasts.length === 0) return null;

  return (
    <div className="toast toast-bottom toast-center z-50">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`alert ${alertClass[toast.type]} text-sm`}
        >
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  );
};
