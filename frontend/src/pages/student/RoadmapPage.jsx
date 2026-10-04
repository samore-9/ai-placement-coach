import { useRoadmap } from '@/hooks/useRoadmap';
import { RoadmapGenerateForm } from '@/features/roadmap/components/RoadmapGenerateForm';
import { MilestoneTimeline } from '@/features/roadmap/components/MilestoneTimeline';
import { WeeklyTasksList, RequiredSkillsCard } from '@/features/roadmap/components/WeeklyTasksList';
import { DashboardSkeleton } from '@/features/dashboard/components/DashboardSkeleton';

export default function RoadmapPage() {
  const { roadmap, loading, generating, generate, setMilestoneStatus, toggleWeek } = useRoadmap();

  if (loading) return <DashboardSkeleton />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink-900 dark:text-ink-100">AI Career Roadmap</h1>
        <p className="mt-1 text-sm text-ink-500 dark:text-ink-300">
          A week-by-week plan from where you are now to placement-ready, for a specific company and role.
        </p>
      </div>

      <RoadmapGenerateForm onGenerate={generate} generating={generating} hasExisting={!!roadmap} />

      {roadmap ? (
        <>
          <div className="flex items-center justify-between rounded-2xl border border-ink-100 dark:border-ink-700/60 bg-white dark:bg-surface-dark-card p-5">
            <div>
              <p className="text-sm font-semibold text-ink-900 dark:text-ink-100">{roadmap.targetRole} @ {roadmap.targetCompany}</p>
              <p className="text-xs text-ink-400 capitalize">{roadmap.currentLevel} level</p>
            </div>
            <div className="text-right">
              <p className="font-mono text-2xl font-semibold text-signal-500">{roadmap.completionPercentage}%</p>
              <p className="text-xs text-ink-400">complete</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <MilestoneTimeline milestones={roadmap.milestones} onToggle={setMilestoneStatus} />
            <div className="space-y-4 lg:col-span-2">
              <RequiredSkillsCard skills={roadmap.requiredSkills} />
              <WeeklyTasksList weeklyTasks={roadmap.weeklyTasks} onToggleWeek={toggleWeek} />
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-ink-100 dark:border-ink-700 py-20 text-center">
          <p className="font-mono text-xs text-signal-500">no_roadmap_yet</p>
          <p className="mt-3 max-w-sm text-sm text-ink-500 dark:text-ink-300">
            Fill in the form above to generate your first personalized roadmap.
          </p>
        </div>
      )}
    </div>
  );
}
