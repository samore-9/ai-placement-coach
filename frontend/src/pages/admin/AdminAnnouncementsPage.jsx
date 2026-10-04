import { useState } from 'react';
import toast from 'react-hot-toast';
import { FiSend, FiBell } from 'react-icons/fi';
import { adminService } from '@/services/adminService';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function AdminAnnouncementsPage() {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [link, setLink] = useState('');
  const [sending, setSending] = useState(false);
  const [lastResult, setLastResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      const result = await adminService.broadcastAnnouncement({ title, message, link: link || undefined });
      setLastResult(result);
      toast.success(`Sent to ${result.recipientCount} students`);
      setTitle('');
      setMessage('');
      setLink('');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not send announcement');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink-900 dark:text-ink-100">Announcements</h1>
        <p className="mt-1 text-sm text-ink-500 dark:text-ink-300">
          Broadcast a notification to every active student — placement drives, deadline reminders, platform updates.
        </p>
      </div>

      <Card className="max-w-xl">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <FiBell className="text-signal-500" size={18} />
            <p className="text-sm font-semibold text-ink-900 dark:text-ink-100">New announcement</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Google campus drive next week" />
            </div>
            <div>
              <Label htmlFor="message">Message</Label>
              <textarea
                id="message" required rows={4}
                className="w-full rounded-xl border border-ink-100 bg-white p-3 text-sm text-ink-900 focus:outline-none focus:ring-2 focus:ring-signal-500 dark:bg-surface-dark-card dark:border-ink-700 dark:text-ink-100"
                value={message} onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="link">Link (optional)</Label>
              <Input id="link" type="url" value={link} onChange={(e) => setLink(e.target.value)} placeholder="https://…" />
            </div>
            <Button type="submit" variant="gradient" className="w-full" disabled={sending}>
              <FiSend size={15} /> {sending ? 'Sending…' : 'Send to all students'}
            </Button>
          </form>

          {lastResult && (
            <p className="mt-4 text-xs text-ink-400">Last sent to {lastResult.recipientCount} active students.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
