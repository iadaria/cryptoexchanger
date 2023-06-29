import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Roles } from 'src/auth/role.decorator';
import { CreateAccountInput, CreateAccountOutput } from './dtos/create-account.dto';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import { User } from './entities/user.entity';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { UsersService } from './users.service';
import { UserProfileInput, UserProfileOutput } from './dtos/user-profile.dto';
import { EditProfileInput, EditProfileOutput } from './dtos/edit-profile.dto';
import { AllUsersOutput } from './dtos/all-users.dto';
import { TelegaAllUsersOutput } from './dtos/telega-all-users.dto';

@Resolver((of) => User)
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}

  @Mutation((returns) => CreateAccountOutput)
  createAccount(@Args('input') createAccountInput: CreateAccountInput): Promise<CreateAccountOutput> {
    return this.userService.createAccount(createAccountInput);
  }

  @Mutation((returns) => LoginOutput)
  login(@Args('input') loginInput: LoginInput): Promise<LoginOutput> {
    return this.userService.login(loginInput);
  }

  @Query((returns) => User)
  @Roles(['Any'])
  me(@AuthUser() authUser: User) {
    return authUser;
  }

  @Query((returns) => UserProfileOutput)
  @Roles(['Any'])
  userProfile(@Args() UserProfileInput: UserProfileInput): Promise<UserProfileOutput> {
    return this.userService.findById(UserProfileInput.userId);
  }

  @Mutation((returns) => EditProfileOutput)
  @Roles(['Any'])
  editProfile(
    @AuthUser() authUser: User,
    @Args('input') editProfileInput: EditProfileInput,
  ): Promise<EditProfileOutput> {
    return this.userService.editProfile(authUser.id, editProfileInput);
  }

  @Query((returns) => AllUsersOutput)
  allUsers(): Promise<AllUsersOutput> {
    return this.userService.allUsers();
  }

  // can't need services
  // @Query((returns) => TelegaAllUsersOutput)
  // telegaAllUsers(): Promise<TelegaAllUsersOutput> {
  //   return this.userService.allUsers();
  // }
}
