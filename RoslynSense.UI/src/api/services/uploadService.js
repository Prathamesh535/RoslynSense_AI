import axiosInstance from '../axiosInstance';

export const uploadService = {
  uploadZip: async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    return axiosInstance.post('/upload/zip', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (progressEvent) => {
        // Progress can be handled via React Query
      }
    });
  },

  importFromGitHub: async (repoUrl) => {
    return axiosInstance.post('/upload/github', { repoUrl });
  },

  pasteCode: async (code, language) => {
    return axiosInstance.post('/upload/paste', { code, language });
  }
};