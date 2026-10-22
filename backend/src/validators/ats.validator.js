import { z } from 'zod';

export const runATSScanSchema = z.object({
  targetRole: z.string().trim().max(100).optional(),
  targetCompany: z.string().trim().max(100).optional(),
});
