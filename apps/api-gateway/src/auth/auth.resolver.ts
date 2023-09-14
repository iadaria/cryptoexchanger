import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
//import { User } from 'src/users/entities/user.entity';
import { SocialAuthInput } from './dtos/social-code.dto';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import { AUTH_SERVICE_NAME, AuthServiceClient, GrpcClient } from 'contracts';
import { Inject } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import {
  CreateAccountInput,
  CreateAccountOutput,
} from './dtos/create-account.dto';
import { User } from 'interfaces';

@Resolver('Auth')
export class AuthResolver {
  private authService: AuthServiceClient;
  constructor(@Inject(GrpcClient.AUTH) private auth: ClientGrpc) {}

  onModuleInit() {
    this.authService =
      this.auth.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
  }

  @Mutation((returns) => CreateAccountOutput)
  createAccount(
    @Args('input') createAccountInput: CreateAccountInput,
  ): Promise<CreateAccountOutput> {
    return firstValueFrom(this.authService.createAccount(createAccountInput));
  }

  @Query(() => User)
  async googleAuth(@Args('input') input: SocialAuthInput) {
    return this.authService.googleAuth(input);
  }

  @Query(() => String)
  async getGoogleAuthURL() {
    return this.authService.getGoogleAuthUrl({});
  }

  @Query((returns) => Boolean)
  require() {
    return true;
  }

  @Mutation((returns) => LoginOutput)
  async login(@Args('input') loginInput: LoginInput): Promise<LoginOutput> {
    return firstValueFrom(this.authService.login(loginInput));
  }
}
