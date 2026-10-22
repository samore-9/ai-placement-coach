import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';
import * as roadmapService from '../services/roadmap.service.js';

export const create = asyncHandler(async (req, res) => {
  const roadmap = await roadmapService.createRoadmap(req.user._id, req.body);
  res.status(HTTP_STATUS.CREATED).json(new ApiResponse(HTTP_STATUS.CREATED, roadmap, 'Roadmap generated'));
});

export const getActive = asyncHandler(async (req, res) => {
  const roadmap = await roadmapService.getActiveRoadmap(req.user._id);
  res.status(HTTP_STATUS.OK).json(new ApiResponse(HTTP_STATUS.OK, roadmap, 'Active roadmap'));
});

export const getHistory = asyncHandler(async (req, res) => {
  const history = await roadmapService.getRoadmapHistory(req.user._id);
  res.status(HTTP_STATUS.OK).json(new ApiResponse(HTTP_STATUS.OK, history, 'Roadmap history'));
});

export const updateMilestone = asyncHandler(async (req, res) => {
  const roadmap = await roadmapService.updateMilestoneStatus(
    req.user._id,
    req.params.roadmapId,
    req.params.milestoneId,
    req.body.status
  );
  res.status(HTTP_STATUS.OK).json(new ApiResponse(HTTP_STATUS.OK, roadmap, 'Milestone updated'));
});

export const toggleWeek = asyncHandler(async (req, res) => {
  const roadmap = await roadmapService.toggleWeeklyTask(
    req.user._id,
    req.params.roadmapId,
    req.params.weekNumber,
    req.body.completed
  );
  res.status(HTTP_STATUS.OK).json(new ApiResponse(HTTP_STATUS.OK, roadmap, 'Week updated'));
});
