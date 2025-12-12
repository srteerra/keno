import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface Props {
  children: React.ReactNode;
}

export const PreBlock = ({ children }: Props) => {
  const child = Array.isArray(children) ? children[0] : children;
  const className = child?.props?.className || "";
  const match = /language-(\w+)/.exec(className);
  const lang = match?.[1] || "bash";
  const code = String(child?.props?.children || "").replace(/\n$/, "");
  return (
    <SyntaxHighlighter
      language={lang}
      style={oneDark}
      customStyle={{
        borderRadius: "12px",
        border: "1px solid #d6d3d1",
        margin: "15px 0",
      }}
      wrapLines
    >
      {code}
    </SyntaxHighlighter>
  );
};
