import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FiPlus, FiTrash2, FiEdit2 } from 'react-icons/fi';
import { adminService } from '@/services/adminService';
import { DataTable } from '@/components/common/DataTable';
import { Modal } from '@/components/common/Modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DashboardSkeleton } from '@/features/dashboard/components/DashboardSkeleton';

const TOPICS = ['hr', 'technical', 'behavioral', 'dbms', 'os', 'cn', 'oops', 'java', 'javascript', 'react', 'node', 'mongodb', 'sql'];
const EMPTY_FORM = { company: '', topic: 'technical', question: '', expectedAnswer: '', recruiterPerspective: '' };

export default function AdminInterviewQuestionsPage() {
  const [data, setData] = useState({ items: [], page: 1, pages: 1 });
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async (page = 1) => {
    setLoading(true);
    try { setData(await adminService.listInterviewQuestions({ page })); } finally { setLoading(false); }
  }, []);

  useEffect(() => { load(1); }, [load]);

  const openCreate = () => { setForm(EMPTY_FORM); setEditingId(null); setModalOpen(true); };
  const openEdit = (q) => {
    setForm({ company: q.company || '', topic: q.topic, question: q.question, expectedAnswer: q.expectedAnswer, recruiterPerspective: q.recruiterPerspective || '' });
    setEditingId(q._id);
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingId) { await adminService.updateInterviewQuestion(editingId, form); toast.success('Question updated'); }
      else { await adminService.createInterviewQuestion(form); toast.success('Question added'); }
      setModalOpen(false);
      load(data.page);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not save question');
    } finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this question?')) return;
    try { await adminService.deleteInterviewQuestion(id); toast.success('Question deleted'); load(data.page); }
    catch (err) { toast.error(err.response?.data?.message || 'Could not delete question'); }
  };

  const columns = [
    { key: 'question', label: 'Question', render: (q) => <span className="line-clamp-1 max-w-xs block">{q.question}</span> },
    { key: 'company', label: 'Company', render: (q) => q.company || '—' },
    { key: 'topic', label: 'Topic', render: (q) => <span className="uppercase">{q.topic}</span> },
    {
      key: 'actions', label: '',
      render: (q) => (
        <div className="flex gap-2">
          <button onClick={() => openEdit(q)} className="text-ink-400 hover:text-signal-500"><FiEdit2 size={14} /></button>
          <button onClick={() => handleDelete(q._id)} className="text-ink-400 hover:text-status-danger"><FiTrash2 size={14} /></button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink-900 dark:text-ink-100">Manage Interview Questions</h1>
          <p className="mt-1 text-sm text-ink-500 dark:text-ink-300">{data.total ?? 0} questions in the bank.</p>
        </div>
        <Button variant="gradient" onClick={openCreate}><FiPlus size={15} /> Add question</Button>
      </div>

      {loading ? <DashboardSkeleton /> : <DataTable columns={columns} rows={data.items} />}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editingId ? 'Edit Question' : 'Add Interview Question'} wide>
        <form onSubmit={handleSave} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div><Label>Company (optional)</Label><Input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} /></div>
          <div>
            <Label>Topic</Label>
            <select className="flex h-11 w-full rounded-xl border border-ink-100 bg-white px-3.5 text-sm dark:bg-surface-dark-card dark:border-ink-700 dark:text-ink-100" value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })}>
              {TOPICS.map((t) => <option key={t} value={t}>{t.toUpperCase()}</option>)}
            </select>
          </div>
          <div className="sm:col-span-2">
            <Label>Question</Label>
            <textarea required rows={2} className="w-full rounded-xl border border-ink-100 bg-white p-3 text-sm dark:bg-surface-dark-card dark:border-ink-700 dark:text-ink-100" value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} />
          </div>
          <div className="sm:col-span-2">
            <Label>Expected answer</Label>
            <textarea required rows={3} className="w-full rounded-xl border border-ink-100 bg-white p-3 text-sm dark:bg-surface-dark-card dark:border-ink-700 dark:text-ink-100" value={form.expectedAnswer} onChange={(e) => setForm({ ...form, expectedAnswer: e.target.value })} />
          </div>
          <div className="sm:col-span-2">
            <Label>Recruiter perspective (optional)</Label>
            <textarea rows={2} className="w-full rounded-xl border border-ink-100 bg-white p-3 text-sm dark:bg-surface-dark-card dark:border-ink-700 dark:text-ink-100" value={form.recruiterPerspective} onChange={(e) => setForm({ ...form, recruiterPerspective: e.target.value })} />
          </div>
          <Button type="submit" variant="gradient" className="sm:col-span-2" disabled={saving}>{saving ? 'Saving…' : editingId ? 'Save changes' : 'Add question'}</Button>
        </form>
      </Modal>
    </div>
  );
}
