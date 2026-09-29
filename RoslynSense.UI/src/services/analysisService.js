import { api } from "./api";
import { useAnalysisStore } from "../store/analysisStore";
import { useEditorStore } from "../store/editorStore";
import { useAISettingsStore } from "../store/aiSettingsStore";

const delay = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));


export const analyzeCurrentFile = async () => {
  const analysisStore = useAnalysisStore.getState();
  const editorStore = useEditorStore.getState();
  
  const activeFile = editorStore.openFiles.find(
    (file) => file.id === editorStore.activeFileId
  );
   
  if (!activeFile) {
    alert("Please upload or paste a file first.");
    return;
  }
  

  analysisStore.clearAnalysis();
  analysisStore.setAIFix(null);
  analysisStore.setCurrentCode("");
  analysisStore.setSuggestedCode("");
  analysisStore.setStatus("analyzing");
  analysisStore.setCurrentFile(activeFile);

  // Simulate backend delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

analysisStore.setProgress(10);
analysisStore.setMessage("Reading source file...");

const aiSettings = useAISettingsStore.getState();

const responsePromise = api.post("/analysis/file", {
    fileName: activeFile.name,
    sourceCode: activeFile.content,
    language: "csharp",

    provider: aiSettings.provider,
    model: aiSettings.model,
    temperature: aiSettings.temperature,
    maxTokens: aiSettings.maxTokens
});
console.log("AI SETTINGS:", aiSettings);
await delay(300);

analysisStore.setProgress(30);
analysisStore.setMessage("Parsing syntax tree...");
await delay(400);

analysisStore.setProgress(55);
analysisStore.setMessage("Running Roslyn analysis...");
await delay(500);

analysisStore.setProgress(80);
analysisStore.setMessage("Finalizing analysis...");
await delay(300);

  try {
    
  const response = await responsePromise;
  const analysis = response.data.data.analysis;
   const issues = [];

// Roslyn diagnostics
analysis.diagnostics.forEach((d, index) => {
    const match = d.location?.match(/\((\d+),(\d+)\)/);

    issues.push({
        id: issues.length + 1,
        type: "diagnostic",
        file: analysis.fileName,
        line: match ? Number(match[1]) : 0,
        column: match ? Number(match[2]) : 0,
        rule: d.id,
        severity: d.severity,
        message: d.message
    });
});


analysisStore.setIssues(issues);
analysisStore.setAnalysis(analysis);
analysisStore.setSummary({
    totalFiles: 1,
    totalLines: activeFile.content
        .split(/\r\n|\r|\n/)
        .filter(x => x.trim() !== "").length,

    errors: issues.filter(x => x.severity === "Error").length,
    warnings: issues.filter(x => x.severity === "Warning").length,
    codeSmells: 0,

    timeComplexity: "-",
    spaceComplexity: "-"
});

analysisStore.setProgress(100);
analysisStore.setMessage("Analysis completed.");
analysisStore.setStatus("completed");
}
catch (error) {

    console.error(error);

    analysisStore.setStatus("failed");

}
};

export const handleAIFix = async (issue) => {

    const analysisStore = useAnalysisStore.getState();
    const editorStore = useEditorStore.getState();

    if (analysisStore.generatingIssueId === issue.id) {
        console.log("Duplicate blocked");
        return;
    }

    const activeFile = editorStore.openFiles.find(
        x => x.id === editorStore.activeFileId
    );

    if (!activeFile) return;

    analysisStore.setGeneratingIssueId(issue.id);
    analysisStore.setSelectedIssue(issue);

    try {
        const aiSettings = useAISettingsStore.getState();
         console.log("AI REQUEST:", {
    provider: aiSettings.provider,
    model: aiSettings.model,
});
        const response = await api.post("/analysis/ai-fix", {
            provider: aiSettings.provider,
            model: aiSettings.model,
            temperature: aiSettings.temperature,
            maxTokens: aiSettings.maxTokens,

            fileName: activeFile.name,
            sourceCode: activeFile.content,

            ruleId: issue.rule,
            message: issue.message,
            lineNumber: issue.line
        });

        // ✅ HANDLE EMPTY RESPONSE
        if (!response.data || !response.data.data) {
            console.warn("Empty response (duplicate or backend issue)");
            return;
        }

        const fix = response.data.data;

        // 🔥 IMPORTANT FIX STARTS HERE

        // 1. Reset state (forces UI refresh)
        analysisStore.setAIFix(null);
        analysisStore.setSuggestedCode("");
        analysisStore.setCurrentCode("");

        // 2. Small async break (VERY IMPORTANT)
        await Promise.resolve();

        // 3. Set new data (new reference)
        analysisStore.setCurrentCode(fix.originalCode || "");
        analysisStore.setSuggestedCode(fix.fixedCode || "");
        analysisStore.setAIFix({ ...fix });

        // 🔥 IMPORTANT FIX ENDS HERE

    } catch (error) {
        console.error(error);
    } finally {
        analysisStore.setGeneratingIssueId(null);
    }
};