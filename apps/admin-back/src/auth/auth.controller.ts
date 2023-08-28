import { Metadata } from '@grpc/grpc-js';
import {
  AuthServiceController,
  AuthServiceControllerMethods,
  LoginRequest,
  LoginResponse,
} from 'contracts';
import { Observable } from 'rxjs';

@AuthServiceControllerMethods()
export class AuthController implements AuthServiceController {
  login(request: LoginRequest, metadata?: Metadata): Observable<LoginResponse> {
    throw new Error('Method not implemented.');
  }
}
