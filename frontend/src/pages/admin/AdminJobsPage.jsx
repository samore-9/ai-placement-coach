import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FiPlus, FiTrash2, FiEdit2 } from 'react-icons/fi';
import { format } from 'date-fns';
import { adminService } from '@/services/adminService';
import { DataTable } from '@/components/common/DataTable';
import { Modal } from '@/components/common/Modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DashboardSkeleton } from '@/features/dashboard/components/DashboardSkeleton';

const EMPTY_FORM = {
  companyName: '', role: '', jobType: 'internship', location: '', deadline: '', applyLink: '', description: '',
  requiredSkills: '',
};

export default function AdminJobsPage() {
  const [data, setData] = useState({ items: [], page: 1, pages: 1 });
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      setData(await adminService.listJobs({ page }));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(1); }, [load]);

  const openCreate = () => { setForm(EMPTY_FORM); setEditingId(null); setModalOpen(true); };
  const openEdit = (job) => {
    setForm({
      companyName: job.companyName, role: job.role, jobType: job.jobType, location: job.location,
      deadline: job.deadline?.slice(0, 10) || '', applyLink: job.applyLink, description: job.description,
      requiredSkills: (job.requiredSkills || []).join(', '),
    });
    setEditingId(job._id);
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    const payload = { ...form, requiredSkills: form.requiredSkills.split(',').map((s) => s.trim()).filter(Boolean) };
    try {
      if (editingId) {
        await adminService.updateJob(editingId, payload);
        toast.success('Job updated');
      } else {
        await adminService.createJob(payload);
        toast.success('Job posted');
      }
      setModalOpen(false);
      load(data.page);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not save job');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this job listing?')) return;
    try {
      await adminService.deleteJob(id);
      toast.success('Job deleted');
      load(data.page);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not delete job');
    }
  };

  const columns = [
    { key: 'role', label: 'Role' },
    { key: 'companyName', label: 'Company' },
    { key: 'location', label: 'Location' },
    { key: 'deadline', label: 'Deadline', render: (j) => format(new Date(j.deadline), 'MMM d, yyyy') },
    {
      key: 'actions', label: '',
      render: (j) => (
        <div className="flex gap-2">
          <button onClick={() => openEdit(j)} className="text-ink-400 hover:text-signal-500"><FiEdit2 size={14} /></button>
          <button onClick={() => handleDelete(j._id)} className="text-ink-400 hover:text-status-danger"><FiTrash2 size={14} /></button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink-900 dark:text-ink-100">Manage Jobs</h1>
          <p className="mt-1 text-sm text-ink-500 dark:text-ink-300">{data.total ?? 0} total listings.</p>
        </div>
        <Button variant="gradient" onClick={openCreate}><FiPlus size={15} /> Post job</Button>
      </div>

      {loading ? <DashboardSkeleton /> : <DataTable columns={columns} rows={data.items} />}

      {data.pages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button variant="secondary" size="sm" disabled={data.page <= 1} onClick={() => load(data.page - 1)}>Previous</Button>
          <span className="font-mono text-xs text-ink-400">Page {data.page} of {data.pages}</span>
          <Button variant="secondary" size="sm" disabled={data.page >= data.pages} onClick={() => load(data.page + 1)}>Next</Button>
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editingId ? 'Edit Job' : 'Post a New Job'} wide>
        <form onSubmit={handleSave} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div><Label>Company name</Label><Input required value={form.companyName} onChange={(e) => setForm({ ...form, companyName: e.target.value })} /></div>
          <div><Label>Role</Label><Input required value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} /></div>
          <div>
            <Label>Job type</Label>
            <select className="flex h-11 w-full rounded-xl border border-ink-100 bg-white px-3.5 text-sm dark:bg-surface-dark-card dark:border-ink-700 dark:text-ink-100" value={form.jobType} onChange={(e) => setForm({ ...form, jobType: e.target.value })}>
              <option value="internship">Internship</option>
              <option value="full_time">Full-time</option>
              <option value="internship_ppo">Internship + PPO</option>
            </select>
          </div>
          <div><Label>Location</Label><Input required value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} /></div>
          <div><Label>Deadline</Label><Input type="date" required value={form.deadline} onChange={(e) => setForm({ ...form, deadline: e.target.value })} /></div>
          <div><Label>Apply link</Label><Input required type="url" value={form.applyLink} onChange={(e) => setForm({ ...form, applyLink: e.target.value })} /></div>
          <div className="sm:col-span-2"><Label>Required skills (comma-separated)</Label><Input value={form.requiredSkills} onChange={(e) => setForm({ ...form, requiredSkills: e.target.value })} /></div>
          <div className="sm:col-span-2">
            <Label>Description</Label>
            <textarea required rows={4} className="w-full rounded-xl border border-ink-100 bg-white p-3 text-sm dark:bg-surface-dark-card dark:border-ink-700 dark:text-ink-100" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </div>
          <Button type="submit" variant="gradient" className="sm:col-span-2" disabled={saving}>{saving ? 'Saving…' : editingId ? 'Save changes' : 'Post job'}</Button>
        </form>
      </Modal>
    </div>
  );
}
