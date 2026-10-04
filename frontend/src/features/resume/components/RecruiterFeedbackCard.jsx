import { FiMessageSquare } from 'react-icons/fi';
import { Card, CardContent } from '@/components/ui/card';

export function RecruiterFeedbackCard({ feedback }) {
  if (!feedback) return null;
  return (
    <Card className="lg:col-span-2 bg-gradient-signal border-none">
      <CardContent className="flex gap-4 p-6">
        <FiMessageSquare className="mt-1 shrink-0 text-white/80" size={20} />
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-white/70">Recruiter Feedback</p>
          <p className="mt-1.5 text-sm leading-relaxed text-white">{feedback}</p>
        </div>
      </CardContent>
    </Card>
  );
}
