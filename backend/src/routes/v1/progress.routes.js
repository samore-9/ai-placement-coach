import { Router } from 'express';
import { protect } from '../../middleware/auth.js';
import { history, summary, heatmap, weekly, achievements } from '../../controllers/progress.controller.js';

const router = Router();

router.get('/history', protect, history);
router.get('/summary', protect, summary);
router.get('/heatmap', protect, heatmap);
router.get('/weekly', protect, weekly);
router.get('/achievements', protect, achievements);

export default router;
