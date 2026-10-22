import { Router } from 'express';
import { protect } from '../../middleware/auth.js';
import { validate } from '../../middleware/validate.js';
import { listJobsQuerySchema, applyToJobSchema } from '../../validators/job.validator.js';
import * as jobController from '../../controllers/job.controller.js';

const router = Router();

router.use(protect);

router.get('/', validate(listJobsQuerySchema, 'query'), jobController.list);
router.get('/applications/mine', jobController.myApplications);
router.get('/:id', jobController.getOne);
router.post('/:id/apply', validate(applyToJobSchema), jobController.apply);
router.patch('/applications/:applicationId/withdraw', jobController.withdraw);

export default router;
