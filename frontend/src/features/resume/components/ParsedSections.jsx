import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export function ParsedSections({ parsedData }) {
  if (!parsedData) return null;
  const { skills = [], education = [], projects = [], experience = [], achievements = [] } = parsedData;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <Card>
        <CardHeader><CardTitle className="text-base">Skills detected</CardTitle></CardHeader>
        <CardContent>
          {skills.length === 0 ? (
            <p className="text-sm text-ink-400">No skills section detected.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {skills.map((s) => (
                <span key={s} className="rounded-lg bg-signal-50 px-2.5 py-1 text-xs font-medium text-signal-600 dark:bg-signal-900/40 dark:text-signal-300">
                  {s}
                </span>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-base">Education</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {education.length === 0 ? (
            <p className="text-sm text-ink-400">No education section detected.</p>
          ) : (
            education.map((e, i) => (
              <div key={i}>
                <p className="text-sm font-medium text-ink-900 dark:text-ink-100">{e.institution}</p>
                <p className="text-xs text-ink-400">{e.degree}{e.field ? ` in ${e.field}` : ''} {e.startYear ? `· ${e.startYear}–${e.endYear || 'present'}` : ''}</p>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      <Card className="sm:col-span-2">
        <CardHeader><CardTitle className="text-base">Projects</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {projects.length === 0 ? (
            <p className="text-sm text-ink-400">No projects section detected — this is a common gap recruiters flag.</p>
          ) : (
            projects.map((p, i) => (
              <div key={i} className="border-l-2 border-signal-200 dark:border-signal-800 pl-3">
                <p className="text-sm font-medium text-ink-900 dark:text-ink-100">{p.title}</p>
                <p className="mt-0.5 text-xs text-ink-500 dark:text-ink-300">{p.description}</p>
                {p.techStack?.length > 0 && (
                  <p className="mt-1 font-mono text-[11px] text-ink-400">{p.techStack.join(' · ')}</p>
                )}
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {experience.length > 0 && (
        <Card className="sm:col-span-2">
          <CardHeader><CardTitle className="text-base">Experience</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {experience.map((e, i) => (
              <div key={i} className="border-l-2 border-streak-400/40 pl-3">
                <p className="text-sm font-medium text-ink-900 dark:text-ink-100">{e.role} · {e.company}</p>
                <p className="text-xs text-ink-400">{e.duration}</p>
                <p className="mt-0.5 text-xs text-ink-500 dark:text-ink-300">{e.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {achievements.length > 0 && (
        <Card className="sm:col-span-2">
          <CardHeader><CardTitle className="text-base">Achievements</CardTitle></CardHeader>
          <CardContent>
            <ul className="list-disc space-y-1.5 pl-4">
              {achievements.map((a, i) => (
                <li key={i} className="text-sm text-ink-700 dark:text-ink-100">{a}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
