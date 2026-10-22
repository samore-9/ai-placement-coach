import { Task } from '../models/Task.js';
import { ApiError } from '../utils/ApiError.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';
import { upsertTodayProgress, getTodaySummary } from './progress.service.js';

const startOfToday = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
};

export const getTodayTasks = async (userId) => {
  return Task.find({ user: userId, date: { $gte: startOfToday() } }).sort({ createdAt: 1 });
};

export const completeTask = async (userId, taskId) => {
  const task = await Task.findOne({ _id: taskId, user: userId });
  if (!task) throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Task not found');
  if (task.status === 'completed') return task;

  task.status = 'completed';
  task.completedAt = new Date();
  await task.save();

  const today = await getTodaySummary(userId);
  const currentXp = today?.totalXp ?? 0;
  await upsertTodayProgress(userId, {
    xpEarned: (today?.xpEarned ?? 0) + task.xpReward,
    totalXp: currentXp + task.xpReward,
  });

  return task;
};
