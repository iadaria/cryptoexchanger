import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import { SocialAuthInput } from './dtos/social-code.dto';
import { UserRole } from 'src/users/entities/user.entity';
import { AuthConfigService } from 'src/auth/authConfig.service';
import axios from 'axios';

@Injectable()
export class AuthService {
  private readonly oauth2Client;

  constructor(private readonly config: AuthConfigService) {
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

  async googleAuth({ code }: SocialAuthInput) {
    const googleUser = await this.getGoogleUser({ code });

    console.log('auth.service', { googleUser });
    /**
     *  {
    id: '106000197497240957427',
    email: 'dahunichka@gmail.com',
    verified_email: true,
    name: 'Dariana Orlova',
    given_name: 'Dariana',
    family_name: 'Orlova',
    picture: 'https://lh3.googleusercontent.com/a/AAcHTtdYfYNFNO2I10jrGTahrAxIVjYP5FZATizvObVKDdN-lbs=s96-c',
    locale: 'ru'
  }
     */

    return {
      email: 'test@email',
      role: UserRole.Admin,
    };
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
      console.log('Can\'t auth through Google account', { error });
    }
	}
}
