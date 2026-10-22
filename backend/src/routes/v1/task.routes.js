import { Router } from 'express';
import { protect } from '../../middleware/auth.js';
import { listToday, markComplete } from '../../controllers/task.controller.js';

const router = Router();

router.get('/today', protect, listToday);
router.patch('/:taskId/complete', protect, markComplete);

export default router;
