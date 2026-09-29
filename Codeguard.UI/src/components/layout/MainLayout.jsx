
import React, { memo, useState } from "react";
import {
  Folder,
  FileCode2,
  CircleAlert,
  TriangleAlert,
  Bug,
  Activity,
  Cpu,
} from "lucide-react";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import StatCard from "../common/StatCard";
import CodeEditor from "../editor/CodeEditor";
import IssueTabs from "../issues/IssueTabs";
import IssueTable from "../issues/IssueTable";
import AISuggestionPanel from "../issues/AISuggestionPanel";
import { useAnalysisStore } from "../../store/analysisStore";

const MainLayout = memo(function MainLayout() {
  const [activeTab, setActiveTab] = useState("all");
  const { summary } = useAnalysisStore();

  return (
    <div className="flex h-screen overflow-hidden bg-[#09090B] text-white">

      {/* Sidebar (hidden on small screens) */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Main */}
      <main className="flex flex-1 flex-col overflow-hidden">

        <Navbar />

        <section className="flex flex-1 min-h-0 flex-col overflow-hidden px-2 sm:px-4 pt-4">

          {/* ========================= */}
          {/* Stats */}
          {/* ========================= */}
          <div className="mb-3 shrink-0 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-2 auto-rows-[62px]">

            <StatCard label="Files" value={summary.totalFiles} subValue="Files"
              icon={<Folder size={14} className="text-cyan-300" />} />

            <StatCard label="LOC" value={summary.totalLines} subValue="Lines"
              icon={<FileCode2 size={14} className="text-violet-400" />} />

            <StatCard label="Errors" value={summary.errors} color="text-red-400"
              subValue="Critical"
              icon={<CircleAlert size={18} className="text-red-400" />} />

            <StatCard label="Warnings" value={summary.warnings} color="text-yellow-400"
              subValue="Review"
              icon={<TriangleAlert size={18} className="text-yellow-400" />} />

            <StatCard label="Smells" value={summary.codeSmells} color="text-orange-400"
              subValue="Refactor"
              icon={<Bug size={18} className="text-orange-400" />} />

            <StatCard label="Time" value={summary.timeComplexity} color="text-emerald-400"
              subValue="Estimated"
              icon={<Activity size={18} className="text-emerald-400" />} />

            <StatCard label="Space" value={summary.spaceComplexity} color="text-cyan-400"
              subValue="Estimated"
              icon={<Cpu size={18} className="text-cyan-400" />} />

          </div>

          {/* ========================= */}
          {/* Workspace */}
          {/* ========================= */}
          <div className="grid flex-1 min-h-0 grid-cols-1 lg:grid-cols-12 gap-4 overflow-hidden">

            {/* LEFT */}
            <div className="lg:col-span-8 xl:col-span-9 flex min-h-0 flex-col gap-4 overflow-hidden">

              {/* Editor */}
              <div className="flex-[1.5] min-h-[200px] lg:min-h-0 overflow-hidden rounded-2xl border border-zinc-800">
                <CodeEditor />
              </div>

              {/* Issues */}
              <div className="flex flex-1 min-h-[200px] lg:min-h-0 flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-[#111113]">

                <IssueTabs
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                />

                <div className="flex-1 min-h-0 overflow-y-auto">
                  <IssueTable activeTab={activeTab}/>
                </div>

              </div>

            </div>

            {/* RIGHT (Desktop) */}
            <div className="hidden lg:flex lg:col-span-4 xl:col-span-3 min-h-0 flex-col overflow-hidden">
              <AISuggestionPanel />
            </div>

          </div>

          {/* RIGHT PANEL (Mobile) */}
          <div className="mt-4 lg:hidden">
            <AISuggestionPanel />
          </div>

        </section>

      </main>

    </div>
  );
});

export default MainLayout;