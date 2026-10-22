import { Progress } from '../models/Progress.js';
import { Achievement } from '../models/Achievement.js';

const startOfToday = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
};

export const getProgressHistory = async (userId, days = 30) => {
  const since = new Date();
  since.setDate(since.getDate() - days);
  since.setHours(0, 0, 0, 0);

  return Progress.find({ user: userId, date: { $gte: since } })
    .sort({ date: 1 })
    .select('date atsScore skillScore placementReadiness codingStats.solvedToday codingStats.totalSolved codingStats.streak xpEarned totalXp -_id');
};

export const getTodaySummary = async (userId) => {
  return Progress.findOne({ user: userId, date: startOfToday() });
};

// Called by other services (Task completion, ATS scan, etc.) to upsert today's
// snapshot rather than duplicating "find today's doc or create it" everywhere.
export const upsertTodayProgress = async (userId, patch) => {
  return Progress.findOneAndUpdate(
    { user: userId, date: startOfToday() },
    { $set: patch },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );
};

// GitHub-style contribution heatmap data — one entry per day in range with
// a solve count, so the frontend just maps straight to a grid without doing
// date-bucketing client-side.
export const getHeatmapData = async (userId, days = 182) => {
  const since = new Date();
  since.setDate(since.getDate() - days);
  since.setHours(0, 0, 0, 0);

  const docs = await Progress.find({ user: userId, date: { $gte: since } })
    .select('date codingStats.solvedToday xpEarned -_id')
    .sort({ date: 1 });

  return docs.map((d) => ({
    date: d.date,
    count: d.codingStats?.solvedToday ?? 0,
    xp: d.xpEarned ?? 0,
  }));
};

// Weekly performance: sums each ISO week's XP, solves, and averages readiness.
export const getWeeklySummary = async (userId, weeks = 12) => {
  const since = new Date();
  since.setDate(since.getDate() - weeks * 7);
  since.setHours(0, 0, 0, 0);

  const docs = await Progress.find({ user: userId, date: { $gte: since } }).sort({ date: 1 });

  const buckets = new Map();
  for (const doc of docs) {
    // Bucket key: the Monday of that doc's week
    const d = new Date(doc.date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    const weekStart = new Date(d.setDate(diff));
    weekStart.setHours(0, 0, 0, 0);
    const key = weekStart.toISOString();

    const bucket = buckets.get(key) || { weekStart: key, xp: 0, solved: 0, readinessSum: 0, readinessCount: 0 };
    bucket.xp += doc.xpEarned ?? 0;
    bucket.solved += doc.codingStats?.solvedToday ?? 0;
    if (doc.placementReadiness != null) {
      bucket.readinessSum += doc.placementReadiness;
      bucket.readinessCount += 1;
    }
    buckets.set(key, bucket);
  }

  return Array.from(buckets.values())
    .map((b) => ({
      weekStart: b.weekStart,
      xp: b.xp,
      solved: b.solved,
      avgReadiness: b.readinessCount ? Math.round(b.readinessSum / b.readinessCount) : null,
    }))
    .sort((a, b) => new Date(a.weekStart) - new Date(b.weekStart));
};

export const getAllAchievements = async (userId) => {
  return Achievement.find({ user: userId }).sort({ earnedAt: -1 });
};
