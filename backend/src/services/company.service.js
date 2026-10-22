import { Company } from '../models/Company.js';
import { ApiError } from '../utils/ApiError.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';

export const listCompanies = async ({ category, search, page = 1, limit = 20 }) => {
  const filter = { isActive: true };
  if (category) filter.category = category;
  if (search) filter.$text = { $search: search };

  const skip = (page - 1) * limit;
  const [items, total] = await Promise.all([
    Company.find(filter).sort({ name: 1 }).skip(skip).limit(limit),
    Company.countDocuments(filter),
  ]);

  return { items, total, page: Number(page), pages: Math.ceil(total / limit) };
};

export const getCompanyById = async (id) => {
  const company = await Company.findById(id);
  if (!company) throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Company not found');
  return company;
};

export const addInterviewExperience = async (userId, companyId, { title, content, role, result }) => {
  const company = await Company.findById(companyId);
  if (!company) throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Company not found');

  company.interviewExperiences.push({ title, content, role, result, submittedBy: userId });
  await company.save();
  return company;
};

// ---------- Admin ----------

export const adminListCompanies = async ({ page = 1, limit = 20 } = {}) => {
  const skip = (page - 1) * limit;
  const [items, total] = await Promise.all([
    Company.find({}).sort({ name: 1 }).skip(skip).limit(limit),
    Company.countDocuments({}),
  ]);
  return { items, total, page: Number(page), pages: Math.ceil(total / limit) };
};

export const adminCreateCompany = async (payload) => Company.create(payload);

export const adminUpdateCompany = async (companyId, payload) => {
  const company = await Company.findByIdAndUpdate(companyId, payload, { new: true, runValidators: true });
  if (!company) throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Company not found');
  return company;
};

export const adminDeleteCompany = async (companyId) => {
  const company = await Company.findByIdAndDelete(companyId);
  if (!company) throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Company not found');
};
