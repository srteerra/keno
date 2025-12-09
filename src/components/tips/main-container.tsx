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
import { Category } from "@/types/category";

export const Skeleton = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`relative overflow-hidden rounded-5 bg-gradient-to-br from-base-300/90 via-base-200 to-base-300/70 ${className}`}>
      <div className="absolute inset-0 p-6 space-y-3">
        <div className="flex items-center gap-2 opacity-0 animate-code-line-1">
          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary/60 to-secondary/60" />
          <div className="h-2 rounded-full bg-gradient-to-r from-primary/40 to-transparent animate-expand-1" style={{width: '65%'}} />
        </div>

        <div className="flex items-center gap-2 opacity-0 animate-code-line-2 ml-6">
          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-accent/60 to-primary/60" />
          <div className="h-2 rounded-full bg-gradient-to-r from-accent/40 to-transparent animate-expand-2" style={{width: '35%'}} />
        </div>

        <div className="flex items-center gap-2 opacity-0 animate-code-line-3 ml-6">
          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-secondary/60 to-accent/60" />
          <div className="h-2 rounded-full bg-gradient-to-r from-secondary/40 to-transparent animate-expand-3" style={{width: '50%'}} />
        </div>

        <div className="flex items-center gap-2 opacity-0 animate-code-line-4">
          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary/60 to-secondary/60" />
          <div className="h-2 rounded-full bg-gradient-to-r from-primary/40 to-transparent animate-expand-4" style={{width: '70%'}} />
        </div>

        <div className="flex items-center gap-2 opacity-0 animate-code-line-5 ml-12">
          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-accent/60 to-primary/60" />
          <div className="h-2 rounded-full bg-gradient-to-r from-accent/40 to-transparent animate-expand-5" style={{width: '30%'}} />
        </div>

        <div className="flex items-center gap-2 opacity-0 animate-code-line-6 ml-6">
          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-secondary/60 to-accent/60" />
          <div className="h-2 rounded-full bg-gradient-to-r from-secondary/40 to-transparent animate-expand-6" style={{width: '45%'}} />
        </div>

        <div className="flex items-center gap-2 opacity-0 animate-code-line-7">
          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary/60 to-secondary/60" />
          <div className="h-2 rounded-full bg-gradient-to-r from-primary/40 to-transparent animate-expand-7" style={{width: '60%'}} />
        </div>

        <div className="flex items-center gap-2 opacity-0 animate-code-line-8 ml-6">
          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-accent/60 to-primary/60" />
          <div className="h-2 rounded-full bg-gradient-to-r from-accent/40 to-transparent animate-expand-8" style={{width: '40%'}} />
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer-slow" />

      <style jsx>{`
        @keyframes fadeInLine {
          0% { opacity: 0; transform: translateX(-10px); }
          20% { opacity: 0.7; }
          100% { opacity: 0.7; transform: translateX(0); }
        }
        
        @keyframes expandLine {
          0% { width: 0%; }
          50% { width: var(50%); }
          100% { width: var(100%); }
        }
        
        @keyframes shimmerSlow {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .animate-code-line-1 { animation: fadeInLine 0.6s ease-out 0.1s forwards; }
        .animate-code-line-2 { animation: fadeInLine 0.6s ease-out 0.3s forwards; }
        .animate-code-line-3 { animation: fadeInLine 0.6s ease-out 0.5s forwards; }
        .animate-code-line-4 { animation: fadeInLine 0.6s ease-out 0.7s forwards; }
        .animate-code-line-5 { animation: fadeInLine 0.6s ease-out 0.9s forwards; }
        .animate-code-line-6 { animation: fadeInLine 0.6s ease-out 1.1s forwards; }
        .animate-code-line-7 { animation: fadeInLine 0.6s ease-out 1.3s forwards; }
        .animate-code-line-8 { animation: fadeInLine 0.6s ease-out 1.5s forwards; }
        
        .animate-expand-1 { animation: expandLine 0.8s ease-out 0.2s forwards; --target-width: 65%; }
        .animate-expand-2 { animation: expandLine 0.6s ease-out 0.4s forwards; --target-width: 35%; }
        .animate-expand-3 { animation: expandLine 0.7s ease-out 0.6s forwards; --target-width: 50%; }
        .animate-expand-4 { animation: expandLine 0.9s ease-out 0.8s forwards; --target-width: 70%; }
        .animate-expand-5 { animation: expandLine 0.5s ease-out 1.0s forwards; --target-width: 30%; }
        .animate-expand-6 { animation: expandLine 0.7s ease-out 1.2s forwards; --target-width: 45%; }
        .animate-expand-7 { animation: expandLine 0.8s ease-out 1.4s forwards; --target-width: 60%; }
        .animate-expand-8 { animation: expandLine 0.6s ease-out 1.6s forwards; --target-width: 40%; }
        
        .animate-shimmer-slow {
          animation: shimmerSlow 3s ease-in-out infinite;
        }
      `}</style>
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
          <CategoryBadge type={tip.category as Category}/>

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
