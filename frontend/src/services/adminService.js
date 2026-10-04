import { api } from './api';

const qs = (params) => {
  const clean = Object.fromEntries(Object.entries(params || {}).filter(([, v]) => v !== undefined && v !== ''));
  return new URLSearchParams(clean).toString();
};

export const adminService = {
  getAnalytics: () => api.get('/admin/analytics').then((r) => r.data.data),

  listUsers: (params) => api.get(`/admin/users?${qs(params)}`).then((r) => r.data.data),
  updateUser: (userId, payload) => api.patch(`/admin/users/${userId}`, payload).then((r) => r.data.data),

  broadcastAnnouncement: (payload) => api.post('/admin/announcements', payload).then((r) => r.data.data),

  listJobs: (params) => api.get(`/admin/jobs?${qs(params)}`).then((r) => r.data.data),
  createJob: (payload) => api.post('/admin/jobs', payload).then((r) => r.data.data),
  updateJob: (id, payload) => api.patch(`/admin/jobs/${id}`, payload).then((r) => r.data.data),
  deleteJob: (id) => api.delete(`/admin/jobs/${id}`).then((r) => r.data),

  listCompanies: (params) => api.get(`/admin/companies?${qs(params)}`).then((r) => r.data.data),
  createCompany: (payload) => api.post('/admin/companies', payload).then((r) => r.data.data),
  updateCompany: (id, payload) => api.patch(`/admin/companies/${id}`, payload).then((r) => r.data.data),
  deleteCompany: (id) => api.delete(`/admin/companies/${id}`).then((r) => r.data),

  listCodingQuestions: (params) => api.get(`/admin/coding-questions?${qs(params)}`).then((r) => r.data.data),
  createCodingQuestion: (payload) => api.post('/admin/coding-questions', payload).then((r) => r.data.data),
  updateCodingQuestion: (id, payload) => api.patch(`/admin/coding-questions/${id}`, payload).then((r) => r.data.data),
  deleteCodingQuestion: (id) => api.delete(`/admin/coding-questions/${id}`).then((r) => r.data),

  listInterviewQuestions: (params) => api.get(`/admin/interview-questions?${qs(params)}`).then((r) => r.data.data),
  createInterviewQuestion: (payload) => api.post('/admin/interview-questions', payload).then((r) => r.data.data),
  updateInterviewQuestion: (id, payload) => api.patch(`/admin/interview-questions/${id}`, payload).then((r) => r.data.data),
  deleteInterviewQuestion: (id) => api.delete(`/admin/interview-questions/${id}`).then((r) => r.data),
};
