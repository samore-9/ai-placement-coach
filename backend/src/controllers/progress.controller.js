import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';
import {
  getProgressHistory,
  getTodaySummary,
  getHeatmapData,
  getWeeklySummary,
  getAllAchievements,
} from '../services/progress.service.js';

export const history = asyncHandler(async (req, res) => {
  const days = Math.min(Number(req.query.days) || 30, 180);
  const data = await getProgressHistory(req.user._id, days);
  res.status(HTTP_STATUS.OK).json(new ApiResponse(HTTP_STATUS.OK, data, 'Progress history'));
});

export const summary = asyncHandler(async (req, res) => {
  const data = await getTodaySummary(req.user._id);
  res.status(HTTP_STATUS.OK).json(new ApiResponse(HTTP_STATUS.OK, data, "Today's progress summary"));
});

export const heatmap = asyncHandler(async (req, res) => {
  const days = Math.min(Number(req.query.days) || 182, 365);
  const data = await getHeatmapData(req.user._id, days);
  res.status(HTTP_STATUS.OK).json(new ApiResponse(HTTP_STATUS.OK, data, 'Heatmap data'));
});

export const weekly = asyncHandler(async (req, res) => {
  const weeks = Math.min(Number(req.query.weeks) || 12, 52);
  const data = await getWeeklySummary(req.user._id, weeks);
  res.status(HTTP_STATUS.OK).json(new ApiResponse(HTTP_STATUS.OK, data, 'Weekly summary'));
});

export const achievements = asyncHandler(async (req, res) => {
  const data = await getAllAchievements(req.user._id);
  res.status(HTTP_STATUS.OK).json(new ApiResponse(HTTP_STATUS.OK, data, 'Achievements'));
});
