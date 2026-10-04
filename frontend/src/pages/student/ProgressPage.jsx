import { useProgressPage } from '@/hooks/useProgressPage';
import { ActivityHeatmap } from '@/features/progress/components/ActivityHeatmap';
import { WeeklyPerformanceChart } from '@/features/progress/components/WeeklyPerformanceChart';
import { ScoreHistoryChart } from '@/features/dashboard/components/ScoreHistoryChart';
import { AchievementsRow } from '@/features/dashboard/components/AchievementsRow';
import { DashboardSkeleton } from '@/features/dashboard/components/DashboardSkeleton';

export default function ProgressPage() {
  const { heatmap, weekly, history, achievements, loading } = useProgressPage();

  if (loading) return <DashboardSkeleton />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink-900 dark:text-ink-100">Progress Dashboard</h1>
        <p className="mt-1 text-sm text-ink-500 dark:text-ink-300">
          Your placement prep, tracked over time — activity, performance, and badges.
        </p>
      </div>

      <ActivityHeatmap data={heatmap} />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <WeeklyPerformanceChart data={weekly} />
        <ScoreHistoryChart data={history} />
      </div>

      <AchievementsRow achievements={achievements} />
    </div>
  );
}
