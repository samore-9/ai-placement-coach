import { z } from 'zod';

export const createRoadmapSchema = z.object({
  targetCompany: z.string().trim().min(1, 'Target company is required').max(100),
  targetRole: z.string().trim().min(1, 'Target role is required').max(100),
  currentLevel: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
  timelineWeeks: z.number().int().min(4).max(52).optional(),
});

export const updateMilestoneSchema = z.object({
  status: z.enum(['locked', 'pending', 'in_progress', 'completed']),
});

export const toggleWeeklyTaskSchema = z.object({
  completed: z.boolean(),
});
