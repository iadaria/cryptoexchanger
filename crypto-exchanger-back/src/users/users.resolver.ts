import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateAccountInput, CreateAccountOutput } from './dtos/create-account.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Resolver((of) => User)
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}

  @Mutation((returns) => CreateAccountOutput)
  createAccount(@Args('input') createAccountInput: CreateAccountInput): Promise<CreateAccountOutput> {
    return this.userService.createAccount(createAccountInput);
  }

  /*   @Query((returns) => User)
  me(@AuthUser() authUser: User) {
    return authUser;
  } */

  @Query((returns) => User)
  test() {
    return null;
  }
}
