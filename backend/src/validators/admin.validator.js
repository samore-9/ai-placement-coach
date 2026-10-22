import { z } from 'zod';

export const listUsersQuerySchema = z.object({
  role: z.enum(['student', 'admin', 'superadmin']).optional(),
  search: z.string().trim().optional(),
  page: z.coerce.number().int().min(1).optional(),
  limit: z.coerce.number().int().min(1).max(100).optional(),
});

export const updateUserStatusSchema = z.object({
  role: z.enum(['student', 'admin', 'superadmin']).optional(),
  isActive: z.boolean().optional(),
});

export const announcementSchema = z.object({
  title: z.string().trim().min(1, 'Title is required').max(150),
  message: z.string().trim().min(1, 'Message is required').max(1000),
  link: z.string().trim().url().optional().or(z.literal('')),
});

export const createJobSchema = z.object({
  companyName: z.string().trim().min(1, 'Company name is required'),
  company: z.string().optional(),
  role: z.string().trim().min(1, 'Role is required'),
  jobType: z.enum(['internship', 'full_time', 'internship_ppo']).optional(),
  package: z.object({ min: z.number().optional(), max: z.number().optional(), currency: z.string().optional() }).optional(),
  location: z.string().trim().min(1, 'Location is required'),
  isRemote: z.boolean().optional(),
  eligibility: z.object({ minCgpa: z.number().optional(), allowedBranches: z.array(z.string()).optional() }).optional(),
  batch: z.array(z.number()).optional(),
  deadline: z.coerce.date(),
  applyLink: z.string().trim().url('Must be a valid URL'),
  description: z.string().trim().min(10, 'Description is required'),
  requiredSkills: z.array(z.string()).optional(),
});

export const updateJobSchema = createJobSchema.partial();

export const createCompanySchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  category: z.enum(['startup', 'product_based', 'service_based', 'faang_maang']),
  logoUrl: z.string().trim().optional(),
  hiringProcess: z.array(z.string()).optional(),
  packageRange: z.object({ min: z.number().optional(), max: z.number().optional(), currency: z.string().optional() }).optional(),
  eligibility: z.object({ minCgpa: z.number().optional(), allowedBranches: z.array(z.string()).optional(), batches: z.array(z.number()).optional() }).optional(),
  preparationTips: z.array(z.string()).optional(),
  requiredSkills: z.array(z.string()).optional(),
});

export const updateCompanySchema = createCompanySchema.partial();

export const createCodingQuestionSchema = z.object({
  title: z.string().trim().min(1, 'Title is required'),
  slug: z.string().trim().min(1, 'Slug is required').regex(/^[a-z0-9-]+$/, 'Slug must be lowercase, alphanumeric, and hyphenated'),
  description: z.string().trim().min(10, 'Description is required'),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  topics: z.array(z.string()).min(1, 'At least one topic is required'),
  companyTags: z.array(z.string()).optional(),
  sheetTags: z.array(z.enum(['striver_a2z', 'neetcode', 'blind_75'])).optional(),
  hints: z.array(z.string()).optional(),
  complexity: z.object({ time: z.string().optional(), space: z.string().optional() }).optional(),
  solutionUrl: z.string().optional(),
  videoUrl: z.string().optional(),
  externalLink: z.string().optional(),
  order: z.number().optional(),
});

export const updateCodingQuestionSchema = createCodingQuestionSchema.partial();

export const createInterviewQuestionSchema = z.object({
  company: z.string().trim().optional(),
  topic: z.enum(['hr', 'technical', 'behavioral', 'dbms', 'os', 'cn', 'oops', 'java', 'javascript', 'react', 'node', 'mongodb', 'sql']),
  question: z.string().trim().min(1, 'Question is required'),
  expectedAnswer: z.string().trim().min(1, 'Expected answer is required'),
  recruiterPerspective: z.string().trim().optional(),
  commonMistakes: z.array(z.string()).optional(),
  sampleBestAnswer: z.string().trim().optional(),
  followUpQuestions: z.array(z.string()).optional(),
  difficulty: z.enum(['easy', 'medium', 'hard']).optional(),
  tags: z.array(z.string()).optional(),
});

export const updateInterviewQuestionSchema = createInterviewQuestionSchema.partial();
