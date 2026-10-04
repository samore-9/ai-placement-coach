import { Card, CardContent } from '@/components/ui/card';

export function SkillMatchSummary({ result }) {
  return (
    <Card className="bg-gradient-signal border-none lg:col-span-3">
      <CardContent className="flex flex-col items-center gap-6 p-8 text-center sm:flex-row sm:text-left">
        <div className="shrink-0">
          <p className="font-mono text-5xl font-semibold text-white">{result.matchPercentage}%</p>
          <p className="text-xs text-white/70">match with {result.targetCompany}</p>
        </div>
        <div className="h-px w-full bg-white/20 sm:h-16 sm:w-px" />
        <p className="text-sm leading-relaxed text-white/90">{result.summary}</p>
      </CardContent>
    </Card>
  );
}
