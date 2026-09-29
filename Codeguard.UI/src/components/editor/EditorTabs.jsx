import {
  FileCode2,
  X,
} from "lucide-react";

import { useEditorStore } from "../../store/editorStore";

export default function EditorTabs() {
  const {
    openFiles,
    activeFileId,
    setActiveFile,
    closeFile,
  } = useEditorStore();

  if (!openFiles.length) {
    return (
      <div className="flex h-11 items-center border-b border-zinc-800 bg-[#18181B] px-4 text-sm text-zinc-500">
        No files opened
      </div>
    );
  }

  return (
    <div className="flex overflow-x-auto border-b border-zinc-800 bg-[#18181B] scrollbar-thin scrollbar-thumb-zinc-700">

      {openFiles.map((file) => {

        const active = activeFileId === file.id;

        return (
          <div
            key={file.id}
            onClick={() => setActiveFile(file.id)}
            className={`group relative flex min-w-[220px] cursor-pointer items-center gap-3 border-r border-zinc-800 px-5 py-3 transition-all
              ${
                active
                  ? "bg-[#111113] text-white"
                  : "bg-[#18181B] text-zinc-400 hover:bg-[#202024] hover:text-white"
              }`}
          >

            {/* Active Indicator */}

            {active && (
              <div className="absolute left-0 top-0 h-full w-1 rounded-r bg-violet-500" />
            )}

            {/* File Icon */}

            <FileCode2
              size={17}
              className={
                active
                  ? "text-violet-400"
                  : "text-zinc-500"
              }
            />

            {/* File Name */}

            <span className="flex-1 truncate text-sm font-medium">

              {file.name}

            </span>

            {/* Unsaved Dot */}

            {file.isDirty && (
              <span className="h-2 w-2 rounded-full bg-yellow-400" />
            )}

            {/* Close */}

            <button
              onClick={(e) => {
                e.stopPropagation();
                closeFile(file.id);
              }}
              className="rounded-md p-1 opacity-0 transition group-hover:opacity-100 hover:bg-red-500/20 hover:text-red-400"
            >
              <X size={14} />
            </button>

          </div>
        );

      })}

    </div>
  );
}