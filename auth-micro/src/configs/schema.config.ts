import * as Joi from 'joi';

export const schemaValidConfig = Joi.object({
  ACCESS_TOKEN_SECRET: Joi.string().required(),
  PORT: Joi.number().default(3000),
  POSTGRES_DB: Joi.string().required(),
  POSTGRES_HOST: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
  POSTGRES_PORT: Joi.number().default(5432).required(),
  POSTGRES_USER: Joi.string().required(),
  REFRESH_TOKEN_SECRET: Joi.string().required(),
});
