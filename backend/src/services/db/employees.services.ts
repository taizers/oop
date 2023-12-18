// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Company, Employee } = require('../../db/models/index');
import fs from 'fs';
import { Op } from "sequelize";

export const  getPaginatedEmployees = async (page: number, limit: number, query: string) => {
  const where = {} as {name: object};

  if (query) {
    where.name = {
      [Op.like]: `%${query}%`,
    };
  }

  const { count, rows } = await Employee.findAndCountAll({
    offset: page * limit,
    limit,
    where,    
    include: [
      {
        model: Company,
        as: 'companies',
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
    employees: rows,
  };
}

export const createEmployee = async (payload: object) => {
  try {
    return await Employee.create(payload);  
  } catch (error) {
    throw new error('Сотрудник не создан');
  }
};

export const  getEmployee = async (where: object) => {
  return await Employee.findOne({ 
    where,
    include: [
      {
        model: Company,
        as: 'companies',
      },
    ],
  });
}

export const  updateEmployee = async (where: object, payload: object) => {
  return await Employee.update(
    payload,
    { 
      where,
      // returning: true,
      // plain: true,
    }
  );
}

export const deleteEmployee = async (id: string) => {
  fs.rmSync(`storage/companies/avatars/${id}`, { recursive: true, force: true });
  await Employee.destroy({ where: { id } });
}
