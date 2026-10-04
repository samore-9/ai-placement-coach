import { useSkillGap } from '@/hooks/useSkillGap';
import { SkillGapForm } from '@/features/skillGap/components/SkillGapForm';
import { SkillMatchSummary } from '@/features/skillGap/components/SkillMatchSummary';
import { MissingSkillsCard, WeakSkillsCard, RecommendedSkillsCard } from '@/features/skillGap/components/SkillGapLists';

export default function SkillGapPage() {
  const { companies, result, analyzing, analyze } = useSkillGap();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink-900 dark:text-ink-100">Skill Gap Analysis</h1>
        <p className="mt-1 text-sm text-ink-500 dark:text-ink-300">
          Compare your current skills against what a target company actually expects.
        </p>
      </div>

      <SkillGapForm companies={companies} onAnalyze={analyze} analyzing={analyzing} />

      {result ? (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <SkillMatchSummary result={result} />
          <MissingSkillsCard items={result.missingSkills} />
          <WeakSkillsCard items={result.weakSkills} />
          <RecommendedSkillsCard items={result.recommendedSkills} />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-ink-100 dark:border-ink-700 py-20 text-center">
          <p className="font-mono text-xs text-signal-500">no_analysis_yet</p>
          <p className="mt-3 max-w-sm text-sm text-ink-500 dark:text-ink-300">
            Pick a target company above to see exactly where your skills stand.
          </p>
        </div>
      )}
    </div>
  );
}
