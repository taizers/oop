import { Joi, validate } from 'express-validation';

export const createCompanyValidation = validate(
  {
    body: Joi.object({
      name: Joi.string().max(255),
      location: Joi.string().max(512),
      scope: Joi.string().max(255),
      age: Joi.date(),
      ceo: Joi.string().max(255),
    }),
  },
  {
    context: true,
  },
  {
    stripUnknown: true,
  }
);

export const updateCompanyValidation = validate(
  {
    body: Joi.object({
      name: Joi.string().max(255),
      location: Joi.string().max(512),
      scope: Joi.string().max(255),
      age: Joi.date(),
      avatar: Joi.string().max(255),
      ceo: Joi.string().max(255),
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

export const getPaginatedCompaniesValidation = validate(
  {
    query: Joi.object({
      page: Joi.number().required(),
      limit: Joi.number().required(),
      query: Joi.string().allow(''),
    }),
  },
  {
    context: true,
  },
  {
    stripUnknown: true,
  }
);
