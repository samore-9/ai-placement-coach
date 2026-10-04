import { useJobs } from '@/hooks/useJobs';
import { JobFilters } from '@/features/jobs/components/JobFilters';
import { JobCard } from '@/features/jobs/components/JobCard';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DashboardSkeleton } from '@/features/dashboard/components/DashboardSkeleton';

export default function JobsPage() {
  const { filters, updateFilter, data, loading, toggleBookmark, apply, applyingId } = useJobs();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink-900 dark:text-ink-100">Job Portal</h1>
        <p className="mt-1 text-sm text-ink-500 dark:text-ink-300">
          Curated internships and placements — filtered to what's actually open right now.
        </p>
      </div>

      <Card>
        <CardContent className="p-5">
          <JobFilters filters={filters} onChange={updateFilter} />
        </CardContent>
      </Card>

      {loading ? (
        <DashboardSkeleton />
      ) : data.items.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-ink-100 dark:border-ink-700 py-20 text-center">
          <p className="font-mono text-xs text-signal-500">no_jobs_found</p>
          <p className="mt-3 max-w-sm text-sm text-ink-500 dark:text-ink-300">
            No open listings match your filters right now — check back soon or broaden your search.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.items.map((job) => (
            <JobCard key={job._id} job={job} onToggleBookmark={toggleBookmark} onApply={apply} applying={applyingId === job._id} />
          ))}
        </div>
      )}

      {data.pages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button variant="secondary" size="sm" disabled={filters.page <= 1} onClick={() => updateFilter({ page: filters.page - 1 })}>
            Previous
          </Button>
          <span className="font-mono text-xs text-ink-400">Page {filters.page} of {data.pages}</span>
          <Button variant="secondary" size="sm" disabled={filters.page >= data.pages} onClick={() => updateFilter({ page: filters.page + 1 })}>
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
