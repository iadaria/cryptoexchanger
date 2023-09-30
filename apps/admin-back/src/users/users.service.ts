import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RpcException } from '@nestjs/microservices';

import { JwtService } from 'src/jwt/jwt.service';
import { LoginResponse } from 'contracts';
import { GoogleUser, User, Verification } from 'orm';
import { CreateAccountInput } from 'src/auth/dtos/create-account.dto';
import {
  AllUsersOutput,
  CreateGoogleUserInput,
  EditProfileInput,
  FindUserOutput,
  Jwt,
} from './dtos';
import { LoginInput } from 'src/auth/dtos/login.dto';

@Injectable()
export class UsersService {
  private readonly logger = new Logger('[admin-back]' + UsersService.name);

  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    @InjectRepository(GoogleUser)
    private readonly googleUsers: Repository<GoogleUser>,
    @InjectRepository(Verification)
    private readonly verifications: Repository<Verification>,
    private readonly jwtService: JwtService,
  ) {}

  async createAccount(
    input: CreateAccountInput,
  ): Promise<{ ok: boolean; error?: string }> {
    const { email, password } = input;
    try {
      const exists = await this.users.findOneBy({ email });
      if (exists) {
        return { ok: false, error: 'There is a user with that email already' };
      }
      const user = await this.users.save(
        this.users.create({ email, password }),
      );
      const verification = await this.verifications.save(
        this.verifications.create({ user }),
      );

      // this.mailService.sendVerificationEmail(user.email, verifications.code);

      return { ok: true };
    } catch (e) {
      return { ok: false, error: "Coulndn't create account " };
    }
  }

  // Internal function - ? - May be go out to a separate function/service
  async createGoogleAccount(
    googleUserInput: CreateGoogleUserInput,
  ): Promise<Jwt> {
    const { email } = googleUserInput;
    try {
      const exists = await this.googleUsers.findOneBy({ email });
      if (!exists) {
        const newGoogleUser = await this.googleUsers.create(googleUserInput);
        const newBasicUser = await this.users.create(
          newGoogleUser.getBasicUser(),
        );
        const user = await this.users.save(newBasicUser);
        await this.googleUsers.save({ ...newGoogleUser, user });

        const token = this.jwtService.sign(user.id);

        return { ok: true, token };
      }
    } catch (error) {
      return { ok: false, error };
    }
  }

  async login({ email, password }: LoginInput): Promise<LoginResponse> {
    const user = await this.users.findOne({
      where: { email },
      select: { id: true, password: true },
    });
    if (!user) {
      //throw new RpcException('User not found');
      throw new RpcException({ message: 'User not found', code: 2 });
      //return { ok: false, error: 'User not found' };
    }

    const passwordCorrect = await user.checkPassword(password);
    if (!passwordCorrect) {
      throw new RpcException('Wrong password');
      //return { ok: false, error: 'Wrong password' };
    }
    const token = this.jwtService.sign(user.id);
    return { token };
    //return { ok: true, token };
    /*     } catch (error) {
      this.logger.error(error);
      throw error;
    } */
  }

  async findById({ userId }: { userId: number }): Promise<FindUserOutput> {
    try {
      const user = await this.users.findOneOrFail({ where: { id: userId } });
      return { ok: true, user };
    } catch (error) {
      return { ok: false, error: 'User Not Found' };
    }
  }

  async editProfile(userId: number, { email, password }: EditProfileInput) {
    try {
      const user = await this.users.findOneBy({ id: userId });
      if (email) {
        user.email = email;
        user.verified = false;
        await this.verifications.delete({ user: { id: user.id } });
        const verifications = await this.verifications.save(
          this.verifications.create({ user }),
        );
        // this.mailService.sendVerificationEmail(user.email, verifications.code);
      }

      if (password) {
        user.password = password;
      }

      await this.users.save(user);
      return { ok: true };
    } catch (error) {
      return { ok: false, error: 'Could not update profile.' };
    }
  }

  async allUsers(): Promise<AllUsersOutput> {
    throw new Error('hi');
    this.logger.log('[allUsers method]');
    try {
      const users = await this.users.find({
        select: { id: true, email: true, verified: true, role: true },
      });
      return {
        ok: true,
        users,
      };
    } catch {
      return {
        ok: false,
        error: 'Could not load users',
        users: [],
      };
    }
  }
}
