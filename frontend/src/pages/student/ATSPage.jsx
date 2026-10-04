import { useResume } from '@/hooks/useResume';
import { useATS } from '@/hooks/useATS';
import { ATSScanForm } from '@/features/ats/components/ATSScanForm';
import { ATSScoreSummary, KeywordMatchCard } from '@/features/ats/components/ATSScoreSummary';
import { ATSBreakdownChart } from '@/features/ats/components/ATSBreakdownChart';
import { BulletListCard } from '@/components/common/BulletListCard';
import { DashboardSkeleton } from '@/features/dashboard/components/DashboardSkeleton';

export default function ATSPage() {
  const { resume, loading: resumeLoading } = useResume();
  const { report, loading, scanning, runScan } = useATS();

  if (loading || resumeLoading) return <DashboardSkeleton />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink-900 dark:text-ink-100">ATS Score</h1>
        <p className="mt-1 text-sm text-ink-500 dark:text-ink-300">
          See exactly how applicant tracking systems would score your resume for a specific role and company.
        </p>
      </div>

      <ATSScanForm onScan={runScan} scanning={scanning} hasResume={!!resume} />

      {report ? (
        <>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <ATSScoreSummary report={report} />
            <ATSBreakdownChart breakdown={report.breakdown} />
          </div>
          <KeywordMatchCard matched={report.matchedKeywords} missing={report.missingKeywords} />
          <BulletListCard title="Optimization Suggestions" items={report.suggestions} emptyText="No further suggestions." />
        </>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-ink-100 dark:border-ink-700 py-20 text-center">
          <p className="font-mono text-xs text-signal-500">no_scan_yet</p>
          <p className="mt-3 max-w-sm text-sm text-ink-500 dark:text-ink-300">
            Run your first scan above to see your ATS score breakdown.
          </p>
        </div>
      )}
    </div>
  );
}
