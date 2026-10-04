import { useState } from 'react';
import { FiZap } from 'react-icons/fi';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function RoadmapGenerateForm({ onGenerate, generating, hasExisting }) {
  const [targetCompany, setTargetCompany] = useState('');
  const [targetRole, setTargetRole] = useState('');
  const [currentLevel, setCurrentLevel] = useState('beginner');
  const [timelineWeeks, setTimelineWeeks] = useState(12);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!targetCompany.trim() || !targetRole.trim()) return;
    onGenerate({ targetCompany: targetCompany.trim(), targetRole: targetRole.trim(), currentLevel, timelineWeeks: Number(timelineWeeks) });
  };

  return (
    <Card>
      <CardContent className="p-6">
        <p className="text-sm font-semibold text-ink-900 dark:text-ink-100">
          {hasExisting ? 'Generate a new roadmap' : 'Generate your roadmap'}
        </p>
        <p className="mt-1 text-xs text-ink-400">
          {hasExisting && 'This archives your current roadmap and starts a fresh one.'}
        </p>
        <form onSubmit={handleSubmit} className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Label htmlFor="targetCompany">Target company</Label>
            <Input id="targetCompany" placeholder="e.g. Amazon" value={targetCompany} onChange={(e) => setTargetCompany(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="targetRole">Target role</Label>
            <Input id="targetRole" placeholder="SDE Intern" value={targetRole} onChange={(e) => setTargetRole(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="currentLevel">Current level</Label>
            <select
              id="currentLevel"
              value={currentLevel}
              onChange={(e) => setCurrentLevel(e.target.value)}
              className="flex h-11 w-full rounded-xl border border-ink-100 bg-white px-3.5 text-sm text-ink-900 focus:outline-none focus:ring-2 focus:ring-signal-500 dark:bg-surface-dark-card dark:text-ink-100 dark:border-ink-700"
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
          <div>
            <Label htmlFor="timelineWeeks">Timeline (weeks)</Label>
            <Input id="timelineWeeks" type="number" min={4} max={52} value={timelineWeeks} onChange={(e) => setTimelineWeeks(e.target.value)} />
          </div>
          <Button type="submit" variant="gradient" disabled={generating} className="sm:col-span-2 lg:col-span-4">
            <FiZap size={15} /> {generating ? 'Generating your roadmap…' : 'Generate roadmap'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
