import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import { mockInterviewService } from '@/services/aiFeatureServices';

export function useMockInterview() {
  const [question, setQuestion] = useState(null);
  const [evaluation, setEvaluation] = useState(null);
  const [starting, setStarting] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const startRound = useCallback(async ({ topic, difficulty }) => {
    setStarting(true);
    setEvaluation(null);
    try {
      const data = await mockInterviewService.start({ topic, difficulty });
      setQuestion(data);
      return data;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not start a new round');
      throw err;
    } finally {
      setStarting(false);
    }
  }, []);

  const submitAnswer = useCallback(
    async (answer) => {
      if (!question) return;
      setSubmitting(true);
      try {
        const result = await mockInterviewService.submit({ question: question.question, answer });
        setEvaluation(result);
        return result;
      } catch (err) {
        toast.error(err.response?.data?.message || 'Could not evaluate your answer');
        throw err;
      } finally {
        setSubmitting(false);
      }
    },
    [question]
  );

  const reset = useCallback(() => {
    setQuestion(null);
    setEvaluation(null);
  }, []);

  return { question, evaluation, starting, submitting, startRound, submitAnswer, reset };
}
