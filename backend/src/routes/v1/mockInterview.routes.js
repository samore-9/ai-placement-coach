import { Router } from 'express';
import { protect } from '../../middleware/auth.js';
import { validate } from '../../middleware/validate.js';
import { startRoundSchema, submitAnswerSchema } from '../../validators/mockInterview.validator.js';
import * as mockInterviewController from '../../controllers/mockInterview.controller.js';

const router = Router();

router.use(protect);

router.post('/start', validate(startRoundSchema), mockInterviewController.startRound);
router.post('/submit', validate(submitAnswerSchema), mockInterviewController.submitAnswer);

export default router;
