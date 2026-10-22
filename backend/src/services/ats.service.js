import { ATSReport } from '../models/ATSReport.js';
import { getActiveResumeWithText } from './resume.service.js';
import { scoreResumeATS } from './ai/atsScorer.js';
import { upsertTodayProgress } from './progress.service.js';

export const runATSScan = async (userId, { targetRole, targetCompany } = {}) => {
  const resume = await getActiveResumeWithText(userId);

  const result = await scoreResumeATS(resume.extractedText, { targetRole, targetCompany });

  const report = await ATSReport.create({
    user: userId,
    resume: resume._id,
    overallScore: result.overallScore,
    breakdown: result.breakdown,
    targetRole,
    targetCompany,
    suggestions: result.suggestions,
    matchedKeywords: result.matchedKeywords,
    missingKeywords: result.missingKeywords,
  });

  // Feed today's Progress snapshot so the dashboard's ATS score / history
  // chart (Phase 6) reflects this scan immediately.
  await upsertTodayProgress(userId, { atsScore: result.overallScore });

  return report;
};

export const getLatestATSReport = async (userId) => {
  return ATSReport.findOne({ user: userId }).sort({ createdAt: -1 });
};

export const getATSHistory = async (userId, limit = 10) => {
  return ATSReport.find({ user: userId }).sort({ createdAt: -1 }).limit(limit);
};

export const compareATSReports = async (userId, reportIdA, reportIdB) => {
  const [a, b] = await Promise.all([
    ATSReport.findOne({ _id: reportIdA, user: userId }),
    ATSReport.findOne({ _id: reportIdB, user: userId }),
  ]);
  return { a, b };
};
