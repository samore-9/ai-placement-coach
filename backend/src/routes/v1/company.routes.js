import { Router } from 'express';
import { protect } from '../../middleware/auth.js';
import { validate } from '../../middleware/validate.js';
import { listCompaniesQuerySchema, addInterviewExperienceSchema } from '../../validators/company.validator.js';
import * as companyController from '../../controllers/company.controller.js';

const router = Router();

router.use(protect);

router.get('/', validate(listCompaniesQuerySchema, 'query'), companyController.list);
router.get('/:id', companyController.getOne);
router.post('/:id/experiences', validate(addInterviewExperienceSchema), companyController.addExperience);

export default router;
