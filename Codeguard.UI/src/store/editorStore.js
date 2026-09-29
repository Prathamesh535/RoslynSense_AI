import { create } from "zustand";

export const useEditorStore = create((set, get) => ({

  openFiles: [],
  activeFileId: null,
  editor: null,

  setActiveFile: (id) =>
    set({
      activeFileId: id,
    }),
    setEditor: (editor) =>
    set({
        editor,
    }),
  openFile: (file) => {
    const { openFiles } = get();

    // If file already exists, just activate it
    const existing = openFiles.find(
      (f) => f.name === file.name
    );

    if (existing) {
      set({
        activeFileId: existing.id,
      });
      return;
    }

    set({
      openFiles: [...openFiles, file],
      activeFileId: file.id,
    });
  },

  closeFile: (id) => {
    const { openFiles, activeFileId } = get();

    const filteredFiles = openFiles.filter(
      (file) => file.id !== id
    );

    let newActiveFileId = activeFileId;

    if (activeFileId === id) {
      newActiveFileId =
        filteredFiles.length > 0
          ? filteredFiles[filteredFiles.length - 1].id
          : null;
    }

    set({
      openFiles: filteredFiles,
      activeFileId: newActiveFileId,
    });
  },

  updateFileContent: (id, content) => {
    set((state) => ({
      openFiles: state.openFiles.map((file) =>
        file.id === id
          ? {
              ...file,
              content,
            }
          : file
      ),
    }));
  },
  updateFileMetadata: (id, metadata) => {
  set((state) => ({
    openFiles: state.openFiles.map((file) =>
      file.id === id
        ? {
            ...file,
            ...metadata,
          }
        : file
    ),
  }));
},
  clearEditor: () =>
    set({
      openFiles: [],
      activeFileId: null,
    }),
}));
