import { Profile } from '../models/Profile.js';
import { Company } from '../models/Company.js';
import { ApiError } from '../utils/ApiError.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';
import { analyzeSkillGap } from './ai/skillGapAnalyzer.js';

const SUPPORTED_COMPANIES = [
  'Google', 'Amazon', 'Microsoft', 'Apple', 'Meta', 'Netflix', 'Adobe', 'Oracle',
  'Salesforce', 'Atlassian', 'Flipkart', 'Swiggy', 'Zomato', 'Uber',
];

export const getSupportedCompanies = () => SUPPORTED_COMPANIES;

export const runSkillGapAnalysis = async (userId, { targetCompany, targetRole }) => {
  const profile = await Profile.findOne({ user: userId });
  if (!profile) throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Complete your profile before running a skill gap analysis');

  const role = targetRole || profile.careerInterests?.preferredRole;
  const company = targetCompany || profile.careerInterests?.preferredCompany;

  if (!company) {
    throw new ApiError(HTTP_STATUS.BAD_REQUEST, 'Set a target company (or pass one in the request) to run this analysis');
  }

  const result = await analyzeSkillGap(profile.skills || [], company, role);

  // Enrich with the Company doc's requiredSkills if an admin-curated profile
  // exists for this company (Phase 10), for a slightly more grounded match.
  const companyDoc = await Company.findOne({ name: new RegExp(`^${company}$`, 'i') }).select('requiredSkills');

  return {
    targetCompany: company,
    targetRole: role,
    currentSkills: profile.skills || [],
    companyRequiredSkills: companyDoc?.requiredSkills || [],
    ...result,
  };
};
