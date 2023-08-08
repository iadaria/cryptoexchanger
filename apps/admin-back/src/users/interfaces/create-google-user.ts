import { GoogleUser } from '../entities/google-user.entity';

export interface CreateGoogleUser
  extends Omit<GoogleUser, 'id' | 'createdAt' | 'basicUser' | 'updatedAt' | 'user'> {}
