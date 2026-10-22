import { Router } from 'express';
import { protect } from '../../middleware/auth.js';
import { validate } from '../../middleware/validate.js';
import { runATSScanSchema } from '../../validators/ats.validator.js';
import * as atsController from '../../controllers/ats.controller.js';

const router = Router();

router.use(protect);

router.post('/scan', validate(runATSScanSchema), atsController.scan);
router.get('/latest', atsController.getLatest);
router.get('/history', atsController.getHistory);
router.get('/compare/:reportIdA/:reportIdB', atsController.compare);

export default router;
