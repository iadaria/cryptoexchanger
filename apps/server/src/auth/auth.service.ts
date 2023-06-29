import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { google } from 'googleapis';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from 'src/configs/secrets';
import { SocialAuthInput } from './dtos/social-code.dto';
import { UserRole } from 'src/users/entities/user.entity';
import { CORS_ORIGIN, GOOGLE_USER_INFO_URL } from 'src/configs';

const oauth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  /*
   * This is where Google will redirect the user after they
   * give permission to your application
   */
  `${CORS_ORIGIN}/auth/google`,
);

async function getGoogleUser({ code }) {
  const { tokens } = await oauth2Client.getToken(code);
  console.log('auth.service tokens', tokens);

  oauth2Client.setCredentials(tokens);

  // Fetch the user's profile with the access token and bearer
  const googleUser = axios
    .get(`${GOOGLE_USER_INFO_URL}?alt=json&access_token=${tokens.access_token}`, {
      headers: { Authorization: `Bearer ${tokens.id_token}` },
    })
    .then((res) => res.data)
    .catch((error) => {
      throw new Error(error.message);
    });

  return googleUser;
}

@Injectable()
export class AuthService {
  constructor(private readonly configService: ConfigService) {}

  async googleAuth({ code }: SocialAuthInput) {
    const googleUser = await getGoogleUser({ code });

    console.log('auth.service', { googleUser});

    return {
      email: 'test@email',
      role: UserRole.Admin,
    }
  }

  getGoogleAuthURL() {
    /*
     * Generate a url that asks permissions to the user's email and profile
     */

    const scopes = [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ];
    
    return oauth2Client.generateAuthUrl({
      // eslint-disable-next-line @typescript-eslint/camelcase
      access_type: 'offline',
      prompt: 'consent',
      scope: scopes, // If you only need one scope you can pass it as string
    });
  }
}
