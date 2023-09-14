// https://www.typescriptlang.org/docs/handbook/utility-types.html
export interface CreateUser
  extends Pick<User, 'email' | 'verified' | 'authWay' | 'password'> {}
