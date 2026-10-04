import { Link } from 'react-router-dom';
import { FiMap } from 'react-icons/fi';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function RoadmapProgressCard({ roadmap }) {
  if (!roadmap) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center p-6 text-center">
          <FiMap className="text-ink-300" size={26} />
          <p className="mt-3 text-sm font-medium text-ink-900 dark:text-ink-100">No active roadmap</p>
          <p className="mt-1 text-xs text-ink-400">Set a target company and role to generate one.</p>
          <Link to="/dashboard/roadmap">
            <Button size="sm" variant="gradient" className="mt-4">
              Generate roadmap
            </Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-streak-400/10 text-streak-500">
            <FiMap size={18} />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-ink-900 dark:text-ink-100">
              {roadmap.targetRole} @ {roadmap.targetCompany}
            </p>
            <p className="text-xs text-ink-400">Roadmap progress</p>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-ink-100 dark:bg-ink-700">
            <div className="h-full rounded-full bg-gradient-streak" style={{ width: `${roadmap.completionPercentage}%` }} />
          </div>
          <span className="font-mono text-xs font-semibold text-ink-700 dark:text-ink-100">{roadmap.completionPercentage}%</span>
        </div>

        {roadmap.currentMilestone && (
          <p className="mt-3 text-xs text-ink-400">
            Current: <span className="text-ink-700 dark:text-ink-100">{roadmap.currentMilestone.title}</span>
          </p>
        )}

        <Link to="/dashboard/roadmap" className="mt-3 inline-block text-xs font-medium text-signal-500 hover:text-signal-600">
          View full roadmap →
        </Link>
      </CardContent>
    </Card>
  );
}
