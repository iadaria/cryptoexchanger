import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { AuthUser } from 'src/auth/auth.decorator';
import { Roles } from 'src/auth/role.decorator';
import { UserProfileInput, UserProfileOutput } from './dtos/user-profile.dto';
import { EditProfileInput, EditProfileOutput } from './dtos/edit-profile.dto';
import { AllUsersOutput } from './dtos/all-users.dto';
import * as Contract from 'contracts';
import { User } from 'orm';

@Resolver((of) => User)
export class UsersResolver {
  private usersService: Contract.UsersServiceClient;
  constructor(@Inject(Contract.GrpcClient.AUTH) private users: ClientGrpc) {}

  onModuleInit() {
    this.usersService = this.users.getService<Contract.UsersServiceClient>(
      Contract.USERS_SERVICE_NAME,
    );
  }

  @Query((returns) => User)
  @Roles(['Any'])
  me(@AuthUser() authUser: User) {
    return authUser;
  }

  @Query((returns) => UserProfileOutput)
  @Roles(['Any'])
  userProfile(
    @Args() UserProfileInput: UserProfileInput,
  ): Promise<UserProfileOutput> {
    return firstValueFrom(
      this.usersService.findUser({ userId: UserProfileInput.userId }),
    );
  }

  @Mutation((returns) => Boolean)
  @Roles(['Any'])
  editProfile(
    @AuthUser() authUser: User,
    @Args('input') editProfileInput: EditProfileInput,
  ): boolean {
    return true;
    //return this.userService.editProfile(authUser.id, editProfileInput);
  }

  @Query((returns) => AllUsersOutput)
  allUsers(): Promise<AllUsersOutput> {
    return firstValueFrom(this.usersService.getAllUsers({}));
  }
}
