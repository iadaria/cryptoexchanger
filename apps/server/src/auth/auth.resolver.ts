
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { User } from "src/users/entities/user.entity";
import { SocialAuthInput } from "./dtos/social-code.dto";
import { AuthService } from "./auth.service";

@Resolver('Auth')
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Query(() => User)
  async googleAuth(@Args('input') input: SocialAuthInput) {
    return this.authService.googleAuth(input);
  }

  @Query(() => String)
  async getGoogleAuthURL() {
    return this.authService.getGoogleAuthURL();
  }
}