import { useState } from "react";
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";

import { useAnalysisStore } from "../../store/analysisStore";
import { handleAIFix } from "../../services/analysisService";

export default function IssueTable({ activeTab }) {
  const { issues, generatingIssueId } = useAnalysisStore();

  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  // ✅ FILTER LOGIC
  const filteredIssues = issues.filter((issue) => {
    const severity = issue.severity?.toLowerCase();

    if (activeTab === "error") return severity === "error";
    if (activeTab === "warning") return severity === "warning";

    return true; // all
  });

  const totalPages = Math.max(
    1,
    Math.ceil(filteredIssues.length / itemsPerPage)
  );

  const paginated = filteredIssues.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const severityBadge = (severity) => {
    switch (severity) {
      case "Error":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-red-500/15 px-3 py-1 text-xs font-semibold text-red-400">
            <AlertCircle size={13} />
            Error
          </span>
        );

      case "Warning":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-yellow-500/15 px-3 py-1 text-xs font-semibold text-yellow-400">
            <AlertTriangle size={13} />
            Warning
          </span>
        );

      default:
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-cyan-500/15 px-3 py-1 text-xs font-semibold text-cyan-400">
            <CheckCircle2 size={13} />
            Info
          </span>
        );
    }
  };

  return (
    <div className="flex h-full flex-col">

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full">
          <thead className="sticky top-0 bg-[#111113] border-b border-zinc-800 z-10">
            <tr className="text-left">
              <th className="px-3 py-2 text-xs text-zinc-500">File</th>
              <th className="px-3 py-2 text-xs text-zinc-500">Line</th>
              <th className="px-3 py-2 text-xs text-zinc-500">Rule</th>
              <th className="px-3 py-2 text-xs text-zinc-500">Description</th>
              <th className="px-3 py-2 text-xs text-zinc-500">Severity</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-10 text-center text-zinc-500">
                  No issues found
                </td>
              </tr>
            ) : (
              paginated.map((issue) => {
                const isLoading = generatingIssueId === issue.id;

                return (
                  <tr
                    key={issue.id}
                    className="border-b border-zinc-800 hover:bg-zinc-900/60"
                  >
                    <td className="px-3 py-2">{issue.file}</td>
                    <td className="px-3 py-2 text-cyan-400">{issue.line}</td>
                    <td className="px-3 py-2 text-violet-400">{issue.rule}</td>
                    <td className="px-3 py-2 text-zinc-300">{issue.message}</td>
                    <td className="px-3 py-2">
                      {severityBadge(issue.severity)}
                    </td>
                    <td className="px-3 py-2">
                      <button
                        onClick={() => handleAIFix(issue)}
                        disabled={isLoading}
                        className="rounded-lg bg-violet-600 px-2 py-1 text-xs"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="animate-spin" size={14} />
                            Generating...
                          </>
                        ) : (
                          "AI Fix"
                        )}
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-zinc-800 px-3 py-2">
        <span className="text-sm text-zinc-500">
          Showing {paginated.length} of {filteredIssues.length} issues
        </span>

        <div className="flex gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            <ChevronLeft size={18} />
          </button>

          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}