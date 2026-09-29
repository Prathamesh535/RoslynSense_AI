import axiosInstance from '../axiosInstance';

export const issueService = {
  getIssues: async (projectId, filters = {}) => {
    return axiosInstance.get('/issues', { params: { projectId, ...filters } });
  },

  getIssueDetails: async (issueId) => {
    return axiosInstance.get(`/issues/${issueId}`);
  }
};