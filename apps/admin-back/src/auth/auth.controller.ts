import { Metadata } from '@grpc/grpc-js';
import { Controller } from '@nestjs/common';
import { asyncScheduler, Observable, scheduled } from 'rxjs';

import * as Contracts from 'contracts';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';

@Controller()
@Contracts.AuthServiceControllerMethods()
export class AuthController implements Contracts.AuthServiceController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}
  createAccount(
    request: Contracts.CreateAccountRequest,
    metadata?: Metadata,
  ): Observable<Contracts.CreateAccountResponse> {
    return scheduled(this.userService.createAccount(request), asyncScheduler);
  }
  googleAuth(
    request: Contracts.GoogleAuthRequest,
    metadata?: Metadata,
  ): Observable<Contracts.GoogleAuthResponse> {
    return scheduled(this.authService.googleAuth(request), asyncScheduler);
  }

  getGoogleAuthUrl(
    _: Contracts.Empty,
    metadata?: Metadata,
  ): Observable<Contracts.GoogleAuthURLResponse> {
    return scheduled(this.authService.getGoogleAuthURL(), asyncScheduler);
  }

  // without auto generation - @GrpcMethod('AuthService', 'login')
  login(
    request: Contracts.LoginRequest,
    metadata?: Metadata,
  ): Observable<Contracts.LoginResponse> {
    console.log('*** auth controller - login');
    return scheduled(this.userService.login(request), asyncScheduler);
    /** need seperate dto
     * const stringIP = typeof ip !== 'string' ? ip?.toString() : ip;
      return from(this.profileService.login(request, stringIP))
     */
  }
}
