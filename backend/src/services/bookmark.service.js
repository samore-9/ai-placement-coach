import { Bookmark } from '../models/Bookmark.js';
import { ApiError } from '../utils/ApiError.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';

const MODEL_REF = {
  job: 'Job',
  coding_question: 'CodingQuestion',
  interview_question: 'InterviewQuestion',
  company: 'Company',
};

export const toggleBookmark = async (userId, itemType, itemId) => {
  const itemTypeRef = MODEL_REF[itemType];
  if (!itemTypeRef) throw new ApiError(HTTP_STATUS.BAD_REQUEST, 'Invalid bookmark item type');

  const existing = await Bookmark.findOne({ user: userId, itemType, itemId });
  if (existing) {
    await existing.deleteOne();
    return { bookmarked: false };
  }

  await Bookmark.create({ user: userId, itemType, itemId, itemTypeRef });
  return { bookmarked: true };
};

export const listBookmarks = async (userId, itemType) => {
  const filter = { user: userId };
  if (itemType) filter.itemType = itemType;
  return Bookmark.find(filter).populate('itemId').sort({ createdAt: -1 });
};

export const getBookmarkedIds = async (userId, itemType) => {
  const bookmarks = await Bookmark.find({ user: userId, itemType }).select('itemId');
  return new Set(bookmarks.map((b) => b.itemId.toString()));
};
