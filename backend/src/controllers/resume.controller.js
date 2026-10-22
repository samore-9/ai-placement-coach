import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';
import * as resumeService from '../services/resume.service.js';

export const uploadResume = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ApiError(HTTP_STATUS.BAD_REQUEST, 'A resume PDF file is required');
  }
  const resume = await resumeService.uploadAndAnalyzeResume(req.user._id, req.file);
  res.status(HTTP_STATUS.CREATED).json(new ApiResponse(HTTP_STATUS.CREATED, resume, 'Resume uploaded and analyzed'));
});

export const getActive = asyncHandler(async (req, res) => {
  const resume = await resumeService.getActiveResume(req.user._id);
  res.status(HTTP_STATUS.OK).json(new ApiResponse(HTTP_STATUS.OK, resume, 'Active resume'));
});

export const getHistory = asyncHandler(async (req, res) => {
  const history = await resumeService.getResumeHistory(req.user._id);
  res.status(HTTP_STATUS.OK).json(new ApiResponse(HTTP_STATUS.OK, history, 'Resume history'));
});

export const getOne = asyncHandler(async (req, res) => {
  const resume = await resumeService.getResumeById(req.user._id, req.params.resumeId);
  res.status(HTTP_STATUS.OK).json(new ApiResponse(HTTP_STATUS.OK, resume, 'Resume'));
});

export const remove = asyncHandler(async (req, res) => {
  await resumeService.deleteResume(req.user._id, req.params.resumeId);
  res.status(HTTP_STATUS.OK).json(new ApiResponse(HTTP_STATUS.OK, null, 'Resume deleted'));
});
