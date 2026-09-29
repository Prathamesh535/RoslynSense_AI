import { FileArchive, FileCode2 } from "lucide-react";

export default function UploadMenu({
  onZipUpload,
  onSingleFileUpload,
}) {
  return (
    <div className="mt-3 overflow-hidden rounded-xl border border-zinc-800 bg-[#141416] shadow-xl">

      <button
        onClick={onZipUpload}
        className="flex w-full items-center gap-3 px-4 py-3 transition hover:bg-zinc-800"
      >
        <FileArchive size={18} className="text-violet-400" />

        <div className="text-left">
          <p className="text-sm font-medium">
            Upload Project (.zip)
          </p>

          <p className="text-xs text-zinc-500">
            Analyze complete project
          </p>
        </div>

      </button>

      <button
        onClick={onSingleFileUpload}
        className="flex w-full items-center gap-3 border-t border-zinc-800 px-4 py-3 transition hover:bg-zinc-800"
      >
        <FileCode2
          size={18}
          className="text-emerald-400"
        />

        <div className="text-left">
          <p className="text-sm font-medium">
            Upload Single File
          </p>

          <p className="text-xs text-zinc-500">
            Analyze one source file
          </p>
        </div>

      </button>

    </div>
  );
}