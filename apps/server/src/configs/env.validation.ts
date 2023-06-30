import { IsDefined, IsNumber, IsString, validateSync } from "class-validator";
import { plainToClass } from 'class-transformer';

// https://github.com/typestack/class-validator

class EnvironmentVariables {
  @IsString({ message: 'Invalid DB_HOST'})
  DB_HOST: string;

  @IsNumber()
  DB_PORT: number;

  @IsString({ message: 'Invalid GOOGLE_CLIENT_ID'})
  GOOGLE_CLIENT_ID: string;
  
  @IsString({ message: 'Invalid GOOGLE_CLIENT_SECRET'})
  GOOGLE_CLIENT_SECRET: string;
  
  @IsDefined({ message: 'Does\'nt define GOOGLE_REDIRECT_URL'})
  @IsString({ message: 'Invalid GOOGLE_REDIRECT_URL' })
  GOOGLE_REDIRECT_URL: string;

  @IsString({ message: 'Invalid CORS_ORIGIN '})
  CORS_ORIGIN: string;

  @IsString()
  GOOGLE_AUTH_SCOPES: string[];
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