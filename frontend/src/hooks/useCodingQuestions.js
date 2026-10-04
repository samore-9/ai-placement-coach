import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { codingService, bookmarkService } from '@/services/practiceServices';

export function useCodingQuestions() {
  const [filters, setFilters] = useState({ topic: '', difficulty: '', company: '', sheet: '', search: '', page: 1 });
  const [data, setData] = useState({ items: [], total: 0, pages: 1 });
  const [topics, setTopics] = useState([]);
  const [companyTags, setCompanyTags] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    codingService.getTopics().then(setTopics).catch(() => setTopics([]));
    codingService.getCompanyTags().then(setCompanyTags).catch(() => setCompanyTags([]));
  }, []);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const result = await codingService.list(filters);
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

  const toggleBookmark = useCallback(
    async (questionId) => {
      try {
        const { bookmarked } = await bookmarkService.toggle('coding_question', questionId);
        setData((d) => ({ ...d, items: d.items.map((q) => (q._id === questionId ? { ...q, isBookmarked: bookmarked } : q)) }));
      } catch {
        toast.error('Could not update bookmark');
      }
    },
    []
  );

  const markSolved = useCallback(async (questionId) => {
    try {
      const result = await codingService.markSolved(questionId);
      toast.success(`Solved! ${result.streak}-day streak 🔥`);
      return result;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not mark as solved');
    }
  }, []);

  return { filters, updateFilter, data, topics, companyTags, loading, toggleBookmark, markSolved };
}
