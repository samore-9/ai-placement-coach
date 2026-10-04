import { useCodingQuestions } from '@/hooks/useCodingQuestions';
import { CodingFilters } from '@/features/coding/components/CodingFilters';
import { CodingQuestionRow } from '@/features/coding/components/CodingQuestionRow';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DashboardSkeleton } from '@/features/dashboard/components/DashboardSkeleton';

export default function CodingPage() {
  const { filters, updateFilter, data, topics, companyTags, loading, toggleBookmark, markSolved } = useCodingQuestions();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink-900 dark:text-ink-100">Coding Practice</h1>
        <p className="mt-1 text-sm text-ink-500 dark:text-ink-300">
          Striver A2Z, NeetCode, and Blind 75 — organized by topic, difficulty, and company.
        </p>
      </div>

      <Card>
        <CardContent className="p-5">
          <CodingFilters filters={filters} onChange={updateFilter} topics={topics} companyTags={companyTags} />
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
              <CodingQuestionRow key={q._id} question={q} onToggleBookmark={toggleBookmark} onMarkSolved={markSolved} />
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
