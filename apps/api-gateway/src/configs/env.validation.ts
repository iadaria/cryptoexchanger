import { IsDefined, IsNumber, IsString, validateSync } from 'class-validator';
import { plainToClass } from 'class-transformer';

// https://github.com/typestack/class-validator

class EnvironmentVariables {
  @IsNumber()
  DB_PORT: number;

  @IsString()
  MICRO_ADMIN_PORT: string;
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
