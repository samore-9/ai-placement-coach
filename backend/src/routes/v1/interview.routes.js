import { Router } from 'express';
import { protect } from '../../middleware/auth.js';
import { validate } from '../../middleware/validate.js';
import { listInterviewQuestionsQuerySchema } from '../../validators/interview.validator.js';
import * as interviewController from '../../controllers/interview.controller.js';

const router = Router();

router.use(protect);

router.get('/', validate(listInterviewQuestionsQuerySchema, 'query'), interviewController.list);
router.get('/companies', interviewController.getCompanies);
router.get('/:id', interviewController.getOne);

export default router;
