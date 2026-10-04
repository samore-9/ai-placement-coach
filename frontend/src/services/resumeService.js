import { api } from './api';

export const resumeService = {
  upload: (file) => {
    const formData = new FormData();
    formData.append('resume', file);
    return api.post('/resumes', formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then((r) => r.data.data);
  },
  getActive: () => api.get('/resumes/active').then((r) => r.data.data),
  getHistory: () => api.get('/resumes/history').then((r) => r.data.data),
  getOne: (id) => api.get(`/resumes/${id}`).then((r) => r.data.data),
  remove: (id) => api.delete(`/resumes/${id}`).then((r) => r.data),
};
