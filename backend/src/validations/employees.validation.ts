import { Joi, validate } from 'express-validation';

export const createEmployeeValidation = validate(
  {
    body: Joi.object({
      name: Joi.string().max(512).required(),
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

export const updateSeriaValidation = validate(
  {
    body: Joi.object({
      name: Joi.string().max(512).required(),
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

export const getPaginatedSeriesValidation = validate(
  {
    query: Joi.object({
      page: Joi.number().required(),
      limit: Joi.number().required(),
      query: Joi.string().required(),
    }),
  },
  {
    context: true,
  },
  {
    stripUnknown: true,
  }
);
