import { NextFunction, Response, Request } from 'express';
import { createCompany, deleteCompany, getAllCompanies, getCompany, getPaginatedCompanies, updateCompany } from '../services/db/companies.services';
import logger from '../helpers/logger';
import { deleteFile } from '../utils/files';

export const getAllCompaniesAction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info(`Get All Companies Action`);

  try {
    const companies = await getAllCompanies();
    
    res.status(200).json(companies);
  } catch (error) {
    logger.error('Get All Companies Action - Cannot get Companies', error);
    next(error);
  }
};

export const getPaginatedCompaniesAction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { page, limit, query } = req.query;

  logger.info(`Get Paginated Companies Action: { page: ${page}, limit: ${limit}, query: ${query} }`);

  try {
    const companies = await getPaginatedCompanies(+page, +limit, query?.toString());
    
    res.status(200).json(companies);
  } catch (error) {
    logger.error('Get Paginated Companies Action - Cannot get Companies', error);
    next(error);
  }
};

export const createCompanyAction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const payload = req.body;
  const filename = req.file?.filename;

  logger.info(`Create Company Action: { payload: ${JSON.stringify(payload)}, avatar: ${filename} }`);

  try {
    const company = await createCompany({...payload, avatar: filename || null});
    
    res.status(200).json(company);
  } catch (error) {
    logger.error('Create Company Action - Cannot create company', error);
    next(error);
  }
};

export const getCompanyAction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;

  logger.info(`Get Company Action: { id: ${id} }`);

  try {
    const company = await getCompany({id});

    res.status(200).json(company);
  } catch (error) {
    logger.error('Get Company Action - Cannot get company', error);
    next(error);
  }
};

export const updateCompanyAction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  const payload = req.body;
  const file = req.file?.filename;

  logger.info(`Update Company Action: { id: ${id}, payload: ${JSON.stringify(payload)}, file: ${file} }`);

  try {
    let updatedCompany;

    if (file) {
      const company = await getCompany({id});

      const filePath = `storage/companies/avatars/${company.avatar}`;

      deleteFile(filePath);

      updatedCompany = await updateCompany({ id }, {...payload, avatar: file});
    } else {
      updatedCompany = await updateCompany({ id }, payload);
    }
    
    res.status(200).json(updatedCompany);
  } catch (error) {
    logger.error('Update Company Action - Cannot update company', error);
    next(error);
  }
};

export const deleteCompanyAction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;

  logger.info(`Delete Company Action: { id: ${id} }`);

  try {    
    const company = await getCompany({id});

    const filePath = `storage/companies/avatars/${company.avatar}`;

    deleteFile(filePath);

    await deleteCompany(id);
    
    res.status(200).json(id);
  } catch (error) {
    logger.error('Delete Company Action - Cannot delete company', error);
    next(error);
  }
};
