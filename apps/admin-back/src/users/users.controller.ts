import {
  EditProfileRequest,
  EditProfileResponse,
  Empty,
  FindUserRequest,
  FindUserResponse,
  GetAllUsersResponse,
  UsersServiceController,
} from 'contracts';
import { UsersService } from './users.service';
import { Metadata } from '@grpc/grpc-js';
import { Observable, asyncScheduler, scheduled } from 'rxjs';
import { Controller } from '@nestjs/common';

@Controller()
export class UsersController implements UsersServiceController {
  constructor(private readonly userService: UsersService) {}
  findUser(
    request: FindUserRequest,
    metadata?: Metadata,
  ): Observable<FindUserResponse> {
    return scheduled(this.userService.findById(request), asyncScheduler);
  }
  editProfile(
    request: EditProfileRequest,
    metadata?: Metadata,
  ): Observable<EditProfileResponse> {
    throw new Error('Method not implemented.');
  }
  getAllUsers(_: Empty, metadata?: Metadata): Observable<GetAllUsersResponse> {
    return scheduled(this.userService.allUsers(), asyncScheduler);
  }
}
