import { Roadmap } from '../models/Roadmap.js';
import { Profile } from '../models/Profile.js';
import { ApiError } from '../utils/ApiError.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';
import { generateRoadmap } from './ai/roadmapGenerator.js';
import { upsertTodayProgress } from './progress.service.js';

const recalculateCompletion = (roadmap) => {
  const total = roadmap.milestones.length;
  const done = roadmap.milestones.filter((m) => m.status === 'completed').length;
  roadmap.completionPercentage = total ? Math.round((done / total) * 100) : 0;
  return roadmap;
};

export const createRoadmap = async (userId, { targetCompany, targetRole, currentLevel, timelineWeeks = 12 }) => {
  const profile = await Profile.findOne({ user: userId });

  const generated = await generateRoadmap({
    currentLevel: currentLevel || 'beginner',
    currentSkills: profile?.skills || [],
    targetCompany,
    targetRole,
    timelineWeeks,
  });

  // Archive any existing active roadmap rather than deleting it — a student
  // may pivot target companies mid-prep and want history preserved.
  await Roadmap.updateMany({ user: userId, status: 'active' }, { status: 'archived' });

  const roadmap = await Roadmap.create({
    user: userId,
    targetCompany,
    targetRole,
    currentLevel: currentLevel || 'beginner',
    requiredSkills: generated.requiredSkills,
    milestones: generated.milestones,
    weeklyTasks: generated.weeklyTasks,
    monthlyTasks: generated.monthlyTasks,
    completionPercentage: 0,
    status: 'active',
    generatedByAI: true,
  });

  return roadmap;
};

export const getActiveRoadmap = async (userId) => {
  const roadmap = await Roadmap.findOne({ user: userId, status: 'active' }).sort({ createdAt: -1 });
  if (!roadmap) throw new ApiError(HTTP_STATUS.NOT_FOUND, 'No active roadmap. Generate one to get started.');
  return roadmap;
};

export const getRoadmapHistory = async (userId) => {
  return Roadmap.find({ user: userId }).sort({ createdAt: -1 }).select('targetCompany targetRole status completionPercentage createdAt');
};

export const updateMilestoneStatus = async (userId, roadmapId, milestoneId, status) => {
  const roadmap = await Roadmap.findOne({ _id: roadmapId, user: userId });
  if (!roadmap) throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Roadmap not found');

  const milestone = roadmap.milestones.id(milestoneId);
  if (!milestone) throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Milestone not found');

  milestone.status = status;
  if (status === 'completed') milestone.completedAt = new Date();

  recalculateCompletion(roadmap);
  await roadmap.save();

  await upsertTodayProgress(userId, { roadmapCompletion: roadmap.completionPercentage });

  return roadmap;
};

export const toggleWeeklyTask = async (userId, roadmapId, weekNumber, completed) => {
  const roadmap = await Roadmap.findOne({ _id: roadmapId, user: userId });
  if (!roadmap) throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Roadmap not found');

  const week = roadmap.weeklyTasks.find((w) => w.week === Number(weekNumber));
  if (!week) throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Week not found in this roadmap');

  week.completed = completed;
  await roadmap.save();
  return roadmap;
};
