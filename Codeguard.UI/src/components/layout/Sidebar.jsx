import { useRef, useState } from "react";
import { Upload, Github, Clipboard, Play, Check, AlertTriangle, FolderOpen, FileCode2, Layers3, HardDrive } from "lucide-react";
import Button from "../common/Button";
import UploadMenu from "../upload/UploadMenu";
import { useEditorStore } from "../../store/editorStore";
import { createPastedFile, openUploadedFile } from "../../services/editorService";
import { analyzeCurrentFile } from "../../services/analysisService";
import { useAnalysisStore } from "../../store/analysisStore";

export default function Sidebar() {
  const [showUploadMenu, setShowUploadMenu] = useState(false);
  const { openFile } = useEditorStore();
  const zipInputRef = useRef(null);
  const fileInputRef = useRef(null);
  const { status, progress, message, } = useAnalysisStore();

  const openZipPicker = () => { setShowUploadMenu(false); zipInputRef.current.click(); };
  const openSingleFilePicker = () => { setShowUploadMenu(false); fileInputRef.current.click();};

  const handleProjectUpload = (e) => {
    const files = Array.from(e.target.files);

    console.log(files);

    if (!files.length) return;

    if (files.length === 1 && files[0].name.endsWith(".zip")) {
      console.log("ZIP uploaded");
    }
    else if (files.length === 1) {
      console.log("Single file uploaded");
    }
    else {
      console.log("Folder uploaded");
    }
  };
  const projectInfo = {
    name: "MyProject",
    uploadedOn: "22 Jul 2026, 11:20 AM",
    language: "C#",
    framework: ".NET 8",
    size: "12.4 MB",
  };
  const getLanguage = (fileName) => {
    const ext = fileName.split(".").pop().toLowerCase();

    switch (ext) {
      case "cs":
        return "csharp";

      case "cshtml":
        return "razor";

      case "razor":
        return "razor";

      case "js":
        return "javascript";

      case "jsx":
        return "javascript";

      case "ts":
        return "typescript";

      case "tsx":
        return "typescript";

      case "java":
        return "java";

      case "py":
        return "python";

      case "cpp":
        return "cpp";

      case "c":
        return "c";

      case "html":
        return "html";

      case "css":
        return "css";

      case "json":
        return "json";

      case "xml":
        return "xml";

      case "sql":
        return "sql";

      default:
        return "plaintext";
    }
  };
  return (
    <aside className="w-[300px] shrink-0 border-r border-zinc-800 bg-[#0B0B0D] flex flex-col overflow-hidden">

      {/* Header */}
      <div className="px-5 py-2 border-b border-zinc-800">
        <h2 className="text-lg font-semibold">Workspace</h2>
        <p className="text-xs text-zinc-500 mt-1">
          Upload your project for AI analysis
        </p>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4">

        {/* Input Options */}
        <div>

          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 mb-4">
            Import Source
          </p>

          <div className="space-y-3">

            <button className="w-full rounded-xl border border-zinc-800 bg-[#141416] p-3 transition hover:border-violet-500 hover:bg-[#18181B]" onClick={() => setShowUploadMenu(!showUploadMenu)}>
              {showUploadMenu && (
                <UploadMenu
                  onZipUpload={openZipPicker}
                  onSingleFileUpload={openSingleFilePicker}
                />
              )}
              <div className="flex items-center gap-3">

                <Upload className="text-violet-400" size={20} />

                <div className="text-left">

                  <h4 className="font-medium">
                    Upload Project
                  </h4>

                  <p className="text-xs text-zinc-500">
                    ZIP • Single File
                  </p>

                </div>

              </div>

            </button>

            <button className="w-full rounded-xl border border-zinc-800 bg-[#141416] px-4 py-3 transition hover:border-violet-500 hover:bg-[#18181B]">

              <div className="flex items-center gap-3">

                <Github className="text-white" size={20} />

                <div className="text-left">

                  <h4 className="font-medium">
                    GitHub Repository
                  </h4>

                  <p className="text-xs text-zinc-500">
                    Import from GitHub
                  </p>

                </div>

              </div>

            </button>

            <button className="w-full rounded-xl border border-zinc-800 bg-[#141416] p-3 transition hover:border-violet-500 hover:bg-[#18181B]" onClick={createPastedFile}>

              <div className="flex items-center gap-3">

                <Clipboard className="text-cyan-400" size={20} />

                <div className="text-left">

                  <h4 className="font-medium">
                    Paste Code
                  </h4>

                  <p className="text-xs text-zinc-500">
                    Analyze snippets instantly
                  </p>

                </div>

              </div>

            </button>


          </div>

        </div>

        {/* Upload Area */}

        {/* <div className="mt-6 rounded-2xl border-2 border-dashed border-zinc-700 bg-[#111113] p-5 text-center transition hover:border-violet-500">

          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-600/20">

            <FolderOpen
              className="text-violet-400"
              size={28}
            />

          </div>

          <h3 className="mt-4 font-semibold">
            Drag & Drop ZIP
          </h3>

          <p className="mt-2 text-sm text-zinc-500">
            Drop your project archive here
          </p>

          <Button
            variant="outline"
            className="mt-5 w-full rounded-xl"
          >
            Browse Files
          </Button>

          <p className="mt-3 text-[11px] text-zinc-600">
            Supports .zip files only
          </p>

        </div> */}

        {/* Analyze */}

        <Button
          onClick={analyzeCurrentFile}
          disabled={status === "analyzing"}
          className={`
      mt-4
      flex
      w-full
      items-center
      justify-center
      gap-2
      rounded-xl
      py-3
      text-base
      font-semibold
      transition

      ${status === "completed"
              ? "bg-emerald-600 hover:bg-emerald-700"
              : "bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
            }
  `}
        >
          {status === "idle" && (
            <>
              <Play size={18} />
              Analyze Code
            </>
          )}

          {status === "analyzing" && (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Analyzing...
            </>
          )}

          {status === "completed" && (
            <>
              <Check size={18} />
              Analyze Again
            </>
          )}

          {status === "failed" && (
            <>
              <AlertTriangle size={18} />
              Retry Analysis
            </>
          )}
        </Button>
        {status === "analyzing" && (

          <div className="mt-4">

            <div className="h-2 overflow-hidden rounded-full bg-zinc-800">

              <div
                style={{
                  width: `${progress}%`,
                }}
                className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 transition-all duration-300"
              />

            </div>

            <p className="mt-2 text-xs text-zinc-500">

              {message}

            </p>

          </div>

        )}
        {/* Project Info */}

        <div className="mt-5">

          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 mb-4">
            Project Details
          </p>

          <div className="rounded-2xl border border-zinc-800 bg-[#111113] p-5 space-y-5">

            <div className="flex items-center gap-3">

              <FileCode2
                className="text-violet-400"
                size={18}
              />

              <div>

                <p className="text-xs text-zinc-500">
                  Project
                </p>

                <p className="font-medium">
                  {projectInfo.name}
                </p>

              </div>

            </div>

            <div className="flex items-center gap-3">

              <Layers3
                className="text-cyan-400"
                size={18}
              />

              <div>

                <p className="text-xs text-zinc-500">
                  Stack
                </p>

                <p>
                  {projectInfo.language} • {projectInfo.framework}
                </p>

              </div>

            </div>

            <div className="flex items-center gap-3">

              <HardDrive
                className="text-green-400"
                size={18}
              />

              <div>

                <p className="text-xs text-zinc-500">
                  Size
                </p>

                <p>
                  {projectInfo.size}
                </p>

              </div>

            </div>

            <div className="border-t border-zinc-800 pt-4">

              <p className="text-xs text-zinc-500">
                Uploaded
              </p>

              <p className="mt-1 text-sm">
                {projectInfo.uploadedOn}
              </p>

            </div>

          </div>

        </div>

      </div>
      <input
        ref={zipInputRef}
        type="file"
        accept=".zip"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files[0];

          if (!file) return;

          console.log("ZIP:", file);
        }}
      />

      <input
        ref={fileInputRef}
        type="file"
        accept=".cs,.cshtml,.razor,.js,.jsx,.ts,.tsx,.java,.py,.cpp,.c,.html,.css,.json,.xml,.sql"
        className="hidden"
        onChange={async (e) => {
          const file = e.target.files[0];

          if (!file) return;

          await openUploadedFile(file);

          e.target.value = "";
        }}
      />

    </aside>
  );
}