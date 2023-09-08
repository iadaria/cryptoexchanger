import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
//import { User } from 'src/users/entities/user.entity';
import { SocialAuthInput } from './dtos/social-code.dto';
import { User } from './entities/user.entity';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import { AUTH_SERVICE_NAME, AuthServiceClient, GrpcClient } from 'contracts';
import { Inject } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Resolver('Auth')
export class AuthResolver {
  private authService: AuthServiceClient;
  constructor(@Inject(GrpcClient.AUTH) private auth: ClientGrpc) {}

  onModuleInit() {
    this.authService =
      this.auth.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
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
