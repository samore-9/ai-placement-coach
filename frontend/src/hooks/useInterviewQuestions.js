import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { interviewQuestionService, bookmarkService } from '@/services/practiceServices';

export function useInterviewQuestions() {
  const [filters, setFilters] = useState({ company: '', topic: '', difficulty: '', search: '', page: 1 });
  const [data, setData] = useState({ items: [], total: 0, pages: 1 });
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    interviewQuestionService.getCompanies().then(setCompanies).catch(() => setCompanies([]));
  }, []);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const result = await interviewQuestionService.list(filters);
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

  const toggleBookmark = useCallback(async (id) => {
    try {
      const { bookmarked } = await bookmarkService.toggle('interview_question', id);
      setData((d) => ({ ...d, items: d.items.map((q) => (q._id === id ? { ...q, isBookmarked: bookmarked } : q)) }));
    } catch {
      toast.error('Could not update bookmark');
    }
  }, []);

  return { filters, updateFilter, data, companies, loading, toggleBookmark };
}
