import { Router } from 'express';
import { protect } from '../../middleware/auth.js';
import { validate } from '../../middleware/validate.js';
import { toggleBookmarkSchema } from '../../validators/bookmark.validator.js';
import * as bookmarkController from '../../controllers/bookmark.controller.js';

const router = Router();

router.use(protect);

router.post('/toggle', validate(toggleBookmarkSchema), bookmarkController.toggle);
router.get('/', bookmarkController.list);

export default router;
