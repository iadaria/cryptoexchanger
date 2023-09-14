import { GoogleUser } from 'orm';

export type CreateGoogleUserInput = Omit<
  GoogleUser,
  'id' | 'createdAt' | 'basicUser' | 'updatedAt' | 'user'
>;
