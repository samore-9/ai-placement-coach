import { z } from 'zod';

export const listJobsQuerySchema = z.object({
  jobType: z.enum(['internship', 'full_time', 'internship_ppo']).optional(),
  location: z.string().trim().optional(),
  minCgpa: z.coerce.number().min(0).max(10).optional(),
  batch: z.coerce.number().int().optional(),
  skill: z.string().trim().optional(),
  search: z.string().trim().optional(),
  page: z.coerce.number().int().min(1).optional(),
  limit: z.coerce.number().int().min(1).max(100).optional(),
});

export const applyToJobSchema = z.object({
  resumeId: z.string().min(1).optional(),
  notes: z.string().trim().max(1000).optional(),
});
