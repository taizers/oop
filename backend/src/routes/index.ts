import express from 'express';

import {
  signUpAction,
  loginAction,
  refreshAction,
  logoutAction,
  getProfileAction,
} from '../controllers/auth.controller';

import {
  signUpValidation,
  loginValidation,
  cookiesValidation,
} from '../validations/auth.validation';

import usersRouter from './users.routes';
import companiesRouter from './companies.routes';
import employeesRouter from './employees.routes';

import verifyToken from '../middlewares/auth.middleware';

const router = express.Router();

router.use(
  '/storage/avatars',
  verifyToken,
  express.static('storage/avatars')
);

// Authorization

router.post('/sign-up', signUpValidation, signUpAction);
router.post('/login', loginValidation, loginAction);
router.get('/refresh', cookiesValidation, refreshAction);
router.post('/logout', cookiesValidation, logoutAction);
router.get('/profile', verifyToken, getProfileAction);

//Routes

router.use('/users', verifyToken, usersRouter);
router.use('/companies', verifyToken, companiesRouter);
router.use('/employees', verifyToken, employeesRouter);

export default router;
