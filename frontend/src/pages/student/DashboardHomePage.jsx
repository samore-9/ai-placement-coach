import { FiTarget, FiTrendingUp, FiZap, FiCode } from 'react-icons/fi';
import { useAuth } from '@/hooks/useAuth';
import { useDashboard } from '@/hooks/useDashboard';
import { DashboardSkeleton } from '@/features/dashboard/components/DashboardSkeleton';
import { StatCard } from '@/features/dashboard/components/StatCard';
import { ReadinessGauge } from '@/features/dashboard/components/ReadinessGauge';
import { ScoreHistoryChart } from '@/features/dashboard/components/ScoreHistoryChart';
import { ProfileCompletionCard } from '@/features/dashboard/components/ProfileCompletionCard';
import { TodayGoalCard } from '@/features/dashboard/components/TodayGoalCard';
import { ResumeStatusCard } from '@/features/dashboard/components/ResumeStatusCard';
import { RoadmapProgressCard } from '@/features/dashboard/components/RoadmapProgressCard';
import { AchievementsRow } from '@/features/dashboard/components/AchievementsRow';
import { RecentActivityList } from '@/features/dashboard/components/RecentActivityList';

export default function DashboardHomePage() {
  const { user } = useAuth();
  const { overview, history, loading, error, completeTask } = useDashboard();

  if (loading) return <DashboardSkeleton />;

  if (error) {
    return (
      <div className="rounded-2xl border border-dashed border-ink-100 dark:border-ink-700 py-16 text-center">
        <p className="font-mono text-xs text-status-danger">dashboard_load_failed</p>
        <p className="mt-2 text-sm text-ink-500 dark:text-ink-300">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink-900 dark:text-ink-100">
          Welcome back, {user?.name?.split(' ')[0] || 'there'} 👋
        </h1>
        <p className="mt-1 text-sm text-ink-500 dark:text-ink-300">Here's where your placement prep stands today.</p>
      </div>

      {/* Top stats row */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon={FiTarget} label="ATS Score" value={overview.atsScore ? `${overview.atsScore.overallScore}/100` : '—'} sub={overview.atsScore ? overview.atsScore.targetRole : 'No scan yet'} />
        <StatCard icon={FiTrendingUp} label="Skill Score" value={overview.skillScore != null ? `${overview.skillScore}/100` : '—'} accent="success" />
        <StatCard icon={FiCode} label="DSA Streak" value={`${overview.codingStreak} day${overview.codingStreak === 1 ? '' : 's'}`} sub={`${overview.totalSolved} solved total`} accent="streak" />
        <StatCard icon={FiZap} label="Total XP" value={overview.totalXp} sub={`${overview.unreadNotificationsCount} unread notifications`} accent="streak" />
      </div>

      {/* Today's goal + readiness gauge */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <TodayGoalCard task={overview.todayGoal} summary={overview.todayTasksSummary} onComplete={completeTask} />
        <ReadinessGauge value={overview.placementReadiness} />
      </div>

      {/* Score history + profile completion */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <ScoreHistoryChart data={history} />
        <div className="space-y-4">
          <ProfileCompletionCard percentage={overview.profileCompletion} />
          <ResumeStatusCard resumeStatus={overview.resumeStatus} />
        </div>
      </div>

      {/* Roadmap + achievements */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <RoadmapProgressCard roadmap={overview.roadmap} />
        <div className="lg:col-span-2">
          <AchievementsRow achievements={overview.recentAchievements} />
        </div>
      </div>

      <RecentActivityList activity={overview.recentActivity} />
    </div>
  );
}
