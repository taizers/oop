import { Joi, validate } from 'express-validation';

export const createEmployeeValidation = validate(
  {
    body: Joi.object({
      name: Joi.string().max(512),
      courses: Joi.string().max(512),
      education: Joi.string().max(512),
      adress: Joi.string().max(255),
      foreign_level: Joi.string().max(10),
      company_id: Joi.number(),
      age: Joi.date(),
      avatar: Joi.string().max(255),
    }),
  },
  {
    context: true,
  },
  {
    stripUnknown: true,
  }
);

export const updateEmployeeValidation = validate(
  {
    body: Joi.object({
      name: Joi.string().max(512),
      courses: Joi.string().max(512),
      education: Joi.string().max(512),
      adress: Joi.string().max(255),
      foreign_level: Joi.string().max(10),
      company_id: Joi.number(),
      age: Joi.date(),
      avatar: Joi.string().max(255),
    }),
    params: Joi.object({
      id: Joi.string().required(),
    }),
  },
  {
    context: true,
  },
  {
    stripUnknown: true,
  }
);

export const getPaginatedEmployeesValidation = validate(
  {
    query: Joi.object({
      page: Joi.number().required(),
      limit: Joi.number().required(),
      query: Joi.string().allow(''),
      company: Joi.number(),
    }),
  },
  {
    context: true,
  },
  {
    stripUnknown: true,
  }
);
