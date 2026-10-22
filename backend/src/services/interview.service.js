import { InterviewQuestion } from '../models/InterviewQuestion.js';
import { ApiError } from '../utils/ApiError.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';

export const listQuestions = async ({ company, topic, difficulty, search, page = 1, limit = 20 }) => {
  const filter = { isActive: true };
  if (company) filter.company = new RegExp(`^${company}$`, 'i');
  if (topic) filter.topic = topic;
  if (difficulty) filter.difficulty = difficulty;
  if (search) filter.question = new RegExp(search, 'i');

  const skip = (page - 1) * limit;
  const [items, total] = await Promise.all([
    InterviewQuestion.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    InterviewQuestion.countDocuments(filter),
  ]);

  return { items, total, page: Number(page), pages: Math.ceil(total / limit) };
};

export const getQuestionById = async (id) => {
  const question = await InterviewQuestion.findById(id);
  if (!question) throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Question not found');
  return question;
};

export const getCompaniesList = async () => {
  const companies = await InterviewQuestion.distinct('company', { company: { $ne: null, $ne: '' } });
  return companies.sort();
};

// ---------- Admin ----------

export const adminListQuestions = async ({ page = 1, limit = 20 } = {}) => {
  const skip = (page - 1) * limit;
  const [items, total] = await Promise.all([
    InterviewQuestion.find({}).sort({ createdAt: -1 }).skip(skip).limit(limit),
    InterviewQuestion.countDocuments({}),
  ]);
  return { items, total, page: Number(page), pages: Math.ceil(total / limit) };
};

export const adminCreateQuestion = async (payload) => InterviewQuestion.create(payload);

export const adminUpdateQuestion = async (questionId, payload) => {
  const question = await InterviewQuestion.findByIdAndUpdate(questionId, payload, { new: true, runValidators: true });
  if (!question) throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Question not found');
  return question;
};

export const adminDeleteQuestion = async (questionId) => {
  const question = await InterviewQuestion.findByIdAndDelete(questionId);
  if (!question) throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Question not found');
};
