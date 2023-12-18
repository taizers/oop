// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Company, Employee } = require('../../db/models/index');
import { Op, fn, col } from "sequelize";
import fs from 'fs';
import { UnCreatedError } from "../../helpers/error";

export const  getPaginatedCompanies = async (page: number, limit: number, query: string) => {
  const where = {} as {name: object};

  if (query) {
    where.name = {
      [Op.like]: `%${query}%`,
    };
  }

  const { count, rows } = await Company.findAndCountAll({
    offset: page * limit,
    limit,
    attributes: { 
      include: [[fn("COUNT", col("employees.id")), "employees_count"]] 
    },
    where,
    include: [
      {
        model: Employee,
        as: 'employees',
        attributes: []
      },
    ],
    order: [['created_at', 'DESC']],
  });

  if (!rows.length) {
    return {};
  }

  const totalPages = !count ? 1 : Math.ceil(count / limit);

  return {
    totalPages,
    page: page + 1,
    companys: rows,
  };
}

export const createCompany = async (payload: object) => {
  try {
    return await Company.create(payload);  
  } catch (error) {
    throw new UnCreatedError('Компания');
  }
};

export const  getCompany = async (where: object) => {
  return await Company.findOne({ 
    attributes: { 
      include: [[fn("COUNT", col("employees.id")), "employees_count"]] 
    },
    where,
    include: [
      {
        model: Employee,
        as: 'employees',
      },
    ],
  });
}

export const  updateCompany = async (where: object, payload: object) => {
  return await Company.update(
    payload,
    { 
      where,
      // returning: true,
      // plain: true,
    }
  );
}

export const deleteCompany = async (id: string) => {
  fs.rmSync(`storage/companies/avatars/${id}`, { recursive: true, force: true });

  await Company.destroy({ where: { id } });
}
