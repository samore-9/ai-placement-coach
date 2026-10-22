import { z } from 'zod';

export const listCompaniesQuerySchema = z.object({
  category: z.enum(['startup', 'product_based', 'service_based', 'faang_maang']).optional(),
  search: z.string().trim().optional(),
  page: z.coerce.number().int().min(1).optional(),
  limit: z.coerce.number().int().min(1).max(100).optional(),
});

export const addInterviewExperienceSchema = z.object({
  title: z.string().trim().min(1, 'Title is required').max(150),
  content: z.string().trim().min(10, 'Please share more detail').max(5000),
  role: z.string().trim().max(100).optional(),
  result: z.enum(['selected', 'rejected', 'in_progress']).optional(),
});
