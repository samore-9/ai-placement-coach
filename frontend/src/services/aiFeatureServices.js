import { api } from './api';

export const atsService = {
  scan: (payload) => api.post('/ats/scan', payload).then((r) => r.data.data),
  getLatest: () => api.get('/ats/latest').then((r) => r.data.data),
  getHistory: (limit = 10) => api.get(`/ats/history?limit=${limit}`).then((r) => r.data.data),
};

export const skillGapService = {
  analyze: (payload) => api.post('/skill-gap/analyze', payload).then((r) => r.data.data),
  getCompanies: () => api.get('/skill-gap/companies').then((r) => r.data.data),
};

export const roadmapService = {
  create: (payload) => api.post('/roadmaps', payload).then((r) => r.data.data),
  getActive: () => api.get('/roadmaps/active').then((r) => r.data.data),
  getHistory: () => api.get('/roadmaps/history').then((r) => r.data.data),
  updateMilestone: (roadmapId, milestoneId, status) =>
    api.patch(`/roadmaps/${roadmapId}/milestones/${milestoneId}`, { status }).then((r) => r.data.data),
  toggleWeek: (roadmapId, weekNumber, completed) =>
    api.patch(`/roadmaps/${roadmapId}/weeks/${weekNumber}`, { completed }).then((r) => r.data.data),
};

export const mockInterviewService = {
  start: (payload) => api.post('/mock-interview/start', payload).then((r) => r.data.data),
  submit: (payload) => api.post('/mock-interview/submit', payload).then((r) => r.data.data),
};
