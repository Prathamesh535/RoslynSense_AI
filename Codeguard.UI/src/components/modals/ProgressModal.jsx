import {
  LoaderCircle,
  FileCode2,
  Bug,
  Clock3,
  PauseCircle,
  XCircle,
} from "lucide-react";

export default function ProgressModal({
  isOpen,
  progress,
  currentFile,
  currentIssue,
  onCancel,
  onBackground,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-6">

      <div className="w-full max-w-xl overflow-hidden rounded-3xl border border-zinc-800 bg-[#111113] shadow-2xl">

        {/* Header */}

        <div className="border-b border-zinc-800 bg-gradient-to-r from-violet-600/10 via-transparent to-cyan-500/10 px-8 py-7">

          <div className="flex items-center gap-4">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-600/20">

              <LoaderCircle
                size={30}
                className="animate-spin text-violet-400"
              />

            </div>

            <div>

              <h2 className="text-2xl font-bold">
                AI Analysis Running
              </h2>

              <p className="mt-1 text-sm text-zinc-500">
                Please wait while CodeGuard AI analyzes your project.
              </p>

            </div>

          </div>

        </div>

        {/* Content */}

        <div className="space-y-7 p-8">

          {/* Progress */}

          <div>

            <div className="mb-3 flex items-center justify-between">

              <span className="font-medium">
                Overall Progress
              </span>

              <span className="text-violet-400 font-semibold">
                {progress}%
              </span>

            </div>

            <div className="h-3 overflow-hidden rounded-full bg-zinc-800">

              <div
                className="h-full rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />

            </div>

          </div>

          {/* Current File */}

          <div className="rounded-2xl border border-zinc-800 bg-[#18181B] p-5">

            <div className="flex items-center gap-3">

              <FileCode2
                size={22}
                className="text-cyan-400"
              />

              <div>

                <p className="text-xs uppercase tracking-wider text-zinc-500">
                  Current File
                </p>

                <p className="mt-1 break-all font-medium">
                  {currentFile}
                </p>

              </div>

            </div>

          </div>

          {/* Current Issue */}

          <div className="rounded-2xl border border-zinc-800 bg-[#18181B] p-5">

            <div className="flex items-center gap-3">

              <Bug
                size={22}
                className="text-red-400"
              />

              <div>

                <p className="text-xs uppercase tracking-wider text-zinc-500">
                  Current Issue
                </p>

                <p className="mt-1 font-medium">
                  {currentIssue}
                </p>

              </div>

            </div>

          </div>

          {/* ETA */}

          <div className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-[#18181B] p-4">

            <Clock3
              size={20}
              className="text-yellow-400"
            />

            <span className="text-sm text-zinc-400">
              Estimated remaining time:
            </span>

            <span className="ml-auto font-semibold">
              ~2 min
            </span>

          </div>

        </div>

        {/* Footer */}

        <div className="flex gap-4 border-t border-zinc-800 bg-[#0E0E10] px-8 py-6">

          <button
            onClick={onBackground}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-[#18181B] py-3 font-medium transition hover:bg-zinc-800"
          >
            <PauseCircle size={18} />
            Run in Background
          </button>

          <button
            onClick={onCancel}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 py-3 font-semibold transition hover:bg-red-700"
          >
            <XCircle size={18} />
            Cancel
          </button>

        </div>

      </div>

    </div>
  );
}