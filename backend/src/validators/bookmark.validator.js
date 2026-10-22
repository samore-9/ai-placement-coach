import { z } from 'zod';

export const toggleBookmarkSchema = z.object({
  itemType: z.enum(['job', 'coding_question', 'interview_question', 'company']),
  itemId: z.string().min(1, 'itemId is required'),
});
