import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { roadmapService } from '@/services/aiFeatureServices';

export function useRoadmap() {
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await roadmapService.getActive();
      setRoadmap(data);
    } catch (err) {
      if (err.response?.status === 404) setRoadmap(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const generate = useCallback(
    async (payload) => {
      setGenerating(true);
      try {
        const data = await roadmapService.create(payload);
        setRoadmap(data);
        toast.success('Your roadmap is ready');
        return data;
      } catch (err) {
        toast.error(err.response?.data?.message || 'Could not generate roadmap');
        throw err;
      } finally {
        setGenerating(false);
      }
    },
    []
  );

  const setMilestoneStatus = useCallback(
    async (milestoneId, status) => {
      const previous = roadmap;
      try {
        const data = await roadmapService.updateMilestone(roadmap._id, milestoneId, status);
        setRoadmap(data);
      } catch (err) {
        setRoadmap(previous);
        toast.error(err.response?.data?.message || 'Could not update milestone');
      }
    },
    [roadmap]
  );

  const toggleWeek = useCallback(
    async (weekNumber, completed) => {
      const previous = roadmap;
      try {
        const data = await roadmapService.toggleWeek(roadmap._id, weekNumber, completed);
        setRoadmap(data);
      } catch (err) {
        setRoadmap(previous);
        toast.error(err.response?.data?.message || 'Could not update task');
      }
    },
    [roadmap]
  );

  return { roadmap, loading, generating, generate, setMilestoneStatus, toggleWeek };
}
