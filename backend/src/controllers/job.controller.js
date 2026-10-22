import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';
import * as jobService from '../services/job.service.js';
import { getBookmarkedIds } from '../services/bookmark.service.js';

export const list = asyncHandler(async (req, res) => {
  const { jobType, location, minCgpa, batch, skill, search, page, limit } = req.query;
  const result = await jobService.listJobs({ jobType, location, minCgpa, batch, skill, search, page, limit });

  const bookmarked = await getBookmarkedIds(req.user._id, 'job');
  const items = result.items.map((j) => ({ ...j.toObject(), isBookmarked: bookmarked.has(j._id.toString()) }));

  res.status(HTTP_STATUS.OK).json(new ApiResponse(HTTP_STATUS.OK, { ...result, items }, 'Jobs'));
});

export const getOne = asyncHandler(async (req, res) => {
  const job = await jobService.getJobById(req.params.id);
  res.status(HTTP_STATUS.OK).json(new ApiResponse(HTTP_STATUS.OK, job, 'Job'));
});

export const apply = asyncHandler(async (req, res) => {
  const application = await jobService.applyToJob(req.user._id, req.params.id, req.body);
  res.status(HTTP_STATUS.CREATED).json(new ApiResponse(HTTP_STATUS.CREATED, application, 'Application submitted'));
});

export const myApplications = asyncHandler(async (req, res) => {
  const applications = await jobService.getMyApplications(req.user._id);
  res.status(HTTP_STATUS.OK).json(new ApiResponse(HTTP_STATUS.OK, applications, 'Your applications'));
});

export const withdraw = asyncHandler(async (req, res) => {
  const application = await jobService.withdrawApplication(req.user._id, req.params.applicationId);
  res.status(HTTP_STATUS.OK).json(new ApiResponse(HTTP_STATUS.OK, application, 'Application withdrawn'));
});
