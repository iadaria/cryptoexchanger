import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
//import { User } from 'src/users/entities/user.entity';
import { SocialAuthInput } from './dtos/social-code.dto';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import { AUTH_SERVICE_NAME, AuthServiceClient, GrpcClient } from 'contracts';
import { Inject, Logger, UseFilters } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import {
  CreateAccountInput,
  CreateAccountOutput,
} from './dtos/create-account.dto';
import { User } from 'orm';
import { ExceptionFilter } from './filters/rcp-exception.filter';
import { HttpExceptionFilter } from './filters/exception.filter';
import { HttpErrorFilter } from './filters/gql.exceptions.filter';

@Resolver('Auth')
export class AuthResolver {
  private logger = new Logger(this.constructor.name);
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

  @UseFilters(HttpErrorFilter)
  @Mutation((returns) => LoginOutput)
  async login(@Args('input') loginInput: LoginInput): Promise<LoginOutput> {
    console.log('**', 'I am here');
    const result = await firstValueFrom(this.authService.login(loginInput));
    return { ok: true, token: result?.token };
  }
}
