import { Job } from '../models/Job.js';
import { Application } from '../models/Application.js';
import { ApiError } from '../utils/ApiError.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';

export const listJobs = async ({ jobType, location, minCgpa, batch, skill, search, page = 1, limit = 20 }) => {
  const filter = { isActive: true, deadline: { $gte: new Date() } };
  if (jobType) filter.jobType = jobType;
  if (location) filter.location = new RegExp(location, 'i');
  if (skill) filter.requiredSkills = new RegExp(`^${skill}$`, 'i');
  if (batch) filter.batch = Number(batch);
  if (minCgpa) filter['eligibility.minCgpa'] = { $lte: Number(minCgpa) };
  if (search) filter.$text = { $search: search };

  const skip = (page - 1) * limit;
  const [items, total] = await Promise.all([
    Job.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Job.countDocuments(filter),
  ]);

  return { items, total, page: Number(page), pages: Math.ceil(total / limit) };
};

export const getJobById = async (id) => {
  const job = await Job.findById(id);
  if (!job) throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Job not found');
  job.viewCount += 1;
  await job.save();
  return job;
};

export const applyToJob = async (userId, jobId, { resumeId, notes }) => {
  const job = await Job.findById(jobId);
  if (!job || !job.isActive) throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Job not found or no longer active');
  if (job.deadline < new Date()) throw new ApiError(HTTP_STATUS.BAD_REQUEST, 'The application deadline for this job has passed');

  const existing = await Application.findOne({ user: userId, job: jobId });
  if (existing) throw new ApiError(HTTP_STATUS.CONFLICT, 'You have already applied to this job');

  return Application.create({
    user: userId,
    job: jobId,
    resumeUsed: resumeId,
    notes,
    timeline: [{ status: 'applied', note: 'Application submitted', date: new Date() }],
  });
};

export const getMyApplications = async (userId) => {
  return Application.find({ user: userId }).populate('job').sort({ createdAt: -1 });
};

export const withdrawApplication = async (userId, applicationId) => {
  const application = await Application.findOne({ _id: applicationId, user: userId });
  if (!application) throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Application not found');

  application.status = 'withdrawn';
  application.timeline.push({ status: 'withdrawn', note: 'Withdrawn by student', date: new Date() });
  await application.save();
  return application;
};

// ---------- Admin ----------

export const adminListJobs = async ({ page = 1, limit = 20 } = {}) => {
  const skip = (page - 1) * limit;
  const [items, total] = await Promise.all([
    Job.find({}).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Job.countDocuments({}),
  ]);
  return { items, total, page: Number(page), pages: Math.ceil(total / limit) };
};

export const adminCreateJob = async (adminUserId, payload) => {
  return Job.create({ ...payload, postedBy: adminUserId });
};

export const adminUpdateJob = async (jobId, payload) => {
  const job = await Job.findByIdAndUpdate(jobId, payload, { new: true, runValidators: true });
  if (!job) throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Job not found');
  return job;
};

export const adminDeleteJob = async (jobId) => {
  const job = await Job.findByIdAndDelete(jobId);
  if (!job) throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Job not found');
};
