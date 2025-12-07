import { FaWandMagicSparkles } from "react-icons/fa6";
import React, { useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { CategoryBadge } from "@/components/tips/category-badge";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { CopyButton } from "@/components/ui/CopyButton";
import { PreBlock } from "@/components/ui/PreBlock";
import { useTipStore } from "@/stores/Tip.store";
import { extractBlockHelper } from "@/lib/helpers/extract-block.helper";

export const Skeleton = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`relative overflow-hidden rounded-[var(--radius-box)] bg-gradient-to-r from-base-300 to-base-200 ${className}`}>
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-base-200 to-transparent"/>
    </div>
  );
};

export const MainContainer = () => {
  const tip = useTipStore(state => state.tip);
  const showExamples = useTipStore(state => state.showExamples);
  const showExamplesToggle = useTipStore(state => state.showExamplesToggle);

  const { lead, mainCode, restMarkdown } = useMemo(() => {
    const raw = tip?.content_markdown ?? "";
    return extractBlockHelper(raw);
  }, [tip?.content_markdown]);

  const examplesCount = tip?.examples?.length ?? 0;

  if (!tip) return (
    <Skeleton className="h-52 w-4/9 mb-3"/>
  );

  console.log(tip);

  return (
    <div className="bg-base-200 p-6 rounded-3xl min-w-4/9 max-w-4/9">
      <div className={'flex gap-3 items-center mb-1'}>
        <FaWandMagicSparkles size={20} color={"white"}/>
        <h2 className="text-lg font-bold">{tip.title}</h2>
      </div>

      <p className="text-white font-light">{tip.description}</p>

      <div className="py-3 px-5 bg-amber-50 rounded-2xl my-6 space-y-3">
        {lead && (
          <p
            className="text-sm text-stone-800 font-bold"
            dangerouslySetInnerHTML={{ __html: lead.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }}
          />
        )}

        {mainCode && (
          <div className="group relative">
            <div className="absolute right-2 top-2 flex items-center gap-2 z-10">
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-stone-900/70 text-white">
                {mainCode.lang ?? "sh"}
              </span>
              <CopyButton text={mainCode.code}/>
            </div>

            <SyntaxHighlighter
              language={mainCode.lang || "bash"}
              style={atomDark}
              customStyle={{
                borderRadius: "12px",
                border: "1px solid #d6d3d1",
                margin: 0,
                backgroundColor: "#282c34"
              }}
              wrapLines
              showLineNumbers={false}
            >
              {mainCode.code}
            </SyntaxHighlighter>
          </div>
        )}

        {restMarkdown && (
          <div className="prose prose-stone max-w-none text-sm [&>*]:text-stone-800 [&_p]:text-stone-800 [&_li]:text-stone-800 [&_strong]:text-stone-900">
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
              {restMarkdown}
            </ReactMarkdown>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <CategoryBadge type={tip.category}/>

          {examplesCount > 0 && (
            <button
              className="btn btn-link no-underline flex items-center gap-2"
              onClick={showExamplesToggle}
            >
              <span className={'text-white'}>
                {examplesCount} example{examplesCount > 1 ? "s" : ""}
              </span>
              {showExamples ? <IoIosArrowUp color={'white'}/> : <IoIosArrowDown color={'white'}/>}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
