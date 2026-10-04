import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FiSearch } from 'react-icons/fi';
import { adminService } from '@/services/adminService';
import { DataTable } from '@/components/common/DataTable';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DashboardSkeleton } from '@/features/dashboard/components/DashboardSkeleton';
import { format } from 'date-fns';

const selectClass = 'flex h-9 rounded-lg border border-ink-100 bg-white px-2.5 text-xs text-ink-900 focus:outline-none focus:ring-2 focus:ring-signal-500 dark:bg-surface-dark-card dark:text-ink-100 dark:border-ink-700';

export default function AdminUsersPage() {
  const [search, setSearch] = useState('');
  const [role, setRole] = useState('');
  const [data, setData] = useState({ items: [], page: 1, pages: 1 });
  const [loading, setLoading] = useState(true);

  const load = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const result = await adminService.listUsers({ search, role, page });
      setData(result);
    } finally {
      setLoading(false);
    }
  }, [search, role]);

  useEffect(() => { load(1); }, [load]);

  const handleRoleChange = async (userId, newRole) => {
    try {
      await adminService.updateUser(userId, { role: newRole });
      toast.success('Role updated');
      load(data.page);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not update role');
    }
  };

  const handleToggleActive = async (userId, isActive) => {
    try {
      await adminService.updateUser(userId, { isActive: !isActive });
      toast.success(isActive ? 'User deactivated' : 'User activated');
      load(data.page);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not update status');
    }
  };

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    {
      key: 'role', label: 'Role',
      render: (u) => (
        <select className={selectClass} value={u.role} onChange={(e) => handleRoleChange(u._id, e.target.value)}>
          <option value="student">Student</option>
          <option value="admin">Admin</option>
          <option value="superadmin">Superadmin</option>
        </select>
      ),
    },
    {
      key: 'isActive', label: 'Status',
      render: (u) => (
        <button
          onClick={() => handleToggleActive(u._id, u.isActive)}
          className={`rounded-md px-2 py-0.5 font-mono text-[10px] font-semibold uppercase ${u.isActive ? 'bg-status-success/10 text-status-success' : 'bg-status-danger/10 text-status-danger'}`}
        >
          {u.isActive ? 'Active' : 'Inactive'}
        </button>
      ),
    },
    { key: 'createdAt', label: 'Joined', render: (u) => format(new Date(u.createdAt), 'MMM d, yyyy') },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink-900 dark:text-ink-100">Manage Users</h1>
        <p className="mt-1 text-sm text-ink-500 dark:text-ink-300">{data.total ?? 0} total users.</p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1 max-w-sm">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-300" size={15} />
          <Input placeholder="Search name or email…" className="pl-9 h-10" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <select className={selectClass + ' h-10'} value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="">All roles</option>
          <option value="student">Student</option>
          <option value="admin">Admin</option>
          <option value="superadmin">Superadmin</option>
        </select>
      </div>

      {loading ? <DashboardSkeleton /> : <DataTable columns={columns} rows={data.items} />}

      {data.pages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button variant="secondary" size="sm" disabled={data.page <= 1} onClick={() => load(data.page - 1)}>Previous</Button>
          <span className="font-mono text-xs text-ink-400">Page {data.page} of {data.pages}</span>
          <Button variant="secondary" size="sm" disabled={data.page >= data.pages} onClick={() => load(data.page + 1)}>Next</Button>
        </div>
      )}
    </div>
  );
}
