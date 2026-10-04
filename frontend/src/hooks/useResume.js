import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { resumeService } from '@/services/resumeService';

export function useResume() {
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await resumeService.getActive();
      setResume(data);
      setError(null);
    } catch (err) {
      if (err.response?.status === 404) {
        setResume(null); // no resume yet — not an error state
      } else {
        setError(err.response?.data?.message || 'Could not load your resume');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const upload = useCallback(
    async (file) => {
      setUploading(true);
      try {
        const data = await resumeService.upload(file);
        setResume(data);
        toast.success('Resume analyzed successfully');
        return data;
      } catch (err) {
        toast.error(err.response?.data?.message || 'Resume upload failed');
        throw err;
      } finally {
        setUploading(false);
      }
    },
    []
  );

  return { resume, loading, uploading, error, upload, reload: load };
}
