import { useTipStore } from "@/stores/Tip.store";
import { Category } from "@/types/category";

export const useTips = () => {
  const setTip = useTipStore((state) => state.setTip);
  const clearTip = useTipStore((state) => state.clearTip);

  const getTip = async (category?: Category) => {
    try {
      clearTip();

      const res = await fetch(`/api/tips`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to get tips");
      }

      const data = await res.json();
      setTip(data);

      return data.tips;
    } catch (error) {
      throw error;
    } finally {
    }
  };

  return {
    getTip,
    clearTip,
  };
};
