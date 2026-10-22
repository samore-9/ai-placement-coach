import { z } from 'zod';

export const listQuestionsQuerySchema = z.object({
  topic: z.string().trim().optional(),
  difficulty: z.enum(['easy', 'medium', 'hard']).optional(),
  company: z.string().trim().optional(),
  sheet: z.enum(['striver_a2z', 'neetcode', 'blind_75']).optional(),
  search: z.string().trim().optional(),
  page: z.coerce.number().int().min(1).optional(),
  limit: z.coerce.number().int().min(1).max(100).optional(),
});
