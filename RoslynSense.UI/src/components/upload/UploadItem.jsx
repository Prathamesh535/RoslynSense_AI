import {
  CheckCircle2,
  LoaderCircle,
  FileArchive,
  AlertCircle,
} from "lucide-react";

export default function UploadItem({ upload }) {
  const getStatus = () => {
    switch (upload.status) {
      case "uploading":
        return (
          <LoaderCircle
            size={20}
            className="animate-spin text-violet-400"
          />
        );

      case "completed":
        return (
          <CheckCircle2
            size={20}
            className="text-emerald-400"
          />
        );

      case "failed":
        return (
          <AlertCircle
            size={20}
            className="text-red-400"
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="group rounded-2xl border border-zinc-800 bg-[#111113] p-4 transition-all duration-300 hover:border-violet-500 hover:bg-[#18181B]">

      <div className="flex items-center gap-4">

        {/* File Icon */}

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-600/15">

          <FileArchive
            size={24}
            className="text-violet-400"
          />

        </div>

        {/* File Info */}

        <div className="flex-1 min-w-0">

          <div className="flex items-center justify-between">

            <h4 className="truncate font-medium">
              {upload.name}
            </h4>

            {getStatus()}

          </div>

          <div className="mt-1 flex items-center justify-between text-xs text-zinc-500">

            <span>{upload.size}</span>

            <span>{upload.progress}%</span>

          </div>

          {/* Progress */}

          <div className="mt-3 h-2 overflow-hidden rounded-full bg-zinc-800">

            <div
              className="h-full rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 transition-all duration-300"
              style={{
                width: `${upload.progress}%`,
              }}
            />

          </div>

        </div>

      </div>

    </div>
  );
}