import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { atsService } from '@/services/aiFeatureServices';

export function useATS() {
  const [report, setReport] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [scanning, setScanning] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [latest, hist] = await Promise.all([
        atsService.getLatest().catch((err) => (err.response?.status === 404 ? null : Promise.reject(err))),
        atsService.getHistory(10).catch(() => []),
      ]);
      setReport(latest);
      setHistory(hist || []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const runScan = useCallback(
    async ({ targetRole, targetCompany }) => {
      setScanning(true);
      try {
        const data = await atsService.scan({ targetRole, targetCompany });
        setReport(data);
        toast.success('ATS scan complete');
        load();
        return data;
      } catch (err) {
        toast.error(err.response?.data?.message || 'ATS scan failed');
        throw err;
      } finally {
        setScanning(false);
      }
    },
    [load]
  );

  return { report, history, loading, scanning, runScan };
}
