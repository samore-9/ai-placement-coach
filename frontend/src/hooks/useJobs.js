import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { jobService, bookmarkService } from '@/services/practiceServices';

export function useJobs() {
  const [filters, setFilters] = useState({ jobType: '', location: '', search: '', page: 1 });
  const [data, setData] = useState({ items: [], total: 0, pages: 1 });
  const [loading, setLoading] = useState(true);
  const [applyingId, setApplyingId] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const result = await jobService.list(filters);
      setData(result);
    } catch {
      setData({ items: [], total: 0, pages: 1 });
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    load();
  }, [load]);

  const updateFilter = (patch) => setFilters((f) => ({ ...f, ...patch, page: patch.page ?? 1 }));

  const toggleBookmark = useCallback(async (jobId) => {
    try {
      const { bookmarked } = await bookmarkService.toggle('job', jobId);
      setData((d) => ({ ...d, items: d.items.map((j) => (j._id === jobId ? { ...j, isBookmarked: bookmarked } : j)) }));
    } catch {
      toast.error('Could not update bookmark');
    }
  }, []);

  const apply = useCallback(async (jobId) => {
    setApplyingId(jobId);
    try {
      await jobService.apply(jobId, {});
      toast.success('Application submitted');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not submit application');
    } finally {
      setApplyingId(null);
    }
  }, []);

  return { filters, updateFilter, data, loading, toggleBookmark, apply, applyingId };
}
