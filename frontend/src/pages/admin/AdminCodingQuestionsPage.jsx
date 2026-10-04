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

const EMPTY_FORM = { title: '', slug: '', description: '', difficulty: 'easy', topics: '', companyTags: '' };

export default function AdminCodingQuestionsPage() {
  const [data, setData] = useState({ items: [], page: 1, pages: 1 });
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async (page = 1) => {
    setLoading(true);
    try { setData(await adminService.listCodingQuestions({ page })); } finally { setLoading(false); }
  }, []);

  useEffect(() => { load(1); }, [load]);

  const openCreate = () => { setForm(EMPTY_FORM); setEditingId(null); setModalOpen(true); };
  const openEdit = (q) => {
    setForm({
      title: q.title, slug: q.slug, description: q.description, difficulty: q.difficulty,
      topics: (q.topics || []).join(', '), companyTags: (q.companyTags || []).join(', '),
    });
    setEditingId(q._id);
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      ...form,
      topics: form.topics.split(',').map((s) => s.trim()).filter(Boolean),
      companyTags: form.companyTags.split(',').map((s) => s.trim()).filter(Boolean),
    };
    try {
      if (editingId) { await adminService.updateCodingQuestion(editingId, payload); toast.success('Question updated'); }
      else { await adminService.createCodingQuestion(payload); toast.success('Question added'); }
      setModalOpen(false);
      load(data.page);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not save question');
    } finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this question?')) return;
    try { await adminService.deleteCodingQuestion(id); toast.success('Question deleted'); load(data.page); }
    catch (err) { toast.error(err.response?.data?.message || 'Could not delete question'); }
  };

  const columns = [
    { key: 'title', label: 'Title' },
    { key: 'difficulty', label: 'Difficulty', render: (q) => <span className="capitalize">{q.difficulty}</span> },
    { key: 'topics', label: 'Topics', render: (q) => (q.topics || []).slice(0, 2).join(', ') },
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
          <h1 className="font-display text-2xl font-semibold text-ink-900 dark:text-ink-100">Manage Coding Questions</h1>
          <p className="mt-1 text-sm text-ink-500 dark:text-ink-300">{data.total ?? 0} questions in the sheet.</p>
        </div>
        <Button variant="gradient" onClick={openCreate}><FiPlus size={15} /> Add question</Button>
      </div>

      {loading ? <DashboardSkeleton /> : <DataTable columns={columns} rows={data.items} />}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editingId ? 'Edit Question' : 'Add Coding Question'} wide>
        <form onSubmit={handleSave} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div><Label>Title</Label><Input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
          <div><Label>Slug</Label><Input required placeholder="two-sum" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} /></div>
          <div>
            <Label>Difficulty</Label>
            <select className="flex h-11 w-full rounded-xl border border-ink-100 bg-white px-3.5 text-sm dark:bg-surface-dark-card dark:border-ink-700 dark:text-ink-100" value={form.difficulty} onChange={(e) => setForm({ ...form, difficulty: e.target.value })}>
              <option value="easy">Easy</option><option value="medium">Medium</option><option value="hard">Hard</option>
            </select>
          </div>
          <div><Label>Company tags (comma-separated)</Label><Input value={form.companyTags} onChange={(e) => setForm({ ...form, companyTags: e.target.value })} /></div>
          <div className="sm:col-span-2"><Label>Topics (comma-separated)</Label><Input required placeholder="arrays, hashmap" value={form.topics} onChange={(e) => setForm({ ...form, topics: e.target.value })} /></div>
          <div className="sm:col-span-2">
            <Label>Description</Label>
            <textarea required rows={3} className="w-full rounded-xl border border-ink-100 bg-white p-3 text-sm dark:bg-surface-dark-card dark:border-ink-700 dark:text-ink-100" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </div>
          <Button type="submit" variant="gradient" className="sm:col-span-2" disabled={saving}>{saving ? 'Saving…' : editingId ? 'Save changes' : 'Add question'}</Button>
        </form>
      </Modal>
    </div>
  );
}
