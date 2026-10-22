import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';
import * as mockInterviewService from '../services/mockInterview.service.js';

export const startRound = asyncHandler(async (req, res) => {
  const round = await mockInterviewService.startInterviewRound(req.body);
  res.status(HTTP_STATUS.OK).json(new ApiResponse(HTTP_STATUS.OK, round, 'Interview question generated'));
});

export const submitAnswer = asyncHandler(async (req, res) => {
  const evaluation = await mockInterviewService.submitInterviewAnswer(req.user._id, req.body);
  res.status(HTTP_STATUS.OK).json(new ApiResponse(HTTP_STATUS.OK, evaluation, 'Answer evaluated'));
});
