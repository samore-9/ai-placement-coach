import { FiAlertTriangle, FiEdit3, FiXCircle } from 'react-icons/fi';
import { useResume } from '@/hooks/useResume';
import { ResumeUploadZone } from '@/features/resume/components/ResumeUploadZone';
import { StrengthScoreCard } from '@/features/resume/components/StrengthScoreCard';
import { RecruiterFeedbackCard } from '@/features/resume/components/RecruiterFeedbackCard';
import { ParsedSections } from '@/features/resume/components/ParsedSections';
import { BulletListCard } from '@/components/common/BulletListCard';
import { DashboardSkeleton } from '@/features/dashboard/components/DashboardSkeleton';

export default function ResumePage() {
  const { resume, loading, uploading, upload } = useResume();

  if (loading) return <DashboardSkeleton />;

  const hasAnalysis = resume?.parseStatus === 'completed';
  const isFailed = resume?.parseStatus === 'failed';
  const isProcessing = resume?.parseStatus === 'processing' || resume?.parseStatus === 'pending';

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink-900 dark:text-ink-100">Resume Analyzer</h1>
        <p className="mt-1 text-sm text-ink-500 dark:text-ink-300">
          Upload your resume for an AI-powered breakdown — strength score, missing sections, and recruiter-style feedback.
        </p>
      </div>

      <ResumeUploadZone onUpload={upload} uploading={uploading} hasExisting={!!resume} />

      {isFailed && (
        <div className="flex items-center gap-3 rounded-xl border border-status-danger/30 bg-status-danger/5 p-4">
          <FiXCircle className="shrink-0 text-status-danger" size={18} />
          <p className="text-sm text-ink-700 dark:text-ink-100">
            Analysis failed for your last upload — this can happen with scanned/image-only PDFs. Try uploading a text-based PDF.
          </p>
        </div>
      )}

      {isProcessing && (
        <div className="flex items-center gap-3 rounded-xl border border-ink-100 dark:border-ink-700 p-4">
          <FiAlertTriangle className="shrink-0 text-streak-500" size={18} />
          <p className="text-sm text-ink-700 dark:text-ink-100">Your resume is still being analyzed. Refresh in a few seconds.</p>
        </div>
      )}

      {hasAnalysis && (
        <>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <StrengthScoreCard score={resume.aiReview.strengthScore} />
            <RecruiterFeedbackCard feedback={resume.aiReview.recruiterFeedback} />
          </div>

          <ParsedSections parsedData={resume.parsedData} />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <BulletListCard title="Missing Sections" items={resume.parsedData.missingSections} tone="danger" emptyText="All standard sections present." />
            <BulletListCard title="Weak Areas" items={resume.aiReview.weakAreas} tone="warning" emptyText="No major weak areas flagged." />
            <BulletListCard title="Grammar Issues" items={resume.aiReview.grammarIssues} tone="warning" emptyText="No grammar issues found." />
            <BulletListCard title="Formatting Suggestions" items={resume.aiReview.formattingSuggestions} emptyText="Formatting looks solid." />
          </div>

          <BulletListCard
            title="Improvement Suggestions"
            items={resume.aiReview.improvementSuggestions}
            emptyText="No further suggestions — strong resume."
          />

          {resume.aiReview.improvedBulletPoints?.length > 0 && (
            <BulletListCard
              title="AI-Rewritten Bullet Points"
              icon={FiEdit3}
              items={resume.aiReview.improvedBulletPoints}
              emptyText=""
            />
          )}
        </>
      )}
    </div>
  );
}
