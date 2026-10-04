import { useEffect, useState } from 'react';
import { adminService } from '@/services/adminService';

export function useAdminAnalytics() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminService.getAnalytics().then(setData).finally(() => setLoading(false));
  }, []);

  return { data, loading };
}
