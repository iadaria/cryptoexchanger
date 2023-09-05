import { Metadata } from '@grpc/grpc-js';
import { Controller } from '@nestjs/common';
import { asyncScheduler, Observable, scheduled } from 'rxjs';

import {
  AuthServiceController,
  AuthServiceControllerMethods,
  Empty,
  GoogleAuthRequest,
  GoogleAuthResponse,
  GoogleAuthURLResponse,
  LoginRequest,
  LoginResponse,
} from 'contracts';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';

@Controller()
@AuthServiceControllerMethods()
export class AuthController implements AuthServiceController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}
  googleAuth(
    request: GoogleAuthRequest,
    metadata?: Metadata,
  ): Observable<GoogleAuthResponse> {
    return scheduled(this.authService.googleAuth(request), asyncScheduler);
  }

  getGoogleAuthUrl(
    _: Empty,
    metadata?: Metadata,
  ): Observable<GoogleAuthURLResponse> {
    return scheduled(this.authService.getGoogleAuthURL(), asyncScheduler);
  }

  // without auto generation - @GrpcMethod('AuthService', 'login')
  login(request: LoginRequest, metadata?: Metadata): Observable<LoginResponse> {
    return scheduled(this.userService.login(request), asyncScheduler);
    /** need seperate dto
     * const stringIP = typeof ip !== 'string' ? ip?.toString() : ip;
      return from(this.profileService.login(request, stringIP))
     */
  }
}
