import { NextFunction, Response, Request } from 'express';
import { getPaginatedEmployees, createEmployee, deleteEmployee, getEmployee, updateEmployee } from '../services/db/employees.services';
import logger from '../helpers/logger';

export const getPaginatedEmployeesAction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { page, limit, query } = req.query;

  logger.info(`Get Paginated Employees Action: { page: ${page}, limit: ${limit}, query: ${query} }`);

  try {
    const employees = await getPaginatedEmployees(+page-1, +limit, query?.toString());
    
    res.status(200).json(employees);
  } catch (error) {
    logger.error('Get Paginated Employees Action - Cannot get employees', error);
    next(error);
  }
};

export const createEmployeeAction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const payload = req.body;
  const filename = req.file?.filename;

  logger.info(`Create Employee Action: { payload: ${payload} avatar: ${filename}  }`);

  try {
    const employee = await createEmployee({...payload, avatar: filename || null});
    
    res.status(200).json(employee);
  } catch (error) {
    logger.error('Create Employee Action - Cannot create employee', error);
    next(error);
  }
};

export const getEmployeeAction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;

  logger.info(`Get Employee Action: { id: ${id} }`);

  try {
    const employee = await getEmployee({id});
    
    res.status(200).json(employee);
  } catch (error) {
    logger.error('Get Employee Action - Cannot get employee', error);
    next(error);
  }
};

export const updateEmployeeAction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  const payload = req.body;

  logger.info(`Update Employee Action: { id: ${id}, payload: ${payload} }`);

  try {
    const employee = await updateEmployee({ id }, payload);
    
    res.status(200).json(employee);
  } catch (error) {
    logger.error('Update Employee Action - Cannot update employee', error);
    next(error);
  }
};

export const deleteEmployeeAction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;

  logger.info(`Delete Employee Action: { id: ${id} }`);

  try {
    await deleteEmployee(id);
    
    res.status(200).json(id);
  } catch (error) {
    logger.error('Delete Employee Action - Cannot delete employee', error);
    next(error);
  }
};
