import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { Card, CardContent } from '@/components/ui/card';

export function ProfileCompletionCard({ percentage = 0 }) {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-ink-700 dark:text-ink-100">Profile Completion</p>
          <span className="font-mono text-sm font-semibold text-signal-500">{percentage}%</span>
        </div>

        <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-ink-100 dark:bg-ink-700">
          <div
            className="h-full rounded-full bg-gradient-signal transition-all duration-700"
            style={{ width: `${percentage}%` }}
          />
        </div>

        {percentage < 100 && (
          <Link to="/dashboard/profile" className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-signal-500 hover:text-signal-600">
            Finish your profile <FiArrowRight size={12} />
          </Link>
        )}
      </CardContent>
    </Card>
  );
}
