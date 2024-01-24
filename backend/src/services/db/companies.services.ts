// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Company, Employee } = require('../../db/models/index');
import { Op, fn, col } from "sequelize";
import { UnCreatedError } from "../../helpers/error";
import { CompanyType } from "../../types/global/entities";
import CompanyDto from "../../dtos/company.dto";

export const  getAllCompanies = async () => {
  const companies = await Company.findAll({
    attributes: ['id', 'name'],
  });

  return companies;
}

export const  getPaginatedCompanies = async (page: number, limit: number, query: string, where: any = {}) => {
  if (query) {
    where.name = {
      [Op.like]: `%${query}%`,
    };
  }

  const { count, rows } = await Company.findAndCountAll({
    offset: page * limit,
    limit,
    subQuery: false,
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
    group: ['company.id']
  });

  if (!rows.length) {
    return {};
  }

  const totalPages = !count.length ? 1 : Math.ceil(count.length / limit);

  const companiesDto = rows?.map((company: {dataValues: CompanyType}) => ({...new CompanyDto(company?.dataValues)}));

  return {
    totalPages,
    page: page + 1,
    companies: companiesDto,
  };
}

export const createCompany = async (payload: object) => {
  try {
    const company = await Company.create(payload);  

    return {...new CompanyDto(company)};
  } catch (error) {
    throw new UnCreatedError('Компания');
  }
};

export const  getCompany = async (where: object) => {
  const company = await Company.findOne({ 
    where,
    attributes: { 
      include: [[fn("COUNT", col("employees.id")), "employees_count"]] 
    },
    include: [
      {
        model: Employee,
        as: 'employees',
        attributes: []
      },
    ],
    order: [['created_at', 'DESC']],
    group: ['company.id']
  });

  return {...new CompanyDto(company?.dataValues)};
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
  await Company.destroy({ where: { id } });
}
