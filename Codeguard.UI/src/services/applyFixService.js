import { useAnalysisStore } from "../store/analysisStore";
import { useEditorStore } from "../store/editorStore";
import { analyzeCurrentFile } from "./analysisService";

export const applySuggestedFix = async () => {

    const analysisStore = useAnalysisStore.getState();
    const editorStore = useEditorStore.getState();

    const editor = editorStore.editor;
    const activeFile = editorStore.openFiles.find(
        x => x.id === editorStore.activeFileId
    );

    const fix = analysisStore.aiFix;

    if (!editor || !activeFile || !fix)
        return;

    const monaco = window.monaco;

    editor.executeEdits("CodeGuard", [
        {
            range: new monaco.Range(
                fix.startLine,
                1,
                fix.endLine,
                editor.getModel().getLineMaxColumn(fix.endLine)
            ),

            text: fix.fixedCode
        }
    ]);

    const newCode = editor.getValue();

    editorStore.updateFileContent(
        activeFile.id,
        newCode
    );

    await analyzeCurrentFile();
};