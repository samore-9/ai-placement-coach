import { Router } from 'express';
import { protect } from '../../middleware/auth.js';
import { uploadResume as uploadResumeMiddleware } from '../../middleware/upload.js';
import * as resumeController from '../../controllers/resume.controller.js';

const router = Router();

router.use(protect);

router.post('/', uploadResumeMiddleware.single('resume'), resumeController.uploadResume);
router.get('/active', resumeController.getActive);
router.get('/history', resumeController.getHistory);
router.get('/:resumeId', resumeController.getOne);
router.delete('/:resumeId', resumeController.remove);

export default router;
