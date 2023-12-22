import express from 'express';

const router = express.Router();
import { paramsIdValidation } from '../validations/global.validation';
import { createCompanyAction, deleteCompanyAction, getCompanyAction, getPaginatedCompaniesAction, updateCompanyAction } from '../controllers/companies.controller';
import { getPaginatedBooksValidation, updateBookValidation, createBookValidation } from '../validations/companies.validation';
import { uploadCompaniesAvatarMiddleware } from '../middlewares/upload.middleware';

router.post('/',createBookValidation, uploadCompaniesAvatarMiddleware.single('avatar'), createCompanyAction);
router.get('/', getPaginatedBooksValidation, getPaginatedCompaniesAction);
router.get('/:id', paramsIdValidation, getCompanyAction);
router.put('/:id', updateBookValidation, updateCompanyAction);
router.delete('/:id', paramsIdValidation, deleteCompanyAction);

export default router;
