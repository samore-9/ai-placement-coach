import { z } from 'zod';

export const skillGapSchema = z.object({
  targetCompany: z.string().trim().max(100).optional(),
  targetRole: z.string().trim().max(100).optional(),
});
