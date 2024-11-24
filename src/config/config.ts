import * as path from 'path';

import * as dotenv from 'dotenv';
import * as Joi from 'joi';

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

const envVarsSchema = Joi.object()
  .keys({
    MYSQL_HOST: Joi.string().required(),
    MYSQL_PORT: Joi.number().required(),
    MYSQL_USER: Joi.string().required(),
    MYSQL_ROOT_PASSWORD: Joi.string().required(),
    MYSQL_DATABASE: Joi.string().required(),
    JWT_SECRET: Joi.string().required(),
    NODE_ENV: Joi.string()
      .valid('local', 'development', 'production')
      .required(),
    APP_PORT: Joi.number().required(),
    JUDGE0_HOST_NAME: Joi.string().required(),
    JUDGE0_API_KEY: Joi.string().required(),
  })
  .unknown();

const { error, value: envVars } = envVarsSchema
  .prefs({ errors: { label: 'key' } })
  .validate(process.env);

if (error != null) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const isProduction = () => {
  return envVars.NODE_ENV === 'production';
};

export const isDevelopment = () => {
  return envVars.NODE_ENV === 'development';
};
export const isLocal = () => {
  return envVars.NODE_ENV === 'local';
};

export const env = {
  mysql: {
    host: envVars.MYSQL_HOST,
    password: envVars.MYSQL_ROOT_PASSWORD,
    port: envVars.MYSQL_PORT,
    db: envVars.MYSQL_DATABASE,
    user: envVars.MYSQL_USER,
  },
  nodeEnv: envVars.NODE_ENV,
  port: envVars.APP_PORT,
  jwt_secret: envVars.JWT_SECRET,
  judge0: {
    hostName: envVars.JUDGE0_HOST_NAME,
    apiKey: envVars.JUDGE0_API_KEY,
  },
};