import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { FaRegCopy } from "react-icons/fa6";
import toast from 'react-hot-toast';

interface Props {
  text: string;
}

export const CopyButton = ({ text }: Props) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);

    toast.success('Copied!', {
      position: 'bottom-center',
    });

    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  if (copied) {
    return (
      <button
        onClick={handleCopy}
        aria-label="Copiar comando"
        className="btn btn-square btn-ghost rounded-lg hover:text-white"
      >
        <FaCheck/>
      </button>
    );
  }

  return (
    <button
      onClick={handleCopy}
      aria-label="Copiar comando"
      className="btn btn-square btn-ghost rounded-lg hover:text-info"
    >
      <FaRegCopy/>
    </button>
  );
};
