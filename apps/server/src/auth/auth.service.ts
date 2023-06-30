import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import { SocialAuthInput } from './dtos/social-code.dto';
import { UserRole } from 'src/users/entities/user.entity';
import { GOOGLE_USER_INFO_URL } from 'src/configs';
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

    return {
      email: 'test@email',
      role: UserRole.Admin,
    };
  }

  getGoogleAuthURL() {
    /*
     * Generate a url that asks permissions to the user's email and profile
     */

    const scopes = [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ];

    return this.oauth2Client.generateAuthUrl({
      // eslint-disable-next-line @typescript-eslint/camelcase
      access_type: 'offline',
      prompt: 'consent',
      scope: scopes, // If you only need one scope you can pass it as string
    });
  }

  private async getGoogleUser({ code }) {
		const { tokens } = await this.oauth2Client.getToken(code);
		console.log('auth.service tokens', tokens);
	
		this.oauth2Client.setCredentials(tokens);
	
		// Fetch the user's profile with the access token and bearer
		/* const googleUser = axios
			.get(`${this.config.GoogleUserInfoURL}?alt=json&access_token=${tokens.access_token}`, {
				headers: { Authorization: `Bearer ${tokens.id_token}` },
			})
			.then((res) => res.data)
			.catch((error) => {
				throw new Error(error.message);
			}); */
    const url = `${this.config.GoogleUserInfoURL}?alt=json&access_token=${tokens.access_token}`;
    const headers = { Authorization: `Bearer ${tokens.id_token}` };
    try {
      const googleUser = await axios.get(url, { headers });
      console.log({ googleUser });
      const data = googleUser.data;
      console.log({ data });
      return data;
    } catch (error) {
      console.log('Can\'t auth through Google account', { error });
    }
	}
}
