import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';
import * as adminService from '../services/admin.service.js';
import * as jobService from '../services/job.service.js';
import * as companyService from '../services/company.service.js';
import * as codingService from '../services/coding.service.js';
import * as interviewService from '../services/interview.service.js';

// ---------- Analytics ----------
export const getAnalytics = asyncHandler(async (req, res) => {
  const data = await adminService.getAnalyticsOverview();
  res.status(HTTP_STATUS.OK).json(new ApiResponse(HTTP_STATUS.OK, data, 'Analytics overview'));
});

// ---------- Users ----------
export const listUsers = asyncHandler(async (req, res) => {
  const data = await adminService.listUsers(req.query);
  res.status(HTTP_STATUS.OK).json(new ApiResponse(HTTP_STATUS.OK, data, 'Users'));
});

export const updateUser = asyncHandler(async (req, res) => {
  const user = await adminService.updateUserStatus(req.params.userId, req.body);
  res.status(HTTP_STATUS.OK).json(new ApiResponse(HTTP_STATUS.OK, user, 'User updated'));
});

// ---------- Announcements ----------
export const broadcastAnnouncement = asyncHandler(async (req, res) => {
  const result = await adminService.broadcastAnnouncement(req.body);
  res.status(HTTP_STATUS.CREATED).json(new ApiResponse(HTTP_STATUS.CREATED, result, 'Announcement sent'));
});

// ---------- Jobs ----------
export const listJobs = asyncHandler(async (req, res) => {
  const data = await jobService.adminListJobs(req.query);
  res.status(HTTP_STATUS.OK).json(new ApiResponse(HTTP_STATUS.OK, data, 'Jobs'));
});
export const createJob = asyncHandler(async (req, res) => {
  const job = await jobService.adminCreateJob(req.user._id, req.body);
  res.status(HTTP_STATUS.CREATED).json(new ApiResponse(HTTP_STATUS.CREATED, job, 'Job created'));
});
export const updateJob = asyncHandler(async (req, res) => {
  const job = await jobService.adminUpdateJob(req.params.jobId, req.body);
  res.status(HTTP_STATUS.OK).json(new ApiResponse(HTTP_STATUS.OK, job, 'Job updated'));
});
export const deleteJob = asyncHandler(async (req, res) => {
  await jobService.adminDeleteJob(req.params.jobId);
  res.status(HTTP_STATUS.OK).json(new ApiResponse(HTTP_STATUS.OK, null, 'Job deleted'));
});

// ---------- Companies ----------
export const listCompanies = asyncHandler(async (req, res) => {
  const data = await companyService.adminListCompanies(req.query);
  res.status(HTTP_STATUS.OK).json(new ApiResponse(HTTP_STATUS.OK, data, 'Companies'));
});
export const createCompany = asyncHandler(async (req, res) => {
  const company = await companyService.adminCreateCompany(req.body);
  res.status(HTTP_STATUS.CREATED).json(new ApiResponse(HTTP_STATUS.CREATED, company, 'Company created'));
});
export const updateCompany = asyncHandler(async (req, res) => {
  const company = await companyService.adminUpdateCompany(req.params.companyId, req.body);
  res.status(HTTP_STATUS.OK).json(new ApiResponse(HTTP_STATUS.OK, company, 'Company updated'));
});
export const deleteCompany = asyncHandler(async (req, res) => {
  await companyService.adminDeleteCompany(req.params.companyId);
  res.status(HTTP_STATUS.OK).json(new ApiResponse(HTTP_STATUS.OK, null, 'Company deleted'));
});

// ---------- Coding Questions ----------
export const listCodingQuestions = asyncHandler(async (req, res) => {
  const data = await codingService.adminListQuestions(req.query);
  res.status(HTTP_STATUS.OK).json(new ApiResponse(HTTP_STATUS.OK, data, 'Coding questions'));
});
export const createCodingQuestion = asyncHandler(async (req, res) => {
  const question = await codingService.adminCreateQuestion(req.body);
  res.status(HTTP_STATUS.CREATED).json(new ApiResponse(HTTP_STATUS.CREATED, question, 'Question created'));
});
export const updateCodingQuestion = asyncHandler(async (req, res) => {
  const question = await codingService.adminUpdateQuestion(req.params.questionId, req.body);
  res.status(HTTP_STATUS.OK).json(new ApiResponse(HTTP_STATUS.OK, question, 'Question updated'));
});
export const deleteCodingQuestion = asyncHandler(async (req, res) => {
  await codingService.adminDeleteQuestion(req.params.questionId);
  res.status(HTTP_STATUS.OK).json(new ApiResponse(HTTP_STATUS.OK, null, 'Question deleted'));
});

// ---------- Interview Questions ----------
export const listInterviewQuestions = asyncHandler(async (req, res) => {
  const data = await interviewService.adminListQuestions(req.query);
  res.status(HTTP_STATUS.OK).json(new ApiResponse(HTTP_STATUS.OK, data, 'Interview questions'));
});
export const createInterviewQuestion = asyncHandler(async (req, res) => {
  const question = await interviewService.adminCreateQuestion(req.body);
  res.status(HTTP_STATUS.CREATED).json(new ApiResponse(HTTP_STATUS.CREATED, question, 'Question created'));
});
export const updateInterviewQuestion = asyncHandler(async (req, res) => {
  const question = await interviewService.adminUpdateQuestion(req.params.questionId, req.body);
  res.status(HTTP_STATUS.OK).json(new ApiResponse(HTTP_STATUS.OK, question, 'Question updated'));
});
export const deleteInterviewQuestion = asyncHandler(async (req, res) => {
  await interviewService.adminDeleteQuestion(req.params.questionId);
  res.status(HTTP_STATUS.OK).json(new ApiResponse(HTTP_STATUS.OK, null, 'Question deleted'));
});
