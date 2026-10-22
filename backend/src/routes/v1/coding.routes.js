import { Router } from 'express';
import { protect } from '../../middleware/auth.js';
import { validate } from '../../middleware/validate.js';
import { listQuestionsQuerySchema } from '../../validators/coding.validator.js';
import * as codingController from '../../controllers/coding.controller.js';

const router = Router();

router.use(protect);

router.get('/', validate(listQuestionsQuerySchema, 'query'), codingController.list);
router.get('/topics', codingController.getTopics);
router.get('/company-tags', codingController.getCompanyTags);
router.get('/:slug', codingController.getOne);
router.post('/:questionId/solve', codingController.markSolved);

export default router;
