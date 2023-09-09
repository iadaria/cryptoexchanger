import { IsDefined, IsNumber, IsString, validateSync } from 'class-validator';
import { plainToClass } from 'class-transformer';

// https://github.com/typestack/class-validator

class EnvironmentVariables {
  @IsNumber()
  PORT: number;

  @IsString()
  PRIVATE_KEY: string;

  @IsString()
  MICRO_ADMIN_PORT: string;

  @IsString()
  LOGGER_CONTEXT: string;

  @IsString()
  CORS_ORIGIN: string;
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
