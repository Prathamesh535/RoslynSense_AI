import {
  X,
  Sparkles,
  Clock3,
  Coins,
  FolderGit2,
  FileCode2,
  Bug,
  Play,
} from "lucide-react";

export default function GenerateSuggestionsModal({
  isOpen,
  onClose,
  onGenerate,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-6">

      <div className="w-full max-w-2xl overflow-hidden rounded-3xl border border-zinc-800 bg-[#111113] shadow-2xl">

        {/* Header */}

        <div className="flex items-start justify-between border-b border-zinc-800 bg-gradient-to-r from-violet-600/10 via-transparent to-cyan-500/10 px-8 py-7">

          <div>

            <div className="flex items-center gap-3">

              <div className="rounded-xl bg-violet-600/20 p-3">

                <Sparkles className="text-violet-400" size={24} />

              </div>

              <div>

                <h2 className="text-2xl font-bold">
                  Generate AI Suggestions
                </h2>

                <p className="mt-1 text-sm text-zinc-500">
                  Analyze your entire project using AI.
                </p>

              </div>

            </div>

          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 transition hover:bg-zinc-800"
          >
            <X size={22} />
          </button>

        </div>

        {/* Content */}

        <div className="space-y-6 p-8">

          {/* Project Summary */}

          <div className="rounded-2xl border border-zinc-800 bg-[#18181B] p-6">

            <h3 className="mb-5 text-lg font-semibold">
              Project Summary
            </h3>

            <div className="grid grid-cols-2 gap-5">

              <div className="flex items-center gap-3">

                <FolderGit2 className="text-violet-400" size={20} />

                <div>

                  <p className="text-xs text-zinc-500">
                    Files
                  </p>

                  <p className="font-semibold">
                    248
                  </p>

                </div>

              </div>

              <div className="flex items-center gap-3">

                <Bug className="text-red-400" size={20} />

                <div>

                  <p className="text-xs text-zinc-500">
                    Issues
                  </p>

                  <p className="font-semibold">
                    437
                  </p>

                </div>

              </div>

              <div className="flex items-center gap-3">

                <FileCode2 className="text-cyan-400" size={20} />

                <div>

                  <p className="text-xs text-zinc-500">
                    Lines of Code
                  </p>

                  <p className="font-semibold">
                    42,814
                  </p>

                </div>

              </div>

              <div className="flex items-center gap-3">

                <Sparkles className="text-yellow-400" size={20} />

                <div>

                  <p className="text-xs text-zinc-500">
                    Input Tokens
                  </p>

                  <p className="font-semibold">
                    ~210,000
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* Estimate */}

          <div className="grid grid-cols-2 gap-5">

            <div className="rounded-2xl border border-zinc-800 bg-[#18181B] p-5">

              <div className="flex items-center gap-3">

                <Clock3 className="text-cyan-400" size={20} />

                <div>

                  <p className="text-xs text-zinc-500">
                    Estimated Time
                  </p>

                  <p className="mt-1 text-lg font-semibold">
                    ~4 min 20 sec
                  </p>

                </div>

              </div>

            </div>

            <div className="rounded-2xl border border-zinc-800 bg-[#18181B] p-5">

              <div className="flex items-center gap-3">

                <Coins className="text-emerald-400" size={20} />

                <div>

                  <p className="text-xs text-zinc-500">
                    Estimated Cost
                  </p>

                  <p className="mt-1 font-semibold text-emerald-400">
                    FREE (Local Model)
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Footer */}

        <div className="flex gap-4 border-t border-zinc-800 bg-[#0E0E10] px-8 py-6">

          <button
            onClick={onClose}
            className="flex-1 rounded-xl border border-zinc-700 bg-[#18181B] py-3 font-medium transition hover:bg-zinc-800"
          >
            Cancel
          </button>

          <button
            onClick={onGenerate}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 py-3 font-semibold transition hover:from-violet-700 hover:to-indigo-700"
          >
            <Play size={18} />

            Generate Suggestions

          </button>

        </div>

      </div>

    </div>
  );
}