import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';
import * as companyService from '../services/company.service.js';
import { getBookmarkedIds } from '../services/bookmark.service.js';

export const list = asyncHandler(async (req, res) => {
  const { category, search, page, limit } = req.query;
  const result = await companyService.listCompanies({ category, search, page, limit });

  const bookmarked = await getBookmarkedIds(req.user._id, 'company');
  const items = result.items.map((c) => ({ ...c.toObject(), isBookmarked: bookmarked.has(c._id.toString()) }));

  res.status(HTTP_STATUS.OK).json(new ApiResponse(HTTP_STATUS.OK, { ...result, items }, 'Companies'));
});

export const getOne = asyncHandler(async (req, res) => {
  const company = await companyService.getCompanyById(req.params.id);
  res.status(HTTP_STATUS.OK).json(new ApiResponse(HTTP_STATUS.OK, company, 'Company'));
});

export const addExperience = asyncHandler(async (req, res) => {
  const company = await companyService.addInterviewExperience(req.user._id, req.params.id, req.body);
  res.status(HTTP_STATUS.CREATED).json(new ApiResponse(HTTP_STATUS.CREATED, company, 'Interview experience added'));
});
