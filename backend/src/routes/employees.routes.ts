import express from 'express';

const router = express.Router();

import { paramsIdValidation } from '../validations/global.validation';
import { createEmployeeAction, deleteEmployeeAction, getEmployeeAction, getPaginatedEmployeesAction, updateEmployeeAction } from '../controllers/employees.controller';
import { createEmployeeValidation, getPaginatedEmployeesValidation, updateEmployeeValidation } from '../validations/employees.validation';
import { uploadEmployeesAvatarMiddleware } from '../middlewares/upload.middleware';

router.post('/', createEmployeeValidation, uploadEmployeesAvatarMiddleware.single('avatar'), createEmployeeAction);
router.get('/', getPaginatedEmployeesValidation, getPaginatedEmployeesAction);
router.get('/:id', paramsIdValidation, getEmployeeAction);
router.put('/:id', updateEmployeeValidation, uploadEmployeesAvatarMiddleware.single('avatar'), updateEmployeeAction);
router.delete('/:id', paramsIdValidation, deleteEmployeeAction);

export default router;
