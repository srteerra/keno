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
import { Category } from "@/types/category";
import StartAI from "@/assets/svg/star-ai.svg";
import Image from "next/image";

export const Skeleton = ({ className = "" }: { className?: string }) => {
  return (
    <div
      className={`skeleton relative flex h-32 overflow-hidden ${className}`}
    ></div>
  );
};

export const MainContainer = () => {
  const tip = useTipStore((state) => state.tip);
  const showExamples = useTipStore((state) => state.showExamples);
  const showExamplesToggle = useTipStore((state) => state.showExamplesToggle);

  const { lead, mainCode, restMarkdown } = useMemo(() => {
    const raw = tip?.content_markdown ?? "";
    return extractBlockHelper(raw);
  }, [tip?.content_markdown]);

  const examplesCount = tip?.examples?.length ?? 0;

  if (!tip) return <Skeleton className="mb-3 h-52 w-4/9" />;

  return (
    <div className="bg-base-200 max-w-4/9 min-w-4/9 rounded-3xl p-6">
      <div className={"mb-1 flex items-center gap-3"}>
        <Image src={StartAI} alt="Logo" width={24} height={24} />
        <h2 className="text-lg font-bold">{tip.title}</h2>
      </div>

      <p className="font-light text-white">{tip.description}</p>

      <div className="my-6 space-y-3 rounded-2xl bg-amber-50 px-5 py-3">
        {lead && (
          <p
            className="text-sm font-bold text-stone-800"
            dangerouslySetInnerHTML={{
              __html: lead
                .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                .replace(/`([^`]+)`/g, '<kbd class="kbd kbd-sm text-white">$1</kbd>'),
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

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <CategoryBadge type={tip.category as Category} />
        </div>

        {examplesCount > 0 && (
          <button
            className="btn btn-link flex items-center gap-2 no-underline"
            onClick={showExamplesToggle}
          >
            <span className={"text-white"}>
              {examplesCount} example{examplesCount > 1 ? "s" : ""}
            </span>
            {showExamples ? (
              <IoIosArrowUp color={"white"} />
            ) : (
              <IoIosArrowDown color={"white"} />
            )}
          </button>
        )}
      </div>
    </div>
  );
};
