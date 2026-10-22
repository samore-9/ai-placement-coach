import { User } from '../models/User.js';
import { Resume } from '../models/Resume.js';
import { ATSReport } from '../models/ATSReport.js';
import { Job } from '../models/Job.js';
import { Application } from '../models/Application.js';
import { Roadmap } from '../models/Roadmap.js';
import { Notification } from '../models/Notification.js';
import { ApiError } from '../utils/ApiError.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';

export const getAnalyticsOverview = async () => {
  const [
    totalUsers,
    studentCount,
    adminCount,
    verifiedCount,
    totalResumes,
    avgATSScoreAgg,
    activeJobs,
    totalApplications,
    applicationsByStatus,
    activeRoadmaps,
    newUsersLast30Days,
  ] = await Promise.all([
    User.countDocuments({}),
    User.countDocuments({ role: 'student' }),
    User.countDocuments({ role: { $in: ['admin', 'superadmin'] } }),
    User.countDocuments({ isEmailVerified: true }),
    Resume.countDocuments({}),
    ATSReport.aggregate([{ $group: { _id: null, avg: { $avg: '$overallScore' } } }]),
    Job.countDocuments({ isActive: true, deadline: { $gte: new Date() } }),
    Application.countDocuments({}),
    Application.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]),
    Roadmap.countDocuments({ status: 'active' }),
    User.countDocuments({ createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } }),
  ]);

  return {
    users: { total: totalUsers, students: studentCount, admins: adminCount, verified: verifiedCount, newLast30Days: newUsersLast30Days },
    resumes: { total: totalResumes },
    ats: { averageScore: avgATSScoreAgg[0]?.avg ? Math.round(avgATSScoreAgg[0].avg) : null },
    jobs: { activeListings: activeJobs },
    applications: {
      total: totalApplications,
      byStatus: Object.fromEntries(applicationsByStatus.map((a) => [a._id, a.count])),
    },
    roadmaps: { active: activeRoadmaps },
  };
};

export const listUsers = async ({ role, search, page = 1, limit = 20 }) => {
  const filter = {};
  if (role) filter.role = role;
  if (search) filter.$or = [{ name: new RegExp(search, 'i') }, { email: new RegExp(search, 'i') }];

  const skip = (page - 1) * limit;
  const [items, total] = await Promise.all([
    User.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    User.countDocuments(filter),
  ]);

  return { items: items.map((u) => u.toSafeObject()), total, page: Number(page), pages: Math.ceil(total / limit) };
};

export const updateUserStatus = async (userId, { role, isActive }) => {
  const user = await User.findById(userId);
  if (!user) throw new ApiError(HTTP_STATUS.NOT_FOUND, 'User not found');

  if (role !== undefined) user.role = role;
  if (isActive !== undefined) user.isActive = isActive;
  await user.save({ validateBeforeSave: false });

  return user.toSafeObject();
};

// Broadcasts an announcement as a Notification to every active student —
// reuses the existing Notification model (type: 'announcement') rather than
// introducing a dedicated Announcement collection, since none was planned
// in the Phase 3 DB design.
export const broadcastAnnouncement = async ({ title, message, link }) => {
  const students = await User.find({ role: 'student', isActive: true }).select('_id');

  const notifications = students.map((s) => ({
    user: s._id,
    type: 'announcement',
    title,
    message,
    link,
  }));

  if (notifications.length) {
    await Notification.insertMany(notifications);
  }

  return { recipientCount: notifications.length };
};
