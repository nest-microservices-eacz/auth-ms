import 'dotenv/config';
import * as Joi from 'joi';

interface EnvVars {
  PORT: number;
  NATS_SERVERS: string[];
  MONGO_DB_URL: string;
  SECRET_JWT: string;
}

const envsSchema = Joi.object({
  PORT: Joi.number().required(),
  NATS_SERVERS: Joi.array().items(Joi.string()).required(),
  MONGO_DB_URL: Joi.string().required(),
  SECRET_JWT: Joi.string().required(),
}).unknown(true);

const { error, value } = envsSchema.validate({
  ...process.env,
  NATS_SERVERS: process.env.NATS_SERVERS?.split(','),
});

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  natsServers: envVars.NATS_SERVERS,
  mongoDbUrl: envVars.MONGO_DB_URL,
  jwtSecret: envVars.SECRET_JWT,
};
