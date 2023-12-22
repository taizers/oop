import express from 'express';

const router = express.Router();

import { paramsIdValidation } from '../validations/global.validation';
import { createEmployeeAction, deleteEmployeeAction, getEmployeeAction, getPaginatedEmployeesAction, updateEmployeeAction } from '../controllers/employees.controller';
import { createSeriaValidation, getPaginatedSeriesValidation, updateSeriaValidation } from '../validations/employees.validation';
import { uploadEmployeesAvatarMiddleware } from '../middlewares/upload.middleware';

router.post('/', createSeriaValidation, uploadEmployeesAvatarMiddleware.single('avatar'), createEmployeeAction);
router.get('/', getPaginatedSeriesValidation, getPaginatedEmployeesAction);
router.get('/:id', paramsIdValidation, getEmployeeAction);
router.put('/:id', updateSeriaValidation, updateEmployeeAction);
router.delete('/:id', paramsIdValidation, deleteEmployeeAction);

export default router;
