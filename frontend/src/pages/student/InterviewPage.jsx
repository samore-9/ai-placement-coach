import { useInterviewQuestions } from '@/hooks/useInterviewQuestions';
import { InterviewFilters } from '@/features/interview/components/InterviewFilters';
import { InterviewQuestionCard } from '@/features/interview/components/InterviewQuestionCard';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DashboardSkeleton } from '@/features/dashboard/components/DashboardSkeleton';

export default function InterviewPage() {
  const { filters, updateFilter, data, companies, loading, toggleBookmark } = useInterviewQuestions();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink-900 dark:text-ink-100">Interview Prep</h1>
        <p className="mt-1 text-sm text-ink-500 dark:text-ink-300">
          Company and topic-tagged questions with recruiter-perspective answers and common mistakes to avoid.
        </p>
      </div>

      <Card>
        <CardContent className="p-5">
          <InterviewFilters filters={filters} onChange={updateFilter} companies={companies} />
        </CardContent>
      </Card>

      <Card>
        {loading ? (
          <div className="p-6"><DashboardSkeleton /></div>
        ) : data.items.length === 0 ? (
          <div className="py-16 text-center">
            <p className="font-mono text-xs text-signal-500">no_questions_found</p>
            <p className="mt-2 text-sm text-ink-500 dark:text-ink-300">Try adjusting your filters.</p>
          </div>
        ) : (
          <div>
            {data.items.map((q) => (
              <InterviewQuestionCard key={q._id} question={q} onToggleBookmark={toggleBookmark} />
            ))}
          </div>
        )}
      </Card>

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
