import {
  X,
  FileCode2,
  Circle,
  Clock3,
} from "lucide-react";

import { useEditorStore } from "../../store/editorStore";

const languageOptions = [
  { label: "Plain Text", value: "plaintext", ext: "txt" },
  { label: "C#", value: "csharp", ext: "cs" },
  { label: "Java", value: "java", ext: "java" },
  { label: "JavaScript", value: "javascript", ext: "js" },
  { label: "TypeScript", value: "typescript", ext: "ts" },
  { label: "Python", value: "python", ext: "py" },
  { label: "HTML", value: "html", ext: "html" },
  { label: "CSS", value: "css", ext: "css" },
  { label: "SQL", value: "sql", ext: "sql" },
  { label: "JSON", value: "json", ext: "json" },
  { label: "XML", value: "xml", ext: "xml" },
];

export default function EditorHeader({
  file,
  onClose,
}) {

  const { updateFileMetadata } = useEditorStore();

  const handleLanguageChange = (e) => {

    const language = e.target.value;

    const selected = languageOptions.find(
      x => x.value === language
    );

    const baseName =
      file.name.includes(".")
        ? file.name.substring(
            0,
            file.name.lastIndexOf(".")
          )
        : file.name;

    updateFileMetadata(file.id, {
      language,
      name: `${baseName}.${selected.ext}`,
    });
  };

  return (
    <div className="flex items-center justify-between border-b border-zinc-800 bg-[#18181B] px-5 py-3">

      {/* LEFT */}

      <div className="flex items-center gap-4">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600/15">

          <FileCode2
            size={20}
            className="text-violet-400"
          />

        </div>

        <div>

          <div className="flex items-center gap-2">

            <h3 className="font-semibold">
              {file?.name}
            </h3>

            <Circle
              size={8}
              fill="#22c55e"
              className="text-green-500"
            />

          </div>

          <div className="mt-1 flex items-center gap-4 text-xs text-zinc-500">

            <span>
              {
                languageOptions.find(
                  l => l.value === file.language
                )?.label || "Plain Text"
              }
            </span>

            <span className="flex items-center gap-1">

              <Clock3 size={12} />

              Auto Saved

            </span>

          </div>

        </div>

      </div>

      {/* RIGHT */}

      <div className="flex items-center gap-3">

        <select
          value={file.language}
          onChange={handleLanguageChange}
         className="appearance-none rounded-lg border border-zinc-700 bg-[#111113] px-3 py-2 text-sm text-white outline-none focus:border-violet-500 focus:outline-none focus:ring-0"
        >
          {languageOptions.map(lang => (
            <option
              key={lang.value}
              value={lang.value}
            >
              {lang.label}
            </option>
          ))}
        </select>

        <button
          onClick={() => onClose(file?.id)}
          className="rounded-lg p-2 transition hover:bg-red-500/20 hover:text-red-400"
        >
          <X size={18} />
        </button>

      </div>

    </div>
  );
}