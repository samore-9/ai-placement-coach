import { z } from 'zod';

export const listInterviewQuestionsQuerySchema = z.object({
  company: z.string().trim().optional(),
  topic: z.enum(['hr', 'technical', 'behavioral', 'dbms', 'os', 'cn', 'oops', 'java', 'javascript', 'react', 'node', 'mongodb', 'sql']).optional(),
  difficulty: z.enum(['easy', 'medium', 'hard']).optional(),
  search: z.string().trim().optional(),
  page: z.coerce.number().int().min(1).optional(),
  limit: z.coerce.number().int().min(1).max(100).optional(),
});
