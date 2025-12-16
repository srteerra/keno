import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface Props {
  children?: React.ReactNode;
}

interface ChildProps {
  className?: string;
  children?: React.ReactNode;
}

export const PreBlock = ({ children }: Props) => {
  if (!children) return null;

  const child = Array.isArray(children) ? children[0] : children;

  if (!React.isValidElement(child)) return null;

  const childProps = child.props as ChildProps;
  const className = childProps.className ?? "";
  const childrenString =
    typeof childProps.children === "string" ? childProps.children : "";
  const match = /language-(\w+)/.exec(className);
  const lang = match?.[1] ?? "bash";
  const code = childrenString.replace(/\n$/, "");

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
