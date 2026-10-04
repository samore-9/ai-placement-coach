import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { skillGapService } from '@/services/aiFeatureServices';

export function useSkillGap() {
  const [companies, setCompanies] = useState([]);
  const [result, setResult] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);

  useEffect(() => {
    skillGapService.getCompanies().then(setCompanies).catch(() => setCompanies([]));
  }, []);

  const analyze = useCallback(async ({ targetCompany, targetRole }) => {
    setAnalyzing(true);
    try {
      const data = await skillGapService.analyze({ targetCompany, targetRole });
      setResult(data);
      return data;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Skill gap analysis failed');
      throw err;
    } finally {
      setAnalyzing(false);
    }
  }, []);

  return { companies, result, analyzing, analyze };
}
