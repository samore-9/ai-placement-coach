import { api } from './api';

export const dashboardService = {
  getOverview: () => api.get('/dashboard/overview').then((r) => r.data.data),
};

export const progressService = {
  getHistory: (days = 30) => api.get(`/progress/history?days=${days}`).then((r) => r.data.data),
  getSummary: () => api.get('/progress/summary').then((r) => r.data.data),
  getHeatmap: (days = 182) => api.get(`/progress/heatmap?days=${days}`).then((r) => r.data.data),
  getWeekly: (weeks = 12) => api.get(`/progress/weekly?weeks=${weeks}`).then((r) => r.data.data),
  getAchievements: () => api.get('/progress/achievements').then((r) => r.data.data),
};

export const taskService = {
  getToday: () => api.get('/tasks/today').then((r) => r.data.data),
  complete: (taskId) => api.patch(`/tasks/${taskId}/complete`).then((r) => r.data.data),
};
