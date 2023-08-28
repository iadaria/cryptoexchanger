import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

//import { JwtService } from '../jwt/jwt.service';
import { CreateAccountInput } from './dtos/create-account.dto';
import { LoginInput } from './dtos/login.dto';
import { JwtService } from 'src/jwt/jwt.service';
import { UserProfileOutput } from './dtos/user-profile.dto';
import { EditProfileInput } from './dtos/edit-profile.dto';
import { Verification } from './entities/verification.entity';
import { AllUsersOutput } from './dtos/all-users.dto';
import { GoogleUser } from './entities/google-user.entity';
import { Jwt } from './interfaces/jwt.interface';
import { CreateGoogleUser } from './interfaces/create-google-user';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    @InjectRepository(GoogleUser)
    private readonly googleUsers: Repository<GoogleUser>,
    @InjectRepository(Verification)
    private readonly verifications: Repository<Verification>,
    private readonly jwtService: JwtService,
  ) {}

  async createAccount({
    email,
    password,
    role,
  }: CreateAccountInput): Promise<{ ok: boolean; error?: string }> {
    try {
      const exists = await this.users.findOneBy({ email });
      if (exists) {
        return { ok: false, error: 'There is a user with that email already' };
      }
      const user = await this.users.save(
        this.users.create({ email, password, role }),
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
  async createGoogleAccount(googleUserDto: CreateGoogleUser): Promise<Jwt> {
    const { email } = googleUserDto;
    try {
      const exists = await this.googleUsers.findOneBy({ email });
      if (!exists) {
        const newGoogleUser = await this.googleUsers.create(googleUserDto);
        const newBasicUser = await this.users.create(newGoogleUser.basicUser());
        const user = await this.users.save(newBasicUser);
        await this.googleUsers.save({ ...newGoogleUser, user });

        const token = this.jwtService.sign(user.id);

        return { ok: true, token };
      }
    } catch (error) {
      return { ok: false, error };
    }
  }

  async login({ email, password }: LoginInput): Promise<Jwt> {
    try {
      const user = await this.users.findOne({
        where: { email },
        select: { id: true, password: true },
      });
      if (!user) {
        return { ok: false, error: 'User not found' };
      }

      const passwordCorrect = await user.checkPassword(password);
      if (!passwordCorrect) {
        return { ok: false, error: 'Wrong password' };
      }
      const token = this.jwtService.sign(user.id);

      return { ok: true, token };
    } catch (error) {
      return { ok: false, error };
    }
  }

  async findById(id: number): Promise<UserProfileOutput> {
    try {
      const user = await this.users.findOneOrFail({ where: { id } });
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
      };
    }
  }
}
