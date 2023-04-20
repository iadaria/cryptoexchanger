import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Repository } from 'typeorm';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { User, UserRole } from 'src/users/entities/user.entity';
import { Verification } from 'src/users/entities/verification.entity';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from 'src/jwt/jwt.module';
import { GraphQLModule } from '@nestjs/graphql';
import { CommonModule } from 'src/common/common.module';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import * as configs from 'src/configs';

const GRAPHQL_ENDPOINT = '/graphql';

const testUser = {
  email: 'nico@las.com',
  password: '12345',
};

describe('UserModule (e2e)', () => {
  let app: INestApplication;
  let usersRepository: Repository<User>;
  let verificationsRepository: Repository<Verification>;
  let jwtToken: string;

  const baseTest = () => request(app.getHttpServer()).post(GRAPHQL_ENDPOINT);
  const publicTest = (query: string) => baseTest().send({ query });
  const privateTest = (query: string) =>
    baseTest()
      .set('x-jwt', jwtToken)
      .send({ query });

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(configs.getEnvConfig()),
        TypeOrmModule.forRootAsync(configs.ormClientOptions()),
        JwtModule.forRoot({ privateKey: process.env.PRIVATE_KEY }),
        GraphQLModule.forRoot(configs.getGraphQLConfig()),
        CommonModule,
        AuthModule,
        UsersModule,],
    }).compile();
    app = module.createNestApplication();
    usersRepository = module.get<Repository<User>>(getRepositoryToken(User));
    await app.init();
  })

  afterAll(async () => {
    const connection = usersRepository.manager.connection;
    await connection.synchronize(true);
    await app.close();
  });

  /* it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/').expect(200).expect('Hello World!');
  }); */

  describe('createAccount', () => {
    it('should create account', () => {
      return publicTest(`
        mutation {
          createAccount(input: {
            email:"${testUser.email}",
            password:"${testUser.password}",
            role:Admin
          }) {
            ok
            error
          }
        }
        `)
        .expect(200)
        .expect(res => {
          console.log(res.body.data);
          expect(res.body.data.createAccount.ok).toBe(true);
          expect(res.body.data.createAccount.error).toBe(null);
        });
    });

    it('should fail if account already exists', () => {
      return publicTest(`
        mutation {
          createAccount(input: {
            email:"${testUser.email}",
            password:"${testUser.password}",
            role:Admin
          }) {
            ok
            error
          }
        }
      `)
        .expect(200)
        .expect(res => {
          console.log(res.body.data)
          const {
            body: {
              data: {
                createAccount: { ok, error },
              },
            },
          } = res;
          console.log({ error })
          expect(ok).toBe(false);
          expect(error).toBe('There is a user with that email already');
        });
    });
  });

  describe('login', () => {
    it('should login with correct credentials', () => {
      return publicTest(`
          mutation {
            login(input:{
              email:"${testUser.email}",
              password:"${testUser.password}",
            }) {
              ok
              error
              token
            }
          }
        `)
        .expect(200)
        .expect(res => {
          console.log(res.body.data);
          const {
            body: {
              data: { login },
            },
          } = res;
          expect(login.ok).toBe(true);
          expect(login.error).toBe(null);
          expect(login.token).toEqual(expect.any(String));
          jwtToken = login.token;
        });
    });

    it('should not be able to login with wrong credentials', () => {
      return publicTest(`
          mutation {
            login(input:{
              email:"${testUser.email}",
              password:"xxx",
            }) {
              ok
              error
              token
            }
          }
        `)
        .expect(200)
        .expect(res => {
          const {
            body: {
              data: { login },
            },
          } = res;
          expect(login.ok).toBe(false);
          expect(login.error).toBe('Wrong password');
          expect(login.token).toBe(null);
        });
    });
  });


  describe('userProfile', () => {
    let userId: number;
    beforeAll(async () => {
      const [user] = await usersRepository.find();
      userId = user.id;
      console.log({ userId, jwtToken });
    });
    
    it("should see a user's profile", () => {
      return privateTest(`
          {
            userProfile(userId:${userId}){
              ok
              error
              user {
                email
              }
            }
          }
        `)
        .expect(200)
        .expect(res => {
          console.log('userProfile', res.body.data);
          const {
            body: {
              data: {
                userProfile: {
                  ok,
                  error,
                  user: { email },
                },
              },
            },
          } = res;
          expect(ok).toBe(true);
          expect(error).toBe(null);
          expect(email).toBe(testUser.email);
        });
    });
  });

  it.todo('me');
  it.todo('verifyEmail');
  it.todo('editProfile');
  it.todo('');
});