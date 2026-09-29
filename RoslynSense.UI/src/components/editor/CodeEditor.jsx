import { FileCode2, Sparkles, } from "lucide-react";
import Editor from "@monaco-editor/react";
import { useEditorStore } from "../../store/editorStore";

import EditorTabs from "./EditorTabs";
import EditorHeader from "./EditorHeader";


export default function CodeEditor() {

  const { openFiles, activeFileId, updateFileContent,setEditor, } = useEditorStore();
  
  const activeFile = openFiles.find(
    (file) => file.id === activeFileId
  );

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-[#111113] shadow-xl">

      {/* Top Bar */}

      <div className="flex items-center justify-between border-b border-zinc-800 bg-[#0F0F11] px-5 py-3">

        <div className="flex items-center gap-3">

          <FileCode2
            size={20}
            className="text-violet-400"
          />

          <div>

            <h3 className="font-semibold">
              Source Code
            </h3>

            <p className="text-xs text-zinc-500">
              AI Code Analysis Workspace
            </p>

          </div>

        </div>

        <div className="flex items-center gap-2 rounded-full bg-violet-600/10 px-3 py-1">

          <Sparkles
            size={14}
            className="text-violet-400"
          />

          <span className="text-xs text-violet-300">
            Monaco Editor
          </span>

        </div>

      </div>

      {/* File Tabs */}

      <EditorTabs />

      {/* File Header */}

      {activeFile && (
        <EditorHeader
          file={activeFile}
          onClose={() => {}}
        />
      )}

      {/* Monaco */}
        <div className="relative flex-1 min-h-0 overflow-hidden bg-[#1E1E1E]">

    {activeFile ? (

        <Editor
            key={activeFile.id + activeFile.language}
    height="100%"
    language={activeFile.language || "plaintext"}
    value={activeFile.content}
    theme="vs-dark"

    onMount={(editor) => {
        setEditor(editor);
    }}

    onChange={(value) => {
        updateFileContent(
            activeFile.id,
            value || ""
        );
    }}
            options={{
                readOnly: false,
                automaticLayout: true,
                minimap: {
                    enabled: false,
                },
                fontSize: 15,
                lineHeight: 24,
                smoothScrolling: true,
                scrollBeyondLastLine: false,
                wordWrap: "on",
                roundedSelection: true,
                renderLineHighlight: "all",
            }}
        />

    ) : (
          <div className="flex h-full flex-col items-center justify-center text-center">

            <FileCode2
              size={72}
              className="mb-6 text-zinc-700"
            />

            <h2 className="text-2xl font-bold">
              No File Open
            </h2>

            <p className="mt-3 max-w-md text-zinc-500">

              Upload a source file or click
              Paste Code to begin analysis.
            </p>

          </div>
        )}

      </div>

      {/* Footer */}

      <div className="flex items-center justify-between border-t border-zinc-800 bg-[#0F0F11] px-5 py-2 text-xs text-zinc-500">

        <div className="flex gap-5">

          <span>
            UTF-8
          </span>

          <span>
            CRLF
          </span>

          <span>
             {activeFile?.language || "Plain Text"}
          </span>

        </div>

        <div className="flex gap-5">

          <span>
            AI Ready
          </span>

          <span>
            Monaco Editor
          </span>

        </div>

      </div>

    </div>
  );
}