import { formatDistanceToNow } from 'date-fns';
import { FiActivity } from 'react-icons/fi';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const ACTION_LABEL = {
  login: 'Logged in',
  register: 'Created account',
  resume_upload: 'Uploaded a resume',
  ats_scan: 'Ran an ATS scan',
  job_apply: 'Applied to a job',
  password_reset: 'Reset password',
};

export function RecentActivityList({ activity = [] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        {activity.length === 0 ? (
          <p className="text-sm text-ink-400">Your activity will show up here as you use the platform.</p>
        ) : (
          <ul className="space-y-4">
            {activity.map((item) => (
              <li key={item._id} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink-100/60 text-ink-400 dark:bg-white/5">
                  <FiActivity size={13} />
                </span>
                <div>
                  <p className="text-sm text-ink-700 dark:text-ink-100">{ACTION_LABEL[item.action] || item.action}</p>
                  <p className="text-xs text-ink-400">{formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
