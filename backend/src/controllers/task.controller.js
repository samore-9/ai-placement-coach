import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';
import { getTodayTasks, completeTask } from '../services/task.service.js';

export const listToday = asyncHandler(async (req, res) => {
  const tasks = await getTodayTasks(req.user._id);
  res.status(HTTP_STATUS.OK).json(new ApiResponse(HTTP_STATUS.OK, tasks, "Today's tasks"));
});

export const markComplete = asyncHandler(async (req, res) => {
  const task = await completeTask(req.user._id, req.params.taskId);
  res.status(HTTP_STATUS.OK).json(new ApiResponse(HTTP_STATUS.OK, task, 'Task completed'));
});
