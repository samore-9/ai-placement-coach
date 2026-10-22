import { Resume } from '../models/Resume.js';
import { Profile } from '../models/Profile.js';
import { ApiError } from '../utils/ApiError.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';
import { uploadBufferToCloudinary, deleteFromCloudinary } from '../utils/cloudinaryUpload.js';
import { extractTextFromPdf } from '../utils/pdfText.js';
import { analyzeResume } from './ai/resumeAnalyzer.js';
import { logger } from '../config/logger.js';

export const uploadAndAnalyzeResume = async (userId, file) => {
  // Deactivate previous resumes — only one active resume per user at a time,
  // but old versions are kept (not deleted) for history/comparison.
  const previousActive = await Resume.find({ user: userId, isActive: true });
  const nextVersion = previousActive.length
    ? Math.max(...previousActive.map((r) => r.version)) + 1
    : 1;
  await Resume.updateMany({ user: userId, isActive: true }, { isActive: false });

  const { url, publicId } = await uploadBufferToCloudinary(file.buffer, {
    folder: `ai-placement-coach/resumes/${userId}`,
    resourceType: 'raw',
  });

  const resume = await Resume.create({
    user: userId,
    fileUrl: url,
    publicId,
    originalFileName: file.originalname,
    version: nextVersion,
    isActive: true,
    parseStatus: 'processing',
  });

  await Profile.findOneAndUpdate({ user: userId }, { activeResume: resume._id });

  // Parse + AI-analyze. If this fails, the resume record still exists with
  // parseStatus: 'failed' so the user can retry rather than losing the upload.
  try {
    const text = await extractTextFromPdf(file.buffer);
    const { parsedData, aiReview } = await analyzeResume(text);

    resume.extractedText = text;
    resume.parsedData = parsedData;
    resume.aiReview = { ...aiReview, generatedAt: new Date() };
    resume.parseStatus = 'completed';
    await resume.save();
  } catch (error) {
    resume.parseStatus = 'failed';
    await resume.save();
    logger.error(`Resume analysis failed for user ${userId}: ${error.message}`);
    if (error instanceof ApiError) throw error;
    throw new ApiError(HTTP_STATUS.INTERNAL_SERVER_ERROR, 'Resume uploaded, but analysis failed. Please try again.');
  }

  return resume;
};

export const getActiveResume = async (userId) => {
  const resume = await Resume.findOne({ user: userId, isActive: true }).sort({ createdAt: -1 });
  if (!resume) throw new ApiError(HTTP_STATUS.NOT_FOUND, 'No resume uploaded yet');
  return resume;
};

// Includes the (select: false) extractedText field — used internally by
// ATS scoring / skill-gap analysis, never returned directly to the client.
export const getActiveResumeWithText = async (userId) => {
  const resume = await Resume.findOne({ user: userId, isActive: true })
    .sort({ createdAt: -1 })
    .select('+extractedText');
  if (!resume) throw new ApiError(HTTP_STATUS.NOT_FOUND, 'No resume uploaded yet');
  if (!resume.extractedText) {
    throw new ApiError(HTTP_STATUS.BAD_REQUEST, 'Your active resume is still processing. Please try again shortly.');
  }
  return resume;
};

export const getResumeHistory = async (userId) => {
  return Resume.find({ user: userId }).sort({ createdAt: -1 }).select('-parsedData -aiReview');
};

export const getResumeById = async (userId, resumeId) => {
  const resume = await Resume.findOne({ _id: resumeId, user: userId });
  if (!resume) throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Resume not found');
  return resume;
};

export const deleteResume = async (userId, resumeId) => {
  const resume = await Resume.findOne({ _id: resumeId, user: userId });
  if (!resume) throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Resume not found');
  await deleteFromCloudinary(resume.publicId, 'raw');
  await resume.deleteOne();
};
