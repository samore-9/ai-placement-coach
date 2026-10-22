import { CodingQuestion } from '../models/CodingQuestion.js';
import { Bookmark } from '../models/Bookmark.js';
import { ApiError } from '../utils/ApiError.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';
import { upsertTodayProgress, getTodaySummary } from './progress.service.js';

const TOPICS = [
  'arrays', 'strings', 'hashmap', 'stack', 'queue', 'trees', 'bst', 'heap', 'trie',
  'graphs', 'dp', 'greedy', 'sliding_window', 'binary_search', 'bit_manipulation',
  'recursion', 'backtracking', 'system_design_basics',
];

export const listQuestions = async ({ topic, difficulty, company, sheet, search, page = 1, limit = 20 }) => {
  const filter = { isActive: true };
  if (topic) filter.topics = topic;
  if (difficulty) filter.difficulty = difficulty;
  if (company) filter.companyTags = new RegExp(`^${company}$`, 'i');
  if (sheet) filter.sheetTags = sheet;
  if (search) filter.title = new RegExp(search, 'i');

  const skip = (page - 1) * limit;
  const [items, total] = await Promise.all([
    CodingQuestion.find(filter).sort({ order: 1, createdAt: 1 }).skip(skip).limit(limit),
    CodingQuestion.countDocuments(filter),
  ]);

  return { items, total, page: Number(page), pages: Math.ceil(total / limit) };
};

export const getQuestionBySlug = async (slug) => {
  const question = await CodingQuestion.findOne({ slug, isActive: true });
  if (!question) throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Question not found');
  return question;
};

export const getTopicsList = () => TOPICS;

export const getCompanyTagsList = async () => {
  const tags = await CodingQuestion.distinct('companyTags');
  return tags.sort();
};

// Marks a question "solved" for the day — increments streak/XP into Progress.
// (No dedicated per-user solved-questions collection was in the Phase 3 DB
// design; solve history is tracked via Progress.codingStats aggregates and
// Bookmark(itemType: 'coding_question') covers save-for-later separately.)
export const markQuestionSolved = async (userId, questionId) => {
  const question = await CodingQuestion.findById(questionId);
  if (!question) throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Question not found');

  const today = await getTodaySummary(userId);
  const alreadySolvedToday = today?.codingStats?.solvedToday ?? 0;
  const totalSolved = (today?.codingStats?.totalSolved ?? 0) + 1;

  // Streak increments once per calendar day the user solves at least one
  // question; if today already has a solve, streak doesn't double-increment.
  const previousStreak = today?.codingStats?.streak ?? 0;
  const streak = alreadySolvedToday > 0 ? previousStreak : previousStreak + 1;

  await upsertTodayProgress(userId, {
    'codingStats.solvedToday': alreadySolvedToday + 1,
    'codingStats.totalSolved': totalSolved,
    'codingStats.streak': streak,
    xpEarned: (today?.xpEarned ?? 0) + 15,
    totalXp: (today?.totalXp ?? 0) + 15,
  });

  return { question, totalSolved, streak };
};

// ---------- Admin ----------

export const adminListQuestions = async ({ page = 1, limit = 20 } = {}) => {
  const skip = (page - 1) * limit;
  const [items, total] = await Promise.all([
    CodingQuestion.find({}).sort({ order: 1, createdAt: -1 }).skip(skip).limit(limit),
    CodingQuestion.countDocuments({}),
  ]);
  return { items, total, page: Number(page), pages: Math.ceil(total / limit) };
};

export const adminCreateQuestion = async (payload) => CodingQuestion.create(payload);

export const adminUpdateQuestion = async (questionId, payload) => {
  const question = await CodingQuestion.findByIdAndUpdate(questionId, payload, { new: true, runValidators: true });
  if (!question) throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Question not found');
  return question;
};

export const adminDeleteQuestion = async (questionId) => {
  const question = await CodingQuestion.findByIdAndDelete(questionId);
  if (!question) throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Question not found');
};
