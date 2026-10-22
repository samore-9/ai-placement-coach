import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';
import * as bookmarkService from '../services/bookmark.service.js';

export const toggle = asyncHandler(async (req, res) => {
  const result = await bookmarkService.toggleBookmark(req.user._id, req.body.itemType, req.body.itemId);
  res.status(HTTP_STATUS.OK).json(new ApiResponse(HTTP_STATUS.OK, result, result.bookmarked ? 'Bookmarked' : 'Bookmark removed'));
});

export const list = asyncHandler(async (req, res) => {
  const bookmarks = await bookmarkService.listBookmarks(req.user._id, req.query.itemType);
  res.status(HTTP_STATUS.OK).json(new ApiResponse(HTTP_STATUS.OK, bookmarks, 'Bookmarks'));
});
