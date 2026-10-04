import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { dashboardService, progressService, taskService } from '@/services/dashboardService';

export function useDashboard() {
  const [overview, setOverview] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [overviewData, historyData] = await Promise.all([
        dashboardService.getOverview(),
        progressService.getHistory(30),
      ]);
      setOverview(overviewData);
      setHistory(historyData);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not load your dashboard');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const completeTask = useCallback(
    async (taskId) => {
      try {
        await taskService.complete(taskId);
        toast.success('Nice — task complete. XP added.');
        load(); // re-sync overview (todayGoal, xp) after mutation
      } catch (err) {
        toast.error(err.response?.data?.message || 'Could not mark this task complete');
      }
    },
    [load]
  );

  return { overview, history, loading, error, reload: load, completeTask };
}
