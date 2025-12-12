import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import React from "react";
import { CopyButton } from "@/components/ui/CopyButton";
import { PreBlock } from "@/components/ui/PreBlock";
import { useTipStore } from "@/stores/Tip.store";

export const Examples = () => {
  const tip = useTipStore((state) => state.tip);

  if (!tip) {
    return null;
  }

  return (
    <div className="bg-base-200 mt-4 max-w-4/9 min-w-4/9 space-y-3 rounded-3xl p-6">
      {tip.examples.map((ex, i) => {
        const m = ex.details_markdown.match(/```(\w+)?\n([\s\S]*?)```/m);
        const exLang = m?.[1] || "bash";
        const exCode = m?.[2]?.trimEnd();
        const rest = ex.details_markdown.replace(m?.[0] || "", "").trim();

        return (
          <div key={i} className="p-3">
            <p className="mb-2 text-sm">
              {i + 1}. {ex.explanation}
            </p>

            {exCode ? (
              <div className="group relative">
                <div className="absolute top-2 right-2 opacity-0 transition-opacity group-hover:opacity-100">
                  <CopyButton text={exCode} />
                </div>
                <SyntaxHighlighter
                  language={exLang}
                  style={oneDark}
                  customStyle={{
                    borderRadius: "12px",
                    border: "1px solid #d6d3d1",
                    margin: 0,
                  }}
                  wrapLines
                >
                  {exCode}
                </SyntaxHighlighter>
              </div>
            ) : null}
            {rest && (
              <div className="prose prose-stone mt-2 max-w-none text-sm">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    pre: (props: any) => <PreBlock {...props} />,
                    code: (props: any) => {
                      const { inline, className, children, ...rest } = props;
                      if (inline && tip.category === "editor") {
                        return (
                          <kbd
                            className="kbd bg-stone-800 text-white"
                            {...rest}
                          >
                            {children}
                          </kbd>
                        );
                      }
                      if (inline) {
                        return (
                          <code
                            className="rounded bg-stone-200 px-1.5 py-0.5 text-stone-800"
                            {...rest}
                          >
                            {children}
                          </code>
                        );
                      }
                      return (
                        <code
                          className={`${className} bg-stone-800 text-white`}
                          {...rest}
                        >
                          {children}
                        </code>
                      );
                    },
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
