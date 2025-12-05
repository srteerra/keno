import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import React from "react";
import { CopyButton } from "@/components/ui/CopyButton";
import { PreBlock } from "@/components/ui/PreBlock";
import { useTipStore } from "@/stores/Tip.store";

export const Examples = () => {
  const tip = useTipStore(state => state.tip);

  if (!tip) {
    return null;
  }

  return (
    <div className="p-6 rounded-3xl bg-base-200 min-w-4/9 max-w-4/9 mt-4 space-y-3">
      {tip.examples.map((ex, i) => {
        const m = ex.details_markdown.match(/```(\w+)?\n([\s\S]*?)```/m);
        const exLang = m?.[1] || "bash";
        const exCode = m?.[2]?.trimEnd();
        const rest = ex.details_markdown.replace(m?.[0] || "", "").trim();

        return (
          <div key={i} className="p-3">
            <p className="text-sm mb-2">{i + 1}. {ex.explanation}</p>

            {exCode ? (
              <div className="group relative">
                <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <CopyButton text={exCode}/>
                </div>
                <SyntaxHighlighter
                  language={exLang}
                  style={oneDark}
                  customStyle={{ borderRadius: "12px", border: "1px solid #d6d3d1", margin: 0 }}
                  wrapLines
                >
                  {exCode}
                </SyntaxHighlighter>
              </div>
            ) : null}
            {rest && (
              <div className="prose prose-stone max-w-none mt-2 text-sm">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    pre: (props: any) => <PreBlock {...props} />,
                    code: (props: any) => {
                      const { inline, className, children, ...rest } = props;
                      if (inline && tip.category === "editor") {
                        return (
                          <kbd className="kbd text-white" {...rest}>
                            {children}
                          </kbd>
                        );
                      }
                      if (inline) {
                        return (
                          <code className="px-1.5 py-0.5 rounded bg-stone-200 text-stone-800" {...rest}>
                            {children}
                          </code>
                        );
                      }
                      return <code className={className} {...rest}>{children}</code>;
                    }
                  }}
                >
                  {rest}
                </ReactMarkdown>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
