import { api } from './api';

const qs = (params) => {
  const clean = Object.fromEntries(Object.entries(params || {}).filter(([, v]) => v !== undefined && v !== ''));
  return new URLSearchParams(clean).toString();
};

export const codingService = {
  list: (params) => api.get(`/coding-questions?${qs(params)}`).then((r) => r.data.data),
  getOne: (slug) => api.get(`/coding-questions/${slug}`).then((r) => r.data.data),
  getTopics: () => api.get('/coding-questions/topics').then((r) => r.data.data),
  getCompanyTags: () => api.get('/coding-questions/company-tags').then((r) => r.data.data),
  markSolved: (questionId) => api.post(`/coding-questions/${questionId}/solve`).then((r) => r.data.data),
};

export const interviewQuestionService = {
  list: (params) => api.get(`/interview-questions?${qs(params)}`).then((r) => r.data.data),
  getOne: (id) => api.get(`/interview-questions/${id}`).then((r) => r.data.data),
  getCompanies: () => api.get('/interview-questions/companies').then((r) => r.data.data),
};

export const bookmarkService = {
  toggle: (itemType, itemId) => api.post('/bookmarks/toggle', { itemType, itemId }).then((r) => r.data.data),
  list: (itemType) => api.get(`/bookmarks${itemType ? `?itemType=${itemType}` : ''}`).then((r) => r.data.data),
};

export const companyService = {
  list: (params) => api.get(`/companies?${qs(params)}`).then((r) => r.data.data),
  getOne: (id) => api.get(`/companies/${id}`).then((r) => r.data.data),
  addExperience: (id, payload) => api.post(`/companies/${id}/experiences`, payload).then((r) => r.data.data),
};

export const jobService = {
  list: (params) => api.get(`/jobs?${qs(params)}`).then((r) => r.data.data),
  getOne: (id) => api.get(`/jobs/${id}`).then((r) => r.data.data),
  apply: (id, payload) => api.post(`/jobs/${id}/apply`, payload).then((r) => r.data.data),
  myApplications: () => api.get('/jobs/applications/mine').then((r) => r.data.data),
  withdraw: (applicationId) => api.patch(`/jobs/applications/${applicationId}/withdraw`).then((r) => r.data.data),
};
