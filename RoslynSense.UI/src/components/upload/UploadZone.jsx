import { UploadCloud, FolderOpen, ShieldCheck } from "lucide-react";
import { useUploadStore } from "../../store/uploadStore";

export default function UploadZone() {
  const { addUpload } = useUploadStore();

  const handleFileDrop = (e) => {
    e.preventDefault();

    const files = Array.from(e.dataTransfer.files).filter((file) =>
      file.name.toLowerCase().endsWith(".zip")
    );

    files.forEach((file) => addUpload(file));
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);

    files.forEach((file) => addUpload(file));
  };

  return (
    <div
      onDrop={handleFileDrop}
      onDragOver={(e) => e.preventDefault()}
      className="group relative overflow-hidden rounded-3xl border-2 border-dashed border-zinc-700 bg-gradient-to-br from-[#111113] to-[#18181B] p-10 transition-all duration-300 hover:border-violet-500 hover:shadow-xl hover:shadow-violet-500/10"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-r from-violet-600/5 via-transparent to-cyan-500/5" />

      <div className="relative z-10 flex flex-col items-center">

        {/* Upload Icon */}
        <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-violet-600/15">

          <UploadCloud
            size={42}
            className="text-violet-400"
          />

        </div>

        {/* Heading */}

        <h2 className="mt-6 text-2xl font-bold">
          Upload Project
        </h2>

        <p className="mt-2 max-w-sm text-center text-zinc-500">
          Drag & drop your project ZIP here or browse your computer.
        </p>

        {/* Browse Button */}

        <label className="mt-8 cursor-pointer rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 px-8 py-3 font-semibold transition hover:from-violet-700 hover:to-indigo-700">

          <span className="flex items-center gap-2">

            <FolderOpen size={18} />

            Browse ZIP File

          </span>

          <input
            type="file"
            accept=".zip"
            className="hidden"
            onChange={handleFileSelect}
          />

        </label>

        {/* Supported */}

        <div className="mt-8 flex items-center gap-2 rounded-full border border-zinc-800 bg-[#18181B] px-4 py-2">

          <ShieldCheck
            size={16}
            className="text-emerald-400"
          />

          <span className="text-xs text-zinc-400">
            Supports .zip files up to 500 MB
          </span>

        </div>

      </div>
    </div>
  );
}