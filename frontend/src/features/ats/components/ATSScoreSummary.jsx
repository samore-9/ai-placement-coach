import { FiCheck, FiX } from 'react-icons/fi';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const scoreColor = (score) => (score >= 80 ? 'text-status-success' : score >= 60 ? 'text-status-warning' : 'text-status-danger');

export function ATSScoreSummary({ report }) {
  return (
    <Card>
      <CardContent className="p-6 text-center">
        <p className="text-sm font-medium text-ink-500 dark:text-ink-300">Overall ATS Score</p>
        <p className={`mt-2 font-mono text-5xl font-semibold ${scoreColor(report.overallScore)}`}>{report.overallScore}</p>
        <p className="text-xs text-ink-400">out of 100</p>
        {(report.targetRole || report.targetCompany) && (
          <p className="mt-3 text-xs text-ink-400">
            Scanned for {report.targetRole || 'a general role'}{report.targetCompany ? ` at ${report.targetCompany}` : ''}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

export function KeywordMatchCard({ matched = [], missing = [] }) {
  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Keyword Match</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-status-success">
            <FiCheck size={13} /> Matched ({matched.length})
          </p>
          <div className="flex flex-wrap gap-2">
            {matched.length === 0 ? (
              <p className="text-sm text-ink-400">No strong keyword matches yet.</p>
            ) : (
              matched.map((k) => (
                <span key={k} className="rounded-lg bg-status-success/10 px-2.5 py-1 text-xs font-medium text-status-success">{k}</span>
              ))
            )}
          </div>
        </div>
        <div>
          <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-status-danger">
            <FiX size={13} /> Missing ({missing.length})
          </p>
          <div className="flex flex-wrap gap-2">
            {missing.length === 0 ? (
              <p className="text-sm text-ink-400">No major gaps found.</p>
            ) : (
              missing.map((k) => (
                <span key={k} className="rounded-lg bg-status-danger/10 px-2.5 py-1 text-xs font-medium text-status-danger">{k}</span>
              ))
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
