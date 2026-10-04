import { useState } from 'react';
import { FiTarget } from 'react-icons/fi';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function ATSScanForm({ onScan, scanning, hasResume }) {
  const [targetRole, setTargetRole] = useState('');
  const [targetCompany, setTargetCompany] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onScan({ targetRole: targetRole.trim() || undefined, targetCompany: targetCompany.trim() || undefined });
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-2">
          <FiTarget className="text-signal-500" size={18} />
          <p className="text-sm font-semibold text-ink-900 dark:text-ink-100">Run a new ATS scan</p>
        </div>
        {!hasResume ? (
          <p className="mt-3 text-sm text-ink-400">Upload a resume first — the ATS scan runs against your active resume.</p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end">
            <div className="flex-1">
              <Label htmlFor="targetRole">Target role</Label>
              <Input id="targetRole" placeholder="SDE Intern" value={targetRole} onChange={(e) => setTargetRole(e.target.value)} />
            </div>
            <div className="flex-1">
              <Label htmlFor="targetCompany">Target company</Label>
              <Input id="targetCompany" placeholder="e.g. Google" value={targetCompany} onChange={(e) => setTargetCompany(e.target.value)} />
            </div>
            <Button type="submit" variant="gradient" disabled={scanning} className="shrink-0">
              {scanning ? 'Scanning…' : 'Run scan'}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
