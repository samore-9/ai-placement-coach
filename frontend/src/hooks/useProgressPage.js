import { useEffect, useState } from 'react';
import { progressService } from '@/services/dashboardService';

export function useProgressPage() {
  const [heatmap, setHeatmap] = useState([]);
  const [weekly, setWeekly] = useState([]);
  const [history, setHistory] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    Promise.all([
      progressService.getHeatmap(182),
      progressService.getWeekly(12),
      progressService.getHistory(90),
      progressService.getAchievements(),
    ])
      .then(([h, w, hist, a]) => {
        if (cancelled) return;
        setHeatmap(h);
        setWeekly(w);
        setHistory(hist);
        setAchievements(a);
      })
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, []);

  return { heatmap, weekly, history, achievements, loading };
}
