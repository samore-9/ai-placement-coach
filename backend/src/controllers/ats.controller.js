import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';
import * as atsService from '../services/ats.service.js';

export const scan = asyncHandler(async (req, res) => {
  const report = await atsService.runATSScan(req.user._id, req.body);
  res.status(HTTP_STATUS.CREATED).json(new ApiResponse(HTTP_STATUS.CREATED, report, 'ATS scan complete'));
});

export const getLatest = asyncHandler(async (req, res) => {
  const report = await atsService.getLatestATSReport(req.user._id);
  res.status(HTTP_STATUS.OK).json(new ApiResponse(HTTP_STATUS.OK, report, 'Latest ATS report'));
});

export const getHistory = asyncHandler(async (req, res) => {
  const reports = await atsService.getATSHistory(req.user._id, Number(req.query.limit) || 10);
  res.status(HTTP_STATUS.OK).json(new ApiResponse(HTTP_STATUS.OK, reports, 'ATS report history'));
});

export const compare = asyncHandler(async (req, res) => {
  const { a, b } = await atsService.compareATSReports(req.user._id, req.params.reportIdA, req.params.reportIdB);
  res.status(HTTP_STATUS.OK).json(new ApiResponse(HTTP_STATUS.OK, { a, b }, 'ATS report comparison'));
});
