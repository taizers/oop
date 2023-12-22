import express from 'express';

const router = express.Router();
import { paramsIdValidation } from '../validations/global.validation';
import { createCompanyAction, deleteCompanyAction, getCompanyAction, getPaginatedCompaniesAction, updateCompanyAction } from '../controllers/companies.controller';
import { createCompanyValidation, getPaginatedCompaniesValidation, updateCompanyValidation } from '../validations/companies.validation';
import { uploadCompaniesAvatarMiddleware } from '../middlewares/upload.middleware';

router.post('/',createCompanyValidation, uploadCompaniesAvatarMiddleware.single('avatar'), createCompanyAction);
router.get('/', getPaginatedCompaniesValidation, getPaginatedCompaniesAction);
router.get('/:id', paramsIdValidation, getCompanyAction);
router.put('/:id', updateCompanyValidation, uploadCompaniesAvatarMiddleware.single('avatar'), updateCompanyAction);
router.delete('/:id', paramsIdValidation, deleteCompanyAction);

export default router;
