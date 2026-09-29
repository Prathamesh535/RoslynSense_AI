import axiosInstance from '../axiosInstance';

export const analysisService = {
  analyzeProject: async (projectId) => {
    return axiosInstance.post('/analysis', { projectId });
  },

  getAnalysisStatus: async (analysisId) => {
    return axiosInstance.get(`/analysis/${analysisId}/status`);
  }
};