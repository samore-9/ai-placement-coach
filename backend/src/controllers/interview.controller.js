import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';
import * as interviewService from '../services/interview.service.js';
import { getBookmarkedIds } from '../services/bookmark.service.js';

export const list = asyncHandler(async (req, res) => {
  const { company, topic, difficulty, search, page, limit } = req.query;
  const result = await interviewService.listQuestions({ company, topic, difficulty, search, page, limit });

  const bookmarked = await getBookmarkedIds(req.user._id, 'interview_question');
  const items = result.items.map((q) => ({ ...q.toObject(), isBookmarked: bookmarked.has(q._id.toString()) }));

  res.status(HTTP_STATUS.OK).json(new ApiResponse(HTTP_STATUS.OK, { ...result, items }, 'Interview questions'));
});

export const getOne = asyncHandler(async (req, res) => {
  const question = await interviewService.getQuestionById(req.params.id);
  res.status(HTTP_STATUS.OK).json(new ApiResponse(HTTP_STATUS.OK, question, 'Interview question'));
});

export const getCompanies = asyncHandler(async (req, res) => {
  const companies = await interviewService.getCompaniesList();
  res.status(HTTP_STATUS.OK).json(new ApiResponse(HTTP_STATUS.OK, companies, 'Companies'));
});
