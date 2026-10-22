import { z } from 'zod';

export const startRoundSchema = z.object({
  topic: z.enum(['dsa', 'system_design', 'hr', 'behavioral', 'core_cs', 'technical']).optional(),
  difficulty: z.enum(['easy', 'medium', 'hard']).optional(),
});

export const submitAnswerSchema = z.object({
  question: z.string().trim().min(1, 'Question is required'),
  answer: z.string().trim().min(1, 'An answer is required'),
});
