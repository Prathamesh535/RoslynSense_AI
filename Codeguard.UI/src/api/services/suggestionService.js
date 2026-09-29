import axiosInstance from '../axiosInstance';

export const suggestionService = {
  generateSuggestions: async (projectId, options = {}) => {
    return axiosInstance.post('/suggestions/generate', { projectId, ...options });
  },

  generateForEntireProject: async (projectId) => {
    return axiosInstance.post('/suggestions/entire-project', { projectId });
  },

  applyFix: async (issueId, fixData) => {
    return axiosInstance.post(`/issues/${issueId}/apply-fix`, fixData);
  }
};