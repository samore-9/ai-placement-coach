import { generateInterviewQuestion, evaluateInterviewAnswer } from './ai/mockInterviewEvaluator.js';
import { upsertTodayProgress, getTodaySummary } from './progress.service.js';

export const startInterviewRound = async ({ topic, difficulty }) => {
  const question = await generateInterviewQuestion({ topic, difficulty });
  return { question, topic: topic || 'technical', difficulty: difficulty || 'medium' };
};

export const submitInterviewAnswer = async (userId, { question, answer }) => {
  const evaluation = await evaluateInterviewAnswer(question, answer);

  const today = await getTodaySummary(userId);
  await upsertTodayProgress(userId, { interviewPrepCount: (today?.interviewPrepCount ?? 0) + 1 });

  return evaluation;
};
