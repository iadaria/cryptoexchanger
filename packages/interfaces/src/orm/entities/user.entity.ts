import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { IsBoolean, IsEmail, IsEnum, IsString } from 'class-validator';
import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CoreEntity } from 'src/common/entities/core.entity';
import { InternalServerErrorException } from '@nestjs/common';

export enum UserRole {
  Client = 'Client',
  Assistant = 'Assistant',
  Admin = 'Admin',
}

export enum AuthWay {
  Google = 'Google',
  Github = 'Github',
  Telegram = 'Telegram',
  Yandex = 'Yandex',
  Site = 'Site',
}

registerEnumType(UserRole, { name: 'UserRole' });
registerEnumType(AuthWay, { name: 'AuthWay' });

@InputType('UserInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class User extends CoreEntity {
  @Column({ unique: true })
  @Field((type) => String)
  @IsEmail()
  email: string;

  @Column({ select: false })
  @Field((type) => String)
  @IsString()
  password: string;

  @Column({ default: false })
  @Field((type) => Boolean)
  @IsBoolean()
  verified: boolean;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.Client })
  @Field((type) => UserRole, { defaultValue: UserRole.Client })
  @IsEnum(UserRole)
  role?: UserRole; // TODO

  @Column({ type: 'enum', enum: AuthWay, default: AuthWay.Site })
  @Field((type) => AuthWay, { defaultValue: AuthWay.Site })
  @IsEnum(AuthWay)
  authWay: AuthWay;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    if (this.password) {
      try {
        this.password = await bcrypt.hash(this.password, 10);
      } catch (e) {
        console.log('[users.entity.ts/hashPassword]', e);
        throw new InternalServerErrorException();
      }
    }
  }

  async checkPassword(aPassword: string): Promise<boolean> {
    try {
      const ok = await bcrypt.compare(aPassword, this.password);
      return ok;
    } catch (e) {
      console.error('[users.entity.ts/checkPassword]', e);
      throw new InternalServerErrorException();
    }
  }
}
