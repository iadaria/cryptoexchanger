import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
//import { User } from 'src/users/entities/user.entity';
import { SocialAuthInput } from './dtos/social-code.dto';
import { User } from './entities/user.entity';
import { LoginInput, LoginOutput } from './dtos/login.dto';
//import { AuthService } from "./auth.service";

@Resolver('Auth')
export class AuthResolver {
  //constructor(private authService: AuthService) {}

  @Query(() => User)
  async googleAuth(@Args('input') input: SocialAuthInput) {
    //return this.authService.googleAuth(input);
  }

  @Query(() => String)
  async getGoogleAuthURL() {
    //return this.authService.getGoogleAuthURL();
  }

  @Mutation((returns) => LoginOutput)
  login(@Args('input') loginInput: LoginInput): Promise<LoginOutput> {
    return null;
    //return this.userService.login(loginInput);
  }
}
