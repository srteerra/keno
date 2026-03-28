"use client";
import { useToastStore, type Toast, type ToastVertical, type ToastHorizontal } from "@/stores/toast.store";

type Position = `${ToastVertical}-${ToastHorizontal}`;

interface Props {
  vertical?: ToastVertical;
  horizontal?: ToastHorizontal;
}

const alertClass: Record<Toast["type"], string> = {
  success: "alert-success",
  error: "alert-error",
  info: "alert-info",
  warning: "alert-warning",
};

export const ToastContainer = ({
  vertical: defaultVertical = "bottom",
  horizontal: defaultHorizontal = "center",
}: Props) => {
  const toasts = useToastStore((state) => state.toasts);

  if (toasts.length === 0) return null;

  const groups = toasts.reduce<Record<Position, Toast[]>>((acc, toast) => {
    const v = toast.position?.vertical ?? defaultVertical;
    const h = toast.position?.horizontal ?? defaultHorizontal;
    const key: Position = `${v}-${h}`;
    acc[key] = [...(acc[key] ?? []), toast];
    return acc;
  }, {} as Record<Position, Toast[]>);

  return (
    <>
      {Object.entries(groups).map(([pos, group]) => {
        const [v, h] = pos.split("-");
        return (
          <div key={pos} className={`toast toast-${v} toast-${h} z-50`}>
            {group.map((toast) => (
              <div key={toast.id} className={`alert ${alertClass[toast.type]} text-sm`}>
                <span>{toast.message}</span>
              </div>
            ))}
          </div>
        );
      })}
    </>
  );
};
