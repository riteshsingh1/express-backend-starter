import dotenv from "dotenv";
import Joi from "joi";

dotenv.config();

const envVarsSchema = Joi.object()
  .keys({
    APP_NAME: Joi.string().required(),
    PORT: Joi.number().required(),
    BASE_PATH: Joi.string().required(),
    ENV: Joi.string()
      .valid("development", "production", "test", "staging")
      .required(),
    API_KEY: Joi.string().required(),
    RABBITMQ_URL: Joi.string().required(),
    REDIS_HOST: Joi.string().required(),
    REDIS_PORT: Joi.number().required(),
    REDIS_PASSWORD: Joi.string().allow("").required(),
    ELASTICSEARCH_URL: Joi.string().required(),
    ALLOW_ELASTIC_LOGGING: Joi.string().required(),
    MONGO_URI: Joi.string().required(),
    ENCRYPTION_KEY: Joi.string().required(),
    LOG_LEVEL: Joi.string().valid("debug", "info", "warn", "error").required(),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const env = {
  APP_NAME: envVars.APP_NAME,
  BASE_PATH: envVars.BASE_PATH,
  ENV: envVars.ENV,
  PORT: envVars.PORT,
  API_KEY: envVars.API_KEY,
  RABBITMQ_URL: envVars.RABBITMQ_URL,
  REDIS_HOST: envVars.REDIS_HOST,
  REDIS_PORT: envVars.REDIS_PORT,
  REDIS_PASSWORD: envVars.REDIS_PASSWORD,
  ELASTICSEARCH_URL: envVars.ELASTICSEARCH_URL,
  ALLOW_ELASTIC_LOGGING: envVars.ALLOW_ELASTIC_LOGGING,
  MONGO_URI: envVars.MONGO_URI,
  OTP_QUEUE: envVars.OTP_QUEUE,
  SMS_QUEUE: envVars.SMS_QUEUE,
  EMAIL_QUEUE: envVars.EMAIL_QUEUE,
  ENCRYPTION_KEY: envVars.ENCRYPTION_KEY,
  LOG_LEVEL: envVars.LOG_LEVEL,
};
