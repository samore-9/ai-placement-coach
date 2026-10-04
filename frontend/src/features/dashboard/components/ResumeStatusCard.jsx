import { Link } from 'react-router-dom';
import { FiFileText, FiUploadCloud } from 'react-icons/fi';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function ResumeStatusCard({ resumeStatus }) {
  if (!resumeStatus?.hasResume) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center p-6 text-center">
          <FiUploadCloud className="text-ink-300" size={26} />
          <p className="mt-3 text-sm font-medium text-ink-900 dark:text-ink-100">No resume yet</p>
          <p className="mt-1 text-xs text-ink-400">Upload one to unlock your ATS score and AI feedback.</p>
          <Link to="/dashboard/resume">
            <Button size="sm" variant="gradient" className="mt-4">
              Upload resume
            </Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-signal-50 text-signal-500 dark:bg-signal-900/40">
            <FiFileText size={18} />
          </div>
          <div>
            <p className="text-sm font-medium text-ink-900 dark:text-ink-100">Resume Strength</p>
            <p className="text-xs text-ink-400 capitalize">{resumeStatus.parseStatus.replace('_', ' ')}</p>
          </div>
        </div>
        {resumeStatus.strengthScore != null ? (
          <p className="mt-4 font-mono text-3xl font-semibold text-ink-900 dark:text-ink-100">
            {resumeStatus.strengthScore}<span className="text-base text-ink-400">/100</span>
          </p>
        ) : (
          <p className="mt-4 text-xs text-ink-400">AI review in progress…</p>
        )}
        <Link to="/dashboard/resume" className="mt-2 inline-block text-xs font-medium text-signal-500 hover:text-signal-600">
          View full analysis →
        </Link>
      </CardContent>
    </Card>
  );
}
