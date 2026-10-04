import { FiUsers, FiFileText, FiBriefcase, FiTarget, FiMap, FiUserCheck } from 'react-icons/fi';
import { useAdminAnalytics } from '@/hooks/useAdminAnalytics';
import { StatCard } from '@/features/dashboard/components/StatCard';
import { DashboardSkeleton } from '@/features/dashboard/components/DashboardSkeleton';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const STATUS_LABEL = { applied: 'Applied', oa_round: 'OA Round', interview: 'Interview', offer: 'Offer', rejected: 'Rejected', withdrawn: 'Withdrawn' };

export default function AdminHomePage() {
  const { data, loading } = useAdminAnalytics();

  if (loading || !data) return <DashboardSkeleton />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink-900 dark:text-ink-100">Admin Overview</h1>
        <p className="mt-1 text-sm text-ink-500 dark:text-ink-300">Platform-wide statistics at a glance.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon={FiUsers} label="Total Students" value={data.users.students} sub={`+${data.users.newLast30Days} last 30 days`} />
        <StatCard icon={FiUserCheck} label="Verified Users" value={data.users.verified} sub={`of ${data.users.total} total`} accent="success" />
        <StatCard icon={FiFileText} label="Resumes Uploaded" value={data.resumes.total} />
        <StatCard icon={FiTarget} label="Avg ATS Score" value={data.ats.averageScore != null ? `${data.ats.averageScore}/100` : '—'} accent="streak" />
        <StatCard icon={FiBriefcase} label="Active Job Listings" value={data.jobs.activeListings} />
        <StatCard icon={FiMap} label="Active Roadmaps" value={data.roadmaps.active} accent="streak" />
        <StatCard icon={FiUsers} label="Total Applications" value={data.applications.total} accent="success" />
        <StatCard icon={FiUsers} label="Admin Users" value={data.users.admins} />
      </div>

      <Card>
        <CardHeader><CardTitle>Applications by Status</CardTitle></CardHeader>
        <CardContent>
          {Object.keys(data.applications.byStatus).length === 0 ? (
            <p className="text-sm text-ink-400">No applications yet.</p>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {Object.entries(data.applications.byStatus).map(([status, count]) => (
                <div key={status} className="rounded-xl border border-ink-100 dark:border-ink-700/60 p-4 text-center">
                  <p className="font-mono text-2xl font-semibold text-signal-500">{count}</p>
                  <p className="text-xs text-ink-400">{STATUS_LABEL[status] || status}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
