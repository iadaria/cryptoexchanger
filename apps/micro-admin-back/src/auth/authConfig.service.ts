import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthConfigService {
  constructor(private configService: ConfigService) {}

  get isAuthEnabled(): boolean {
    return this.configService.get('AUTH_ENABLED') === 'true';
  }

  get GoogleClientID(): string {
    return this.configService.get('GOOGLE_CLIENT_ID');
  }

  get GoogleClientSecret(): string {
    return this.configService.get('GOOGLE_CLIENT_SECRET');
  }

  get GoogleRedirectURL(): string {
    return this.configService.get('GOOGLE_REDIRECT_URL');
  }
  get GoogleUserInfoURL(): string {
    return this.configService.get('GOOGLE_USER_INFO_URL');
  }

  get GoogleAuthScopes(): string[] {
    return JSON.parse(this.configService.get('GOOGLE_AUTH_SCOPES'));
  }
}