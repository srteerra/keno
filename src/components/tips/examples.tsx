import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import React from "react";
import { CopyButton } from "@/components/ui/CopyButton";
import { PreBlock } from "@/components/ui/PreBlock";
import { useTipStore } from "@/stores/Tip.store";
import { extractBlockHelper } from "@/lib/helpers/extract-block.helper";

export const Examples = () => {
  const tip = useTipStore((state) => state.tip);

  if (!tip) {
    return null;
  }

  return (
    <div className="bg-base-200 mt-4 max-w-4/9 min-w-4/9 space-y-3 rounded-3xl p-6">
      {tip.examples.map((ex, i) => {
        const { lead, mainCode, restMarkdown } = extractBlockHelper(
          ex?.details_markdown
        );

        return (
          <div key={i} className="p-2">
            <h3 className="text-md mb-2">
              {i + 1}. {ex.explanation}
            </h3>

            <div className="my-6 space-y-3 rounded-2xl bg-amber-50 px-5 py-3">
              {lead && (
                <p
                  className="text-sm font-bold text-stone-800"
                  dangerouslySetInnerHTML={{
                    __html: lead
                      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                      .replace(
                        /`([^`]+)`/g,
                        '<kbd class="kbd kbd-sm text-white">$1</kbd>'
                      ),
                  }}
                />
              )}

              {mainCode && (
                <div className="group relative">
                  <div className="absolute top-2 right-2 z-10 flex items-center gap-2">
                    <span className="rounded bg-stone-900/70 px-1.5 py-0.5 text-[10px] text-white">
                      {mainCode.lang ?? "sh"}
                    </span>
                    <CopyButton text={mainCode.code} />
                  </div>

                  <SyntaxHighlighter
                    language={mainCode.lang || "bash"}
                    style={atomDark}
                    customStyle={{
                      borderRadius: "12px",
                      border: "1px solid #d6d3d1",
                      margin: 0,
                      backgroundColor: "#282c34",
                    }}
                    wrapLines
                    showLineNumbers={false}
                  >
                    {mainCode.code}
                  </SyntaxHighlighter>
                </div>
              )}

              {restMarkdown && (
                <div className="prose prose-stone max-w-none text-sm leading-6 [&_li]:text-stone-800 [&_p]:text-stone-800 [&_strong]:text-stone-900 [&>*]:text-stone-800">
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
                    {restMarkdown}
                  </ReactMarkdown>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
