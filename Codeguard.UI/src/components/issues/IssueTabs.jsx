import {
  AlertCircle,
  AlertTriangle,
  BrainCircuit,
  Sparkles,
  Wand2,
  BookOpen,
  BarChart3,
} from "lucide-react";
import { useAnalysisStore } from "../../store/analysisStore";
// const tabs = [
//   { label: `Errors (${errorsCount})`, value: "error" },
//   { label: `Warnings (${warningsCount})`, value: "warning" },
//   { label: `All`, value: "all" },
  // {
  //   label: "Code Smells",
  //   count: 0,
  //   icon: BrainCircuit,
  //   color: "text-orange-400",
  // },
  // {
  //   label: "Complexity",
  //   icon: BarChart3,
  //   color: "text-cyan-400",
  // },
  // {
  //   label: "Minimal Suggestions",
  //   icon: Wand2,
  //   color: "text-emerald-400",
  // },
  // {
  //   label: "Optimized Code",
  //   icon: Sparkles,
  //   color: "text-violet-400",
  // },
  // {
  //   label: "Instructions",
  //   icon: BookOpen,
  //   color: "text-blue-400",
  // },
//];

export default function IssueTabs({ activeTab, setActiveTab }) {
  const { issues } = useAnalysisStore();

  const errorsCount = issues.filter(
    (i) => i.severity?.toLowerCase() === "error"
  ).length;

  const warningsCount = issues.filter(
    (i) => i.severity?.toLowerCase() === "warning"
  ).length;

  const tabs = [
    {
      label: "Errors",
      count: errorsCount,
      value: "error",
      color: "text-red-400",
      border: "border-red-400",
      bg: "bg-red-500/10",
    },
    {
      label: "Warnings",
      count: warningsCount,
      value: "warning",
      color: "text-yellow-400",
      border: "border-yellow-400",
      bg: "bg-yellow-500/10",
    },
    {
      label: "All",
      count: issues.length,
      value: "all",
      color: "text-zinc-300",
      border: "border-violet-500",
      bg: "bg-violet-500/10",
    },
  ];

  return (
    <div className="flex gap-2 border-b border-zinc-800 px-3 py-2">

      {tabs.map((tab) => {
        const isActive = activeTab === tab.value;

        return (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`
              relative flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200
              ${isActive
                ? `${tab.bg} ${tab.color} border ${tab.border} shadow-inner`
                : "text-zinc-400 hover:text-white hover:bg-zinc-800"}
            `}
          >
            {/* Glow effect */}
            {isActive && (
              <span className="absolute inset-0 rounded-xl border border-violet-500/30 blur-sm opacity-40"></span>
            )}

            {/* Label */}
            <span className="relative z-10">
              {tab.label}
            </span>

            {/* Count badge */}
            <span
              className={`
                relative z-10 rounded-md px-2 py-0.5 text-xs font-semibold
                ${isActive
                  ? "bg-black/40 text-white"
                  : "bg-zinc-800 text-zinc-400"}
              `}
            >
              {tab.count}
            </span>
          </button>
        );
      })}

    </div>
  );
}