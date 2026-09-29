import {
  Check,
  Wand2,
} from "lucide-react";
import { useAnalysisStore } from "../../store/analysisStore";
import { applySuggestedFix } from "../../services/applyFixService";
export default function AISuggestionPanel() {

  const { aiFix, currentCode, currentFile, isGeneratingFix, selectedIssue } = useAnalysisStore();
  const suggestedCode = useAnalysisStore(state => state.suggestedCode);
  return (
    <aside className="flex h-full flex-col bg-[#0F0F11]">

      {/* Header */}

      <div className="border-b border-zinc-800 px-4 py-3">

        <h2 className="text-lg font-semibold">
          {aiFix?.title ?? "AI Suggestion"}
        </h2>

      </div>

      {/* Content */}

      <div className="flex-1 overflow-y-auto space-y-6 px-4 py-4">
        {selectedIssue && (
          <div className="mb-3 rounded-lg border border-violet-700 bg-violet-950/20 p-3">

            <div className="text-xs text-violet-300">

              {selectedIssue.rule}

            </div>

            <div className="mt-1 text-sm">

              {selectedIssue.message}

            </div>

            <div className="mt-1 text-xs text-zinc-400">

              Line {selectedIssue.line}

            </div>

          </div>
        )}
        {/* Current Code */}

        <section>

          <div className="mb-2 flex items-center justify-between">

            <h3 className="text-sm font-semibold">
              Current Code
            </h3>

            <span className="text-xs text-zinc-500">
              {aiFix?.blockName
                ? `${aiFix.blockType}: ${aiFix.blockName}`
                : "No issue selected"}
            </span>

          </div>

          <pre className="h-64 overflow-auto rounded-xl border border-zinc-800 bg-[#18181B] p-4 text-sm leading-6 text-zinc-300">
            {
              currentCode || "Click AI Fix to generate a suggestion."
            }
          </pre>

        </section>
        {aiFix?.explanation && (
          <div className="mb-4 rounded-xl border border-zinc-800 bg-[#18181B] p-3">
            <h3 className="mb-2 text-sm font-semibold">
              Explanation
            </h3>

            <p className="text-sm text-zinc-300">
              {aiFix.explanation}
            </p>
          </div>
        )}
        {/* Suggested Fix */}

        <section>

          <div className="mb-2 flex items-center justify-between">

            <h3 className="text-sm font-semibold text-emerald-400">
              Suggested Fix
            </h3>

            <span className="text-xs text-emerald-400">
              AI Generated
            </span>

          </div>

          <pre className="h-64 overflow-auto rounded-xl border border-emerald-700 bg-emerald-950/20 p-4 text-sm leading-6 text-zinc-200">
            {
              suggestedCode || "Suggested code will appear here."
            }
          </pre>

        </section>

      </div>

      {/* Footer */}

      {/* <div className="space-y-3 border-t border-zinc-800 p-4">

        <button onClick={applySuggestedFix}
          disabled={!suggestedCode}
          className={`flex w-full items-center justify-center gap-2 rounded-xl py-3 font-semibold transition
        ${suggestedCode
              ? "bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700"
              : "cursor-not-allowed bg-zinc-800 text-zinc-500"
            }
    `}
        >
          <Check size={18} />
          Apply Suggested Fix
        </button>

        <button disabled className="flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-[#18181B] py-3 font-medium transition hover:border-violet-500 hover:bg-zinc-800">
          <Wand2 size={18} /> Generate Suggestions for Entire Project
          <span className="rounded-md bg-zinc-800 px-2 py-0.5 text-[10px] uppercase tracking-wide text-white">
            V2
          </span>
        </button>

      </div> */}
      <div className="space-y-3 border-t border-zinc-800 p-3 sm:p-4">

  {/* Apply Fix Button */}
  <button
    onClick={applySuggestedFix}
    disabled={!suggestedCode}
    className={`flex w-full items-center justify-center gap-2 rounded-xl py-2.5 sm:py-3 text-sm sm:text-base font-semibold transition
    ${
      suggestedCode
        ? "bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700"
        : "cursor-not-allowed bg-zinc-800 text-zinc-500"
    }`}
  >
    <Check size={16} className="sm:size-[18px]" />
    <span className="truncate">Apply Suggested Fix</span>
  </button>

  {/* V2 Button */}
  <button
    disabled
    className="flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-[#18181B] py-2.5 sm:py-3 text-sm sm:text-base font-medium transition hover:border-violet-500 hover:bg-zinc-800"
  >
    <Wand2 size={16} className="sm:size-[18px]" />

    <span className="truncate">
      Generate Suggestions
      <span className="hidden sm:inline"> for Entire Project</span>
    </span>

    <span className="rounded-md bg-zinc-800 px-1.5 sm:px-2 py-0.5 text-[9px] sm:text-[10px] uppercase tracking-wide text-white">
      V2
    </span>
  </button>

</div>

    </aside>
  );
}