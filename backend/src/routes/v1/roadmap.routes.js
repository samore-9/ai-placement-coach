import { Router } from 'express';
import { protect } from '../../middleware/auth.js';
import { validate } from '../../middleware/validate.js';
import {
  createRoadmapSchema,
  updateMilestoneSchema,
  toggleWeeklyTaskSchema,
} from '../../validators/roadmap.validator.js';
import * as roadmapController from '../../controllers/roadmap.controller.js';

const router = Router();

router.use(protect);

router.post('/', validate(createRoadmapSchema), roadmapController.create);
router.get('/active', roadmapController.getActive);
router.get('/history', roadmapController.getHistory);
router.patch(
  '/:roadmapId/milestones/:milestoneId',
  validate(updateMilestoneSchema),
  roadmapController.updateMilestone
);
router.patch('/:roadmapId/weeks/:weekNumber', validate(toggleWeeklyTaskSchema), roadmapController.toggleWeek);

export default router;
