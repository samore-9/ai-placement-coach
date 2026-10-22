import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';
import * as skillGapService from '../services/skillGap.service.js';

export const analyze = asyncHandler(async (req, res) => {
  const result = await skillGapService.runSkillGapAnalysis(req.user._id, req.body);
  res.status(HTTP_STATUS.OK).json(new ApiResponse(HTTP_STATUS.OK, result, 'Skill gap analysis complete'));
});

export const listCompanies = asyncHandler(async (req, res) => {
  const companies = skillGapService.getSupportedCompanies();
  res.status(HTTP_STATUS.OK).json(new ApiResponse(HTTP_STATUS.OK, companies, 'Supported companies'));
});
