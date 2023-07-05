import { IsEnum, IsNumber, IsString, validateSync } from "class-validator";
import { plainToClass } from 'class-transformer';
import { Env } from "src/common/types/env.types";

// https://github.com/typestack/class-validator

class EnvironmentVariables {
  @IsEnum(Env)
  NODE_ENV: Env;

  @IsString({ message: 'Invalid DB_HOST'})
  DB_HOST: string;

  @IsNumber()
  DB_PORT: number;

  @IsString()
  DB_USERNAME: string;
  
  @IsString()
  DB_NAME: string;
  
  @IsString()
  DB_PASSWORD: string;

  @IsString()
  PRIVATE_KEY: string;

  @IsString()
  TELEGRAM_TOKEN: string;
}

export const validate = (config: Record<string, unknown>) => {
  
  // `plainToClass` to converts plain object into Class
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
 
  // `validateSync` method validate the class and returns errors
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
};