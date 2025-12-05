import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { FaRegCopy } from "react-icons/fa6";

interface Props {
  text: string;
}

export const CopyButton = ({ text }: Props) => {
  const [copied, setCopied] = useState(false);

  if (copied) {
    return (
      <button
        onClick={async () => {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 1200);
        }}
        aria-label="Copiar comando"
        className="btn btn-square btn-ghost rounded-lg hover:text-white"
      >
        <FaCheck/>
      </button>
    );
  }

  return (
    <button
      onClick={async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1200);
      }}
      aria-label="Copiar comando"
      className="btn btn-square btn-ghost rounded-lg hover:text-info"
    >
      <FaRegCopy/>
    </button>
  );
};
