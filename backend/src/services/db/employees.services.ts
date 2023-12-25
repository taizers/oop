// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Company, Employee } = require('../../db/models/index');
import { Op } from "sequelize";
import { EmployeeType } from "../../types/global/entities";
import EmployeeDto from "../../dtos/employee.dto";
import { UnCreatedError } from "../../helpers/error";

export const  getPaginatedEmployees = async (page: number, limit: number, query: string, where: any = {}) => {
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
        as: 'company',
      },
    ],
    order: [['created_at', 'DESC']],
  });

  if (!rows.length) {
    return {};
  }

  const totalPages = !count ? 1 : Math.ceil(count / limit);

  const employeesDto = rows?.map((employee: EmployeeType) => ({...new EmployeeDto(employee)}));

  return {
    totalPages,
    page: page + 1,
    employees: employeesDto,
  };
}

export const createEmployee = async (payload: object) => {
  try {
    const employee = await Employee.create(payload); 

    return {...new EmployeeDto(employee)};
  } catch (error) {
    throw new UnCreatedError('Сотрудник');
  }
};

export const  getEmployee = async (where: object) => {
  const employee = await Employee.findOne({ 
    where,
    include: [
      {
        model: Company,
        as: 'company',
      },
    ],
  });

  return {...new EmployeeDto(employee)};
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
  await Employee.destroy({ where: { id } });
}
