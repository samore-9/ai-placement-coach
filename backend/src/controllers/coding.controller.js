import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';
import * as codingService from '../services/coding.service.js';
import { getBookmarkedIds } from '../services/bookmark.service.js';

export const list = asyncHandler(async (req, res) => {
  const { topic, difficulty, company, sheet, search, page, limit } = req.query;
  const result = await codingService.listQuestions({ topic, difficulty, company, sheet, search, page, limit });

  const bookmarked = await getBookmarkedIds(req.user._id, 'coding_question');
  const items = result.items.map((q) => ({ ...q.toObject(), isBookmarked: bookmarked.has(q._id.toString()) }));

  res.status(HTTP_STATUS.OK).json(new ApiResponse(HTTP_STATUS.OK, { ...result, items }, 'Coding questions'));
});

export const getOne = asyncHandler(async (req, res) => {
  const question = await codingService.getQuestionBySlug(req.params.slug);
  res.status(HTTP_STATUS.OK).json(new ApiResponse(HTTP_STATUS.OK, question, 'Coding question'));
});

export const getTopics = asyncHandler(async (req, res) => {
  res.status(HTTP_STATUS.OK).json(new ApiResponse(HTTP_STATUS.OK, codingService.getTopicsList(), 'Topics'));
});

export const getCompanyTags = asyncHandler(async (req, res) => {
  const tags = await codingService.getCompanyTagsList();
  res.status(HTTP_STATUS.OK).json(new ApiResponse(HTTP_STATUS.OK, tags, 'Company tags'));
});

export const markSolved = asyncHandler(async (req, res) => {
  const result = await codingService.markQuestionSolved(req.user._id, req.params.questionId);
  res.status(HTTP_STATUS.OK).json(new ApiResponse(HTTP_STATUS.OK, result, 'Marked as solved'));
});
