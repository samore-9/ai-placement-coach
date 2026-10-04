import { useMockInterview } from '@/hooks/useMockInterview';
import { InterviewSetup } from '@/features/mockInterview/components/InterviewSetup';
import { InterviewQuestionCard } from '@/features/mockInterview/components/InterviewQuestionCard';
import { InterviewEvaluationResult } from '@/features/mockInterview/components/InterviewEvaluationResult';

export default function MockInterviewPage() {
  const { question, evaluation, starting, submitting, startRound, submitAnswer, reset } = useMockInterview();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink-900 dark:text-ink-100">Mock Interview</h1>
        <p className="mt-1 text-sm text-ink-500 dark:text-ink-300">
          Practice with an AI interviewer that scores your answers on accuracy, confidence, and communication.
        </p>
      </div>

      <div className="mx-auto max-w-2xl">
        {!question && <InterviewSetup onStart={startRound} starting={starting} />}

        {question && !evaluation && (
          <InterviewQuestionCard question={question} onSubmit={submitAnswer} submitting={submitting} onNewRound={reset} />
        )}

        {evaluation && <InterviewEvaluationResult evaluation={evaluation} onNewRound={reset} />}
      </div>
    </div>
  );
}
