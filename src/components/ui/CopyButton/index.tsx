import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { FaRegCopy } from "react-icons/fa6";
import { useToast } from "@/hooks/useToast";

interface Props {
  text: string;
}

export const CopyButton = ({ text }: Props) => {
  const [copied, setCopied] = useState(false);
  const toast = useToast();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    toast.success("Copied!");
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  if (copied) {
    return (
      <button
        onClick={handleCopy}
        aria-label="Copiar comando"
        className="btn btn-square btn-ghost rounded-lg hover:text-white"
      >
        <FaCheck />
      </button>
    );
  }

  return (
    <button
      onClick={handleCopy}
      aria-label="Copiar comando"
      className="btn btn-square btn-ghost hover:text-info rounded-lg"
    >
      <FaRegCopy />
    </button>
  );
};
