import { create } from 'zustand';

export const useUploadStore = create((set) => ({
  uploads: [],
  recentProjects: [],

  addUpload: (file) => {
    const newUpload = {
      id: Date.now(),
      name: file.name || file,
      progress: 0,
      status: 'uploading',
      size: file.size ? (file.size / 1024 / 1024).toFixed(1) + ' MB' : 'N/A'
    };

    set(state => ({ uploads: [newUpload, ...state.uploads] }));

    // Mock progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 25;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        set(state => ({
          uploads: state.uploads.map(u => 
            u.id === newUpload.id ? { ...u, progress: 100, status: 'completed' } : u
          ),
          recentProjects: [{ name: newUpload.name, time: 'Just now' }, ...state.recentProjects].slice(0, 3)
        }));
      } else {
        set(state => ({
          uploads: state.uploads.map(u => 
            u.id === newUpload.id ? { ...u, progress } : u
          )
        }));
      }
    }, 300);
  },

  clearUploads: () => set({ uploads: [] })
}));