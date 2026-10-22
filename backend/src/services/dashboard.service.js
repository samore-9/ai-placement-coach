import { Profile } from '../models/Profile.js';
import { Resume } from '../models/Resume.js';
import { ATSReport } from '../models/ATSReport.js';
import { Roadmap } from '../models/Roadmap.js';
import { Task } from '../models/Task.js';
import { Progress } from '../models/Progress.js';
import { Notification } from '../models/Notification.js';
import { Achievement } from '../models/Achievement.js';
import { ActivityLog } from '../models/ActivityLog.js';

const startOfToday = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
};

// Weighted profile completion — mirrors the "Profile Completion" dashboard
// widget from the spec. Weights sum to 100.
const PROFILE_FIELDS = [
  { path: 'photoUrl', weight: 8 },
  { path: 'college', weight: 8 },
  { path: 'degree', weight: 6 },
  { path: 'branch', weight: 6 },
  { path: 'cgpa', weight: 6 },
  { path: 'phone', weight: 6 },
  { path: 'skills', weight: 12, isArray: true },
  { path: 'projects', weight: 14, isArray: true },
  { path: 'links.github', weight: 8 },
  { path: 'links.linkedin', weight: 8 },
  { path: 'careerInterests.preferredRole', weight: 10 },
  { path: 'careerInterests.preferredCompany', weight: 8 },
];

const getAtPath = (obj, path) => path.split('.').reduce((acc, key) => acc?.[key], obj);

const computeProfileCompletion = (profile) => {
  if (!profile) return 0;
  let total = 0;
  for (const field of PROFILE_FIELDS) {
    const value = getAtPath(profile.toObject ? profile.toObject() : profile, field.path);
    const filled = field.isArray ? Array.isArray(value) && value.length > 0 : !!value;
    if (filled) total += field.weight;
  }
  return Math.min(100, total);
};

export const getDashboardOverview = async (userId) => {
  const today = startOfToday();

  const [
    profile,
    activeResume,
    latestATSReport,
    activeRoadmap,
    todayTasks,
    latestProgress,
    unreadNotifications,
    recentAchievements,
    recentActivity,
  ] = await Promise.all([
    Profile.findOne({ user: userId }),
    Resume.findOne({ user: userId, isActive: true }).sort({ createdAt: -1 }),
    ATSReport.findOne({ user: userId }).sort({ createdAt: -1 }),
    Roadmap.findOne({ user: userId, status: 'active' }).sort({ createdAt: -1 }),
    Task.find({ user: userId, date: { $gte: today } }).sort({ createdAt: 1 }).limit(10),
    Progress.findOne({ user: userId }).sort({ date: -1 }),
    Notification.countDocuments({ user: userId, isRead: false }),
    Achievement.find({ user: userId }).sort({ earnedAt: -1 }).limit(4),
    ActivityLog.find({ user: userId }).sort({ createdAt: -1 }).limit(6),
  ]);

  const pendingToday = todayTasks.filter((t) => t.status === 'pending');
  const completedToday = todayTasks.filter((t) => t.status === 'completed');

  return {
    profileCompletion: computeProfileCompletion(profile),

    resumeStatus: activeResume
      ? { hasResume: true, parseStatus: activeResume.parseStatus, strengthScore: activeResume.aiReview?.strengthScore ?? null, updatedAt: activeResume.updatedAt }
      : { hasResume: false },

    atsScore: latestATSReport
      ? { overallScore: latestATSReport.overallScore, generatedAt: latestATSReport.createdAt, targetRole: latestATSReport.targetRole }
      : null,

    skillScore: latestProgress?.skillScore ?? null,
    placementReadiness: latestProgress?.placementReadiness ?? 0,
    codingStreak: latestProgress?.codingStats?.streak ?? 0,
    totalSolved: latestProgress?.codingStats?.totalSolved ?? 0,
    totalXp: latestProgress?.totalXp ?? 0,

    roadmap: activeRoadmap
      ? {
          id: activeRoadmap._id,
          targetCompany: activeRoadmap.targetCompany,
          targetRole: activeRoadmap.targetRole,
          completionPercentage: activeRoadmap.completionPercentage,
          currentMilestone: activeRoadmap.milestones.find((m) => m.status === 'in_progress' || m.status === 'pending'),
        }
      : null,

    todayGoal: pendingToday[0] || null,
    todayTasksSummary: { total: todayTasks.length, completed: completedToday.length, pending: pendingToday.length },

    unreadNotificationsCount: unreadNotifications,
    recentAchievements,
    recentActivity,
  };
};
