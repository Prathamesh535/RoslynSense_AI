import { useEditorStore } from "../store/editorStore";

export const getLanguage = (fileName) => {
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

export const openVirtualFile = ({
  fileName,
  language,
  content,
}) => {
  const { openFile } = useEditorStore.getState();

  openFile({
    id: Date.now(),
    name: fileName,
    language,
    content,
    line: 1,
  });
};

export const openUploadedFile = async (file) => {
  const content = await file.text();

  openVirtualFile({
    fileName: file.name,
    language: getLanguage(file.name),
    content,
  });
};

export const createPastedFile = () => {
  openVirtualFile({
    fileName: "PastedFile.txt",
    language: "plaintext",
    content: "",
  });
};