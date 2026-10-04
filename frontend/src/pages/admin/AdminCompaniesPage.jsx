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

const EMPTY_FORM = { name: '', category: 'product_based', requiredSkills: '', preparationTips: '' };
const CATEGORY_LABEL = { startup: 'Startup', product_based: 'Product-based', service_based: 'Service-based', faang_maang: 'FAANG/MAANG' };

export default function AdminCompaniesPage() {
  const [data, setData] = useState({ items: [], page: 1, pages: 1 });
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async (page = 1) => {
    setLoading(true);
    try { setData(await adminService.listCompanies({ page })); } finally { setLoading(false); }
  }, []);

  useEffect(() => { load(1); }, [load]);

  const openCreate = () => { setForm(EMPTY_FORM); setEditingId(null); setModalOpen(true); };
  const openEdit = (c) => {
    setForm({
      name: c.name, category: c.category,
      requiredSkills: (c.requiredSkills || []).join(', '),
      preparationTips: (c.preparationTips || []).join('\n'),
    });
    setEditingId(c._id);
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      name: form.name, category: form.category,
      requiredSkills: form.requiredSkills.split(',').map((s) => s.trim()).filter(Boolean),
      preparationTips: form.preparationTips.split('\n').map((s) => s.trim()).filter(Boolean),
    };
    try {
      if (editingId) { await adminService.updateCompany(editingId, payload); toast.success('Company updated'); }
      else { await adminService.createCompany(payload); toast.success('Company added'); }
      setModalOpen(false);
      load(data.page);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not save company');
    } finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this company profile?')) return;
    try { await adminService.deleteCompany(id); toast.success('Company deleted'); load(data.page); }
    catch (err) { toast.error(err.response?.data?.message || 'Could not delete company'); }
  };

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'category', label: 'Category', render: (c) => CATEGORY_LABEL[c.category] },
    { key: 'requiredSkills', label: 'Skills', render: (c) => (c.requiredSkills || []).slice(0, 3).join(', ') },
    {
      key: 'actions', label: '',
      render: (c) => (
        <div className="flex gap-2">
          <button onClick={() => openEdit(c)} className="text-ink-400 hover:text-signal-500"><FiEdit2 size={14} /></button>
          <button onClick={() => handleDelete(c._id)} className="text-ink-400 hover:text-status-danger"><FiTrash2 size={14} /></button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink-900 dark:text-ink-100">Manage Companies</h1>
          <p className="mt-1 text-sm text-ink-500 dark:text-ink-300">{data.total ?? 0} company profiles.</p>
        </div>
        <Button variant="gradient" onClick={openCreate}><FiPlus size={15} /> Add company</Button>
      </div>

      {loading ? <DashboardSkeleton /> : <DataTable columns={columns} rows={data.items} />}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editingId ? 'Edit Company' : 'Add Company'}>
        <form onSubmit={handleSave} className="space-y-4">
          <div><Label>Name</Label><Input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
          <div>
            <Label>Category</Label>
            <select className="flex h-11 w-full rounded-xl border border-ink-100 bg-white px-3.5 text-sm dark:bg-surface-dark-card dark:border-ink-700 dark:text-ink-100" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
              {Object.entries(CATEGORY_LABEL).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
            </select>
          </div>
          <div><Label>Required skills (comma-separated)</Label><Input value={form.requiredSkills} onChange={(e) => setForm({ ...form, requiredSkills: e.target.value })} /></div>
          <div>
            <Label>Preparation tips (one per line)</Label>
            <textarea rows={3} className="w-full rounded-xl border border-ink-100 bg-white p-3 text-sm dark:bg-surface-dark-card dark:border-ink-700 dark:text-ink-100" value={form.preparationTips} onChange={(e) => setForm({ ...form, preparationTips: e.target.value })} />
          </div>
          <Button type="submit" variant="gradient" className="w-full" disabled={saving}>{saving ? 'Saving…' : editingId ? 'Save changes' : 'Add company'}</Button>
        </form>
      </Modal>
    </div>
  );
}
