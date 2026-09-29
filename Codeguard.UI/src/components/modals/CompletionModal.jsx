import {
  CheckCircle2,
  Clock3,
  Sparkles,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

export default function CompletionModal({ isOpen, onClose, stats }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-6">

      <div className="w-full max-w-lg overflow-hidden rounded-3xl border border-zinc-800 bg-[#111113] shadow-2xl">

        {/* Header */}

        <div className="relative overflow-hidden border-b border-zinc-800 bg-gradient-to-r from-emerald-600/15 via-transparent to-violet-600/15 px-8 py-8">

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/15">

            <CheckCircle2
              size={48}
              className="text-emerald-400"
            />

          </div>

          <h2 className="mt-6 text-center text-3xl font-bold">
            Analysis Complete
          </h2>

          <p className="mt-2 text-center text-zinc-400">
            AI has successfully analyzed your project and generated recommendations.
          </p>

        </div>

        {/* Stats */}

        <div className="grid grid-cols-3 gap-4 p-6">

          <div className="rounded-2xl border border-zinc-800 bg-[#18181B] p-5 text-center">

            <ShieldCheck
              className="mx-auto mb-3 text-violet-400"
              size={22}
            />

            <p className="text-xs uppercase tracking-wider text-zinc-500">
              Issues
            </p>

            <p className="mt-2 text-3xl font-bold">
              {stats.total}
            </p>

          </div>

          <div className="rounded-2xl border border-zinc-800 bg-[#18181B] p-5 text-center">

            <Sparkles
              className="mx-auto mb-3 text-emerald-400"
              size={22}
            />

            <p className="text-xs uppercase tracking-wider text-zinc-500">
              Fixed
            </p>

            <p className="mt-2 text-3xl font-bold text-emerald-400">
              {stats.generated}
            </p>

          </div>

          <div className="rounded-2xl border border-zinc-800 bg-[#18181B] p-5 text-center">

            <Clock3
              className="mx-auto mb-3 text-cyan-400"
              size={22}
            />

            <p className="text-xs uppercase tracking-wider text-zinc-500">
              Time
            </p>

            <p className="mt-2 text-3xl font-bold">
              {stats.time}
            </p>

          </div>

        </div>

        {/* Footer */}

        <div className="flex gap-4 border-t border-zinc-800 p-6">

          <button
            onClick={onClose}
            className="flex-1 rounded-xl border border-zinc-700 bg-[#18181B] py-3 font-medium transition hover:bg-zinc-800"
          >
            Close
          </button>

          <button
            onClick={onClose}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 py-3 font-semibold transition hover:from-violet-700 hover:to-indigo-700"
          >
            View Suggestions

            <ArrowRight size={18} />

          </button>

        </div>

      </div>

    </div>
  );
}