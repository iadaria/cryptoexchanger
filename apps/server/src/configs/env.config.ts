import { ConfigModuleOptions } from "@nestjs/config";
import * as Joi from "joi";

export const isDev = process.env.NODE_ENV === 'dev';
export const isProd = process.env.NODE_ENV === 'prod';

export const getEnvConfig = (): ConfigModuleOptions => ({
	isGlobal: true, 
	envFilePath: isDev ? '.env.dev' : '.env.test',
	ignoreEnvFile: isProd,
	validationSchema: Joi.object({
		NODE_ENV: Joi.string().valid('dev', 'prod', 'test'),
		DB_HOST: Joi.string().required(),
		DB_PORT: Joi.string().required(),
		DB_USERNAME: Joi.string().required(),
		DB_PASSWORD: Joi.string().required(),
		DB_NAME: Joi.string().required(),
		TELEGRAM_TOKEN: Joi.string().required(),
		CHAT_ID: Joi.string().required(),
		PORT: Joi.string().required(),
	})
});