import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const PRIORITY_STYLE = {
  high: 'bg-status-danger/10 text-status-danger',
  medium: 'bg-status-warning/10 text-status-warning',
  low: 'bg-ink-100 text-ink-500 dark:bg-white/5 dark:text-ink-300',
};

function SkillRow({ skill, priority, meta }) {
  return (
    <div className="flex items-start justify-between gap-3 py-3 first:pt-0 last:pb-0">
      <div className="min-w-0">
        <p className="text-sm font-medium text-ink-900 dark:text-ink-100">{skill}</p>
        {meta && <p className="mt-0.5 text-xs text-ink-400">{meta}</p>}
      </div>
      {priority && (
        <span className={`shrink-0 rounded-md px-2 py-0.5 font-mono text-[10px] font-semibold uppercase ${PRIORITY_STYLE[priority]}`}>
          {priority}
        </span>
      )}
    </div>
  );
}

export function MissingSkillsCard({ items = [] }) {
  return (
    <Card>
      <CardHeader><CardTitle className="text-base">Missing Skills</CardTitle></CardHeader>
      <CardContent className="divide-y divide-ink-100 dark:divide-ink-700/60">
        {items.length === 0 ? (
          <p className="text-sm text-ink-400">No critical gaps found — solid coverage.</p>
        ) : (
          items.map((s, i) => (
            <SkillRow key={i} skill={s.skill} priority={s.priority} meta={`${s.difficulty} · ~${s.timeRequiredWeeks}wk · ${s.reason}`} />
          ))
        )}
      </CardContent>
    </Card>
  );
}

export function WeakSkillsCard({ items = [] }) {
  return (
    <Card>
      <CardHeader><CardTitle className="text-base">Weak Skills</CardTitle></CardHeader>
      <CardContent className="divide-y divide-ink-100 dark:divide-ink-700/60">
        {items.length === 0 ? (
          <p className="text-sm text-ink-400">No weak spots flagged in your current skills.</p>
        ) : (
          items.map((s, i) => <SkillRow key={i} skill={s.skill} priority={s.priority} meta={s.reason} />)
        )}
      </CardContent>
    </Card>
  );
}

export function RecommendedSkillsCard({ items = [] }) {
  return (
    <Card className="sm:col-span-2">
      <CardHeader><CardTitle className="text-base">Recommended (nice-to-have)</CardTitle></CardHeader>
      <CardContent className="divide-y divide-ink-100 dark:divide-ink-700/60">
        {items.length === 0 ? (
          <p className="text-sm text-ink-400">No additional recommendations.</p>
        ) : (
          items.map((s, i) => <SkillRow key={i} skill={s.skill} meta={s.reason} />)
        )}
      </CardContent>
    </Card>
  );
}
