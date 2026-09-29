import { create } from "zustand";

export const useAnalysisStore = create((set) => ({
  // ============================
  // Analysis State
  // ============================

  status: "idle", // idle | analyzing | completed | failed

  progress: 0,
  message: "",
  currentFile: null,

  issues: [],

  summary: {
    totalFiles: 0,
    totalLines: 0,
    errors: 0,
    warnings: 0,
    codeSmells: 0,
    timeComplexity: "-",
    spaceComplexity: "-",
  },

  aiSuggestion: null,
  analysis: null,
  aiFix: null,
  currentCode: "",
suggestedCode: "",
selectedIssue: null,
generatingIssueId: null,

  // ============================
  // Actions
  // ============================

  setStatus: (status) =>
    set({
      status,
    }),

  setCurrentFile: (file) =>
    set({
      currentFile: file,
    }),

  setIssues: (issues) =>
    set({
      issues,
    }),

  setSummary: (summary) =>
    set({
      summary,
    }),

  setAISuggestion: (suggestion) =>
    set({
      aiSuggestion: suggestion,
    }),

    setProgress: (progress) =>
  set({
    progress,
  }),

  setAnalysis: (analysis) =>
  set({
    analysis,
  }),

setMessage: (message) =>
  set({
    message,
  }),
  setCurrentCode: (code) =>
    set({
        currentCode: code,
    }),

setSuggestedCode: (code) =>
    set({
        suggestedCode: code,
    }),

setSelectedIssue: (issue) =>
    set({
        selectedIssue: issue,
    }),

setGeneratingIssueId: (id) =>
    set({
        generatingIssueId: id
    }),

setAIFix: (fix) => set({ aiFix: fix }),

  clearAnalysis: () =>
  set({
    status: "idle",

    progress: 0,
    message: "",

    currentFile: null,

    issues: [],

    aiSuggestion: null,
    analysis: null,
    aiFix: null,
    currentCode: "",
suggestedCode: "",
selectedIssue: null,
generatingIssueId: null,

    summary: {
      totalFiles: 0,
      totalLines: 0,
      errors: 0,
      warnings: 0,
      codeSmells: 0,
      timeComplexity: "-",
      spaceComplexity: "-",
    },
  }),
}));

