import { Router } from 'express';
import { protect } from '../../middleware/auth.js';
import { validate } from '../../middleware/validate.js';
import { skillGapSchema } from '../../validators/skillGap.validator.js';
import * as skillGapController from '../../controllers/skillGap.controller.js';

const router = Router();

router.use(protect);

router.post('/analyze', validate(skillGapSchema), skillGapController.analyze);
router.get('/companies', skillGapController.listCompanies);

export default router;
