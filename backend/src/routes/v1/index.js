import { Router } from 'express';
import mongoose from 'mongoose';
import authRoutes from './auth.routes.js';
import dashboardRoutes from './dashboard.routes.js';
import progressRoutes from './progress.routes.js';
import taskRoutes from './task.routes.js';
import resumeRoutes from './resume.routes.js';
import atsRoutes from './ats.routes.js';
import skillGapRoutes from './skillGap.routes.js';
import roadmapRoutes from './roadmap.routes.js';
import mockInterviewRoutes from './mockInterview.routes.js';
import codingRoutes from './coding.routes.js';
import interviewRoutes from './interview.routes.js';
import bookmarkRoutes from './bookmark.routes.js';
import companyRoutes from './company.routes.js';
import jobRoutes from './job.routes.js';
import adminRoutes from './admin.routes.js';

const router = Router();

const DB_STATES = ['disconnected', 'connected', 'connecting', 'disconnecting'];

router.use('/auth', authRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/progress', progressRoutes);
router.use('/tasks', taskRoutes);
router.use('/resumes', resumeRoutes);
router.use('/ats', atsRoutes);
router.use('/skill-gap', skillGapRoutes);
router.use('/roadmaps', roadmapRoutes);
router.use('/mock-interview', mockInterviewRoutes);
router.use('/coding-questions', codingRoutes);
router.use('/interview-questions', interviewRoutes);
router.use('/bookmarks', bookmarkRoutes);
router.use('/companies', companyRoutes);
router.use('/jobs', jobRoutes);
router.use('/admin', adminRoutes);

router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'AI Placement Coach API is healthy',
    db: DB_STATES[mongoose.connection.readyState],
    timestamp: new Date().toISOString(),
  });
});

export default router;
