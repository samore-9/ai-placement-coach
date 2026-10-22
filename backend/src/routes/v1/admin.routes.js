import { Router } from 'express';
import { protect, authorize } from '../../middleware/auth.js';
import { validate } from '../../middleware/validate.js';
import * as adminController from '../../controllers/admin.controller.js';
import {
  listUsersQuerySchema,
  updateUserStatusSchema,
  announcementSchema,
  createJobSchema,
  updateJobSchema,
  createCompanySchema,
  updateCompanySchema,
  createCodingQuestionSchema,
  updateCodingQuestionSchema,
  createInterviewQuestionSchema,
  updateInterviewQuestionSchema,
} from '../../validators/admin.validator.js';

const router = Router();

// Every admin route requires authentication AND an admin/superadmin role.
router.use(protect, authorize('admin', 'superadmin'));

router.get('/analytics', adminController.getAnalytics);

router.get('/users', validate(listUsersQuerySchema, 'query'), adminController.listUsers);
router.patch('/users/:userId', validate(updateUserStatusSchema), adminController.updateUser);

router.post('/announcements', validate(announcementSchema), adminController.broadcastAnnouncement);

router.get('/jobs', adminController.listJobs);
router.post('/jobs', validate(createJobSchema), adminController.createJob);
router.patch('/jobs/:jobId', validate(updateJobSchema), adminController.updateJob);
router.delete('/jobs/:jobId', adminController.deleteJob);

router.get('/companies', adminController.listCompanies);
router.post('/companies', validate(createCompanySchema), adminController.createCompany);
router.patch('/companies/:companyId', validate(updateCompanySchema), adminController.updateCompany);
router.delete('/companies/:companyId', adminController.deleteCompany);

router.get('/coding-questions', adminController.listCodingQuestions);
router.post('/coding-questions', validate(createCodingQuestionSchema), adminController.createCodingQuestion);
router.patch('/coding-questions/:questionId', validate(updateCodingQuestionSchema), adminController.updateCodingQuestion);
router.delete('/coding-questions/:questionId', adminController.deleteCodingQuestion);

router.get('/interview-questions', adminController.listInterviewQuestions);
router.post('/interview-questions', validate(createInterviewQuestionSchema), adminController.createInterviewQuestion);
router.patch('/interview-questions/:questionId', validate(updateInterviewQuestionSchema), adminController.updateInterviewQuestion);
router.delete('/interview-questions/:questionId', adminController.deleteInterviewQuestion);

export default router;
