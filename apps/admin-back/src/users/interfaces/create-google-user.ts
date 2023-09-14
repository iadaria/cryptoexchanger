import { GoogleUser } from 'interfaces';

export interface CreateGoogleUser
  extends Omit<
    GoogleUser,
    'id' | 'createdAt' | 'basicUser' | 'updatedAt' | 'user'
  > {}
