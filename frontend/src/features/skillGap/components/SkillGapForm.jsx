import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function SkillGapForm({ companies, onAnalyze, analyzing }) {
  const [targetCompany, setTargetCompany] = useState('');
  const [targetRole, setTargetRole] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!targetCompany) return;
    onAnalyze({ targetCompany, targetRole: targetRole.trim() || undefined });
  };

  return (
    <Card>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:flex-row sm:items-end">
          <div className="flex-1">
            <Label htmlFor="company">Target company</Label>
            <select
              id="company"
              value={targetCompany}
              onChange={(e) => setTargetCompany(e.target.value)}
              className="flex h-11 w-full rounded-xl border border-ink-100 bg-white px-3.5 text-sm text-ink-900 focus:outline-none focus:ring-2 focus:ring-signal-500 dark:bg-surface-dark-card dark:text-ink-100 dark:border-ink-700"
            >
              <option value="">Select a company</option>
              {companies.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <Label htmlFor="role">Target role (optional)</Label>
            <Input id="role" placeholder="SDE Intern" value={targetRole} onChange={(e) => setTargetRole(e.target.value)} />
          </div>
          <Button type="submit" variant="gradient" disabled={analyzing || !targetCompany} className="shrink-0">
            <FiSearch size={15} /> {analyzing ? 'Analyzing…' : 'Analyze gap'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
