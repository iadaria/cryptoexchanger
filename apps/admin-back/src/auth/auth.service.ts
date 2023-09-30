import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';

import { AuthConfigService } from 'src/auth/auth-config.service';
import axios from 'axios';

//* Should be out in another shared lib
import { Jwt } from 'src/users/dtos/jwt.dto';
import { UsersService } from 'src/users/users.service';
import { SocialAuthInput } from './dtos/social-code.dto';

//? Why UsersService may be it is better UserService ?

@Injectable()
export class AuthService {
  private readonly oauth2Client;

  constructor(
    private readonly config: AuthConfigService,
    private readonly usersService: UsersService,
  ) {
    this.oauth2Client = new google.auth.OAuth2(
      this.config.GoogleClientID,
      this.config.GoogleClientSecret,
      /*
       * This is where Google will redirect the user after they
       * give permission to your application
       */
      `${this.config.GoogleRedirectURL}/auth/google`,
    );
  }

  async googleAuth({ code }: SocialAuthInput): Promise<Jwt> {
    const googleUser = await this.getGoogleUser({ code });
    console.log('auth.service', { googleUser });

    /*  const user: CreateGoogleUser = {
      googleId: '106000197497240957427',
      email: 'dahunichka@gmail.com',
      verified_email: true,
      name: 'Dariana Orlova',
      given_name: 'Dariana',
      family_name: 'Orlova',
      picture:
        'https://lh3.googleusercontent.com/a/AAcHTtdYfYNFNO2I10jrGTahrAxIVjYP5FZATizvObVKDdN-lbs=s96-c',
      locale: 'ru',
    }; */

    return this.usersService.createGoogleAccount(googleUser);
  }

  getGoogleAuthURL() {
    /*
     * Generate a url that asks permissions to the user's email and profile
     */
    return this.oauth2Client.generateAuthUrl({
      // eslint-disable-next-line @typescript-eslint/camelcase
      access_type: 'offline',
      prompt: 'consent',
      scope: this.config.GoogleAuthScopes, // If you only need one scope you can pass it as string
    });
  }

  private async getGoogleUser({ code }) {
    const { tokens } = await this.oauth2Client.getToken(code);
    this.oauth2Client.setCredentials(tokens);

    const url = `${this.config.GoogleUserInfoURL}?alt=json&access_token=${tokens.access_token}`;
    const headers = { Authorization: `Bearer ${tokens.id_token}` };
    try {
      const googleUser = await axios.get(url, { headers });
      return googleUser.data;
    } catch (error) {
      console.log("Can't auth through Google account", { error });
    }
  }
}
